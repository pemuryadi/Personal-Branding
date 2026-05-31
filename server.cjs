var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var dotenv = __toESM(require("dotenv"), 1);
dotenv.config();
var ai = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
var COUNT_FILE = import_path.default.join(process.cwd(), ".visitor_count.json");
var totalVisitors = 142;
try {
  if (import_fs.default.existsSync(COUNT_FILE)) {
    totalVisitors = JSON.parse(import_fs.default.readFileSync(COUNT_FILE, "utf-8")).total || 142;
  } else {
    import_fs.default.writeFileSync(COUNT_FILE, JSON.stringify({ total: totalVisitors }));
  }
} catch (e) {
  console.error("Error loading visitor count:", e);
}
function incrementTotalVisitors() {
  totalVisitors++;
  try {
    import_fs.default.writeFileSync(COUNT_FILE, JSON.stringify({ total: totalVisitors }));
  } catch (e) {
    console.error("Error saving visitor count:", e);
  }
}
var activeSessions = /* @__PURE__ */ new Map();
function cleanActiveSessions() {
  const now = Date.now();
  for (const [ip, time] of activeSessions.entries()) {
    if (now - time > 5 * 60 * 1e3) {
      activeSessions.delete(ip);
    }
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  app.set("trust proxy", true);
  const PORT = 3e3;
  let cachedMotivation = "";
  let cachedImagePrompt = "";
  let lastFetchDate = "";
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
        const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, "$1").trim() : "";
        const link = linkMatch ? linkMatch[1].trim() : "";
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
        const source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, "$1").trim() : "";
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
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      if (cachedMotivation && cachedImagePrompt && lastFetchDate === today) {
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt });
      }
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: 'Tuliskan satu paragraf kutipan motivasi mendalam untuk guru di seluruh dunia (berbahasa Indonesia). Berikan juga prompt bahasa Inggris singkat (1 kalimat) untuk meng-generate poster ilustrasi motivasi guru yang indah dengan gaya seni vektor/minimalis menggunakan warna biru dan ungu (blue and purple). Format response Anda harus berupa JSON valid dengan skema: { "text": "motivasi", "imagePrompt": "prompt ilustrasi" }',
        config: {
          responseMimeType: "application/json"
        }
      });
      const text = response.text;
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
