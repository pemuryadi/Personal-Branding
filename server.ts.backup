import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
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

  const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-for-local";
  const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Dummy valid key for testing

  // Auth endpoints
  app.get("/api/auth/google", (req, res) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/google/callback`;
    
    if (!clientId) {
      // Simulate login for local testing
      const token = jwt.sign({ name: "Pengunjung Tes", avatar: "PT" }, JWT_SECRET, { expiresIn: "1h" });
      res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      return res.redirect("/?login=success");
    }

    const scope = "profile email";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    res.redirect(authUrl);
  });

  app.get("/api/auth/google/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) return res.redirect("/");

    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/google/callback`;

      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code: code as string,
          client_id: clientId!,
          client_secret: clientSecret!,
          redirect_uri: redirectUri,
          grant_type: "authorization_code"
        })
      });
      
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) throw new Error("Failed to get access token");

      const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      });
      const userData = await userRes.json();

      const initials = userData.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
      const token = jwt.sign({ name: userData.name, avatar: initials }, JWT_SECRET, { expiresIn: "24h" });
      
      res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      res.redirect("/?login=success");
    } catch (err) {
      console.error("OAuth error:", err);
      res.redirect("/?login=error");
    }
  });

  app.get("/api/auth/me", (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) return res.json({ user: null });
    
    try {
      const user = jwt.verify(token, JWT_SECRET);
      res.json({ user });
    } catch (err) {
      res.json({ user: null });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.json({ success: true });
  });

  // Testimonial Endpoints
  app.get("/api/testimonials", async (req, res) => {
    try {
      const dataPath = path.join(process.cwd(), "src", "data", "testimonials.json");
      const data = await fs.promises.readFile(dataPath, "utf-8");
      res.json(JSON.parse(data));
    } catch (err) {
      res.status(500).json({ error: "Failed to read testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    let user;
    try {
      user = jwt.verify(token, JWT_SECRET) as any;
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { role, text, cfTurnstileResponse } = req.body;
    if (!role || !text || !cfTurnstileResponse) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const cfVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: cfTurnstileResponse
        })
      });
      const cfData = await cfVerify.json();
      
      if (!cfData.success && TURNSTILE_SECRET !== "1x0000000000000000000000000000000AA") {
        return res.status(400).json({ error: "Turnstile verification failed" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Turnstile verification error" });
    }

    try {
      const dataPath = path.join(process.cwd(), "src", "data", "testimonials.json");
      const data = JSON.parse(await fs.promises.readFile(dataPath, "utf-8"));
      
      const newTestimonial = {
        id: data.length > 0 ? Math.max(...data.map((d: any) => d.id)) + 1 : 1,
        name: user.name,
        role: role,
        text: text,
        avatar: user.avatar
      };
      
      data.push(newTestimonial);
      await fs.promises.writeFile(dataPath, JSON.stringify(data, null, 2));
      
      res.json(newTestimonial);
    } catch (err) {
      res.status(500).json({ error: "Failed to save testimonial" });
    }
  });

  app.get("/api/poster", async (req, res) => {
    try {
      const prompt = req.query.prompt as string;
      if (!prompt) return res.status(400).json({ error: "No prompt provided" });
      
      const apiKey = process.env.POLLINATIONS_API_KEY;
      // Gunakan seed berbasis tanggal hari ini agar gambar berubah setiap hari meskipun prompt sama
      const seed = new Date().toISOString().split("T")[0].replace(/-/g, '');
      const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?width=300&height=375&nologo=true&seed=${seed}&model=flux${apiKey ? `&key=${apiKey}` : ""}`;
      
      const aiResponse = await fetch(url);
      if (!aiResponse.ok) {
        throw new Error(`Pollination API error: ${aiResponse.status}`);
      }
      
      const buffer = await aiResponse.arrayBuffer();
      res.set("Content-Type", "image/jpeg");
      // Mencegah caching agresif oleh browser agar bisa refresh setiap hari
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error("Error generating poster:", error);
      res.status(500).json({ error: "Failed to generate poster" });
    }
  });

  app.get("/api/motivation", async (req, res) => {
    // Hindari caching dari browser
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    try {
      const today = new Date().toISOString().split("T")[0];
      const forceRefresh = req.query.refresh === 'true';
      
      if (!forceRefresh && cachedMotivation && cachedImagePrompt && lastFetchDate === today) {
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt });
      }

      const textModels = ["gemini", "deepseek"];
      const selectedTextModel = textModels[Math.floor(Math.random() * textModels.length)];

      const aiResponse = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.POLLINATIONS_API_KEY || ''}`
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

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Change to custom to allow our own route handling
    });
    app.use(vite.middlewares);
  }

  // Programmatic SEO route for schools
  app.get("/sekolah/:kota/:namaSekolah", async (req, res, next) => {
    try {
      const { kota, namaSekolah } = req.params;
      
      const formatString = (str: string) => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      const formattedKota = formatString(kota);
      const formattedSekolah = formatString(namaSekolah);
      
      const pageTitle = `${formattedSekolah} - ${formattedKota} | Pemuryadi Digital Hub`;
      const pageDesc = `Informasi lengkap mengenai ${formattedSekolah} di kota ${formattedKota}. Terdaftar di database sekolah Indonesia.`;

      const indexPath = process.env.NODE_ENV === "production" 
        ? path.join(process.cwd(), "dist", "index.html")
        : path.join(process.cwd(), "index.html");

      let html = await fs.promises.readFile(indexPath, "utf-8");

      html = html.replace(/<title>.*<\/title>/, `<title>${pageTitle}</title>`);
      html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${pageDesc}" />`);
      html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${pageTitle}" />`);
      html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${pageDesc}" />`);

      if (vite) {
        html = await vite.transformIndexHtml(req.originalUrl, html);
      }
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      next(error);
    }
  });

  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false })); // index: false so it doesn't override our catch-all
  }

  // Catch-all route to serve the SPA
  app.use('*', async (req, res, next) => {
    try {
      if (req.originalUrl.startsWith('/api')) return next();
      
      const indexPath = process.env.NODE_ENV === "production" 
        ? path.join(process.cwd(), "dist", "index.html")
        : path.join(process.cwd(), "index.html");

      let html = await fs.promises.readFile(indexPath, "utf-8");

      if (vite) {
        html = await vite.transformIndexHtml(req.originalUrl, html);
      }
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      next(error);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
