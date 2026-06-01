import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

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



  app.get("/api/motivation", async (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const forceRefresh = req.query.refresh === 'true';
      
      if (!forceRefresh && cachedMotivation && cachedImagePrompt && lastFetchDate === today) {
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt });
      }

      const textModels = ["gemini", "deepseek"];
      const selectedTextModel = textModels[Math.floor(Math.random() * textModels.length)];

      const aiResponse = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk_B6XU4IbbNGAPU1zcOd69DvKHYihLYpa9"
        },
        body: JSON.stringify({
          model: selectedTextModel,
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
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt, modelUsed: selectedTextModel });
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
