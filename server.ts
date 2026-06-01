import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const COUNT_FILE = path.join(process.cwd(), ".visitor_count.json");
let totalVisitors = 142; // Seed value
try {
  if (fs.existsSync(COUNT_FILE)) {
    totalVisitors = JSON.parse(fs.readFileSync(COUNT_FILE, "utf-8")).total || 142;
  } else {
    fs.writeFileSync(COUNT_FILE, JSON.stringify({ total: totalVisitors }));
  }
} catch (e) {
  console.error("Error loading visitor count:", e);
}

function incrementTotalVisitors() {
  totalVisitors++;
  try {
    fs.writeFileSync(COUNT_FILE, JSON.stringify({ total: totalVisitors }));
  } catch (e) {
    console.error("Error saving visitor count:", e);
  }
}

// In-memory active sessions tracker (IP -> timestamp)
const activeSessions = new Map<string, number>();

function cleanActiveSessions() {
  const now = Date.now();
  for (const [ip, time] of activeSessions.entries()) {
    if (now - time > 5 * 60 * 1000) { // 5 minutes activity window
      activeSessions.delete(ip);
    }
  }
}

async function startServer() {
  const app = express();
  // Enable trust proxy so we get real IPs if deployed behind reverse proxy
  app.set("trust proxy", true);
  const PORT = 3000;

  // Cache the motivation for the day
  let cachedMotivation = "";
  let cachedImagePrompt = "";
  let lastFetchDate = "";

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/visitor-count", (req, res) => {
    const rawIp = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const ipStr = Array.isArray(rawIp) ? rawIp[0] : rawIp;

    const now = Date.now();
    if (!activeSessions.has(ipStr)) {
      incrementTotalVisitors();
    }
    activeSessions.set(ipStr, now);
    cleanActiveSessions();

    res.json({
      total: totalVisitors,
      active: Math.max(1, activeSessions.size)
    });
  });

  app.get("/api/news", async (req, res) => {
    try {
      const url = "https://news.google.com/rss/search?q=pendidikan+indonesia+kemendikbud+OR+kemendikdasmen+OR+kemdiktisaintek&hl=id&gl=ID&ceid=ID:id";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch RSS: ${response.statusText}`);
      }
      const xml = await response.text();
      
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match;
      const items = [];
      
      while ((match = itemRegex.exec(xml)) !== null && items.length < 15) {
        const itemContent = match[1];
        const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
        const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
        const sourceMatch = itemContent.match(/<source[^>]*>([\s\S]*?)<\/source>/);
        
        const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1').trim() : '';
        const link = linkMatch ? linkMatch[1].trim() : '';
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
        const source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1').trim() : '';
        
        let title = rawTitle;
        if (source && title.endsWith(` - ${source}`)) {
          title = title.substring(0, title.length - ` - ${source}`.length);
        }
        
        items.push({
          title,
          link,
          pubDate,
          source
        });
      }
      
      res.json({ articles: items });
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch education news" });
    }
  });

  app.get("/api/motivation", async (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      
      if (cachedMotivation && cachedImagePrompt && lastFetchDate === today) {
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt });
      }

      const aiResponse = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk_B6XU4IbbNGAPU1zcOd69DvKHYihLYpa9"
        },
        body: JSON.stringify({
          model: "openai",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "user",
              content: "Tuliskan satu paragraf kutipan motivasi mendalam untuk guru di seluruh dunia (berbahasa Indonesia). Berikan juga prompt bahasa Inggris singkat (1 kalimat) untuk meng-generate poster ilustrasi motivasi guru yang indah dengan gaya seni vektor/minimalis menggunakan warna biru dan ungu (blue and purple). Format response Anda harus berupa JSON valid dengan skema: { \"text\": \"motivasi\", \"imagePrompt\": \"prompt ilustrasi\" }"
            }
          ]
        })
      });

      if (!aiResponse.ok) {
        throw new Error(`Pollination API error: ${aiResponse.status}`);
      }
      
      const data = await aiResponse.json();
      const text = data.choices?.[0]?.message?.content;
      
      if (text) {
        const parsed = JSON.parse(text);
        cachedMotivation = parsed.text || "Guru adalah pelita harapan bangsa.";
        cachedImagePrompt = parsed.imagePrompt || "inspiring minimalist teacher poster vector art blue purple";
        lastFetchDate = today;
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt });
      } else {
        return res.status(500).json({ error: "No text generated" });
      }
    } catch (error) {
      console.error("Error generating motivation:", error);
      res.status(500).json({ error: "Failed to generate motivation" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
