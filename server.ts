import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
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
      
      if (cachedMotivation && cachedImagePrompt && lastFetchDate === today) {
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Tuliskan satu paragraf kutipan motivasi mendalam untuk guru di seluruh dunia (berbahasa Indonesia). Berikan juga prompt bahasa Inggris singkat (1 kalimat) untuk meng-generate poster ilustrasi motivasi guru yang indah dengan gaya seni vektor/minimalis menggunakan warna biru dan ungu (blue and purple). Format response Anda harus berupa JSON valid dengan skema: { \"text\": \"motivasi\", \"imagePrompt\": \"prompt ilustrasi\" }",
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
