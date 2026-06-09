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
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
import_dotenv.default.config({ path: ".env.local" });
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  app.use((0, import_cookie_parser.default)());
  app.set("trust proxy", true);
  const PORT = 3e3;
  let cachedMotivation = "";
  let cachedImagePrompt = "";
  let lastFetchDate = "";
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-for-local";
  const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
  app.get("/api/auth/google", (req, res) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/google/callback`;
    if (!clientId) {
      const token = import_jsonwebtoken.default.sign({ name: "Pengunjung Tes", avatar: "PT" }, JWT_SECRET, { expiresIn: "1h" });
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
          code,
          client_id: clientId,
          client_secret: clientSecret,
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
      const initials = userData.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
      const token = import_jsonwebtoken.default.sign({ name: userData.name, avatar: initials }, JWT_SECRET, { expiresIn: "24h" });
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
      const user = import_jsonwebtoken.default.verify(token, JWT_SECRET);
      res.json({ user });
    } catch (err) {
      res.json({ user: null });
    }
  });
  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.json({ success: true });
  });
  app.get("/api/testimonials", async (req, res) => {
    try {
      const dataPath = import_path.default.join(process.cwd(), "src", "data", "testimonials.json");
      const data = await import_fs.default.promises.readFile(dataPath, "utf-8");
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
      user = import_jsonwebtoken.default.verify(token, JWT_SECRET);
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
      const dataPath = import_path.default.join(process.cwd(), "src", "data", "testimonials.json");
      const data = JSON.parse(await import_fs.default.promises.readFile(dataPath, "utf-8"));
      const newTestimonial = {
        id: data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
        name: user.name,
        role,
        text,
        avatar: user.avatar
      };
      data.push(newTestimonial);
      await import_fs.default.promises.writeFile(dataPath, JSON.stringify(data, null, 2));
      res.json(newTestimonial);
    } catch (err) {
      res.status(500).json({ error: "Failed to save testimonial" });
    }
  });
  app.get("/api/poster", async (req, res) => {
    try {
      const prompt = req.query.prompt;
      if (!prompt) return res.status(400).json({ error: "No prompt provided" });
      const apiKey = process.env.POLLINATIONS_API_KEY;
      const seed = (/* @__PURE__ */ new Date()).toISOString().split("T")[0].replace(/-/g, "");
      const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?width=300&height=375&nologo=true&seed=${seed}&model=flux${apiKey ? `&key=${apiKey}` : ""}`;
      const aiResponse = await fetch(url);
      if (!aiResponse.ok) {
        throw new Error(`Pollination API error: ${aiResponse.status}`);
      }
      const buffer = await aiResponse.arrayBuffer();
      res.set("Content-Type", "image/jpeg");
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error("Error generating poster:", error);
      res.status(500).json({ error: "Failed to generate poster" });
    }
  });
  app.get("/api/motivation", async (req, res) => {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    try {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const forceRefresh = req.query.refresh === "true";
      if (!forceRefresh && cachedMotivation && cachedImagePrompt && lastFetchDate === today) {
        return res.json({ text: cachedMotivation, imagePrompt: cachedImagePrompt });
      }
      const textModels = ["gemini", "deepseek"];
      const selectedTextModel = textModels[Math.floor(Math.random() * textModels.length)];
      const aiResponse = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.POLLINATIONS_API_KEY || ""}`
        },
        body: JSON.stringify({
          model: selectedTextModel,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "user",
              content: 'Tuliskan satu paragraf kutipan motivasi mendalam untuk guru di seluruh dunia (berbahasa Indonesia). Berikan juga prompt bahasa Inggris singkat (1 kalimat) untuk meng-generate poster ilustrasi motivasi guru yang indah dengan gaya seni vektor/minimalis menggunakan warna biru dan ungu (blue and purple). Format response Anda harus berupa JSON valid dengan skema: { "text": "motivasi", "imagePrompt": "prompt ilustrasi" }'
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
  let vite;
  if (process.env.NODE_ENV !== "production") {
    vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "custom"
      // Change to custom to allow our own route handling
    });
    app.use(vite.middlewares);
  }
  app.get("/sekolah/:kota/:namaSekolah", async (req, res, next) => {
    try {
      const { kota, namaSekolah } = req.params;
      const formatString = (str) => str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      const formattedKota = formatString(kota);
      const formattedSekolah = formatString(namaSekolah);
      const pageTitle = `${formattedSekolah} - ${formattedKota} | Pemuryadi Digital Hub`;
      const pageDesc = `Informasi lengkap mengenai ${formattedSekolah} di kota ${formattedKota}. Terdaftar di database sekolah Indonesia.`;
      const indexPath = process.env.NODE_ENV === "production" ? import_path.default.join(process.cwd(), "dist", "index.html") : import_path.default.join(process.cwd(), "index.html");
      let html = await import_fs.default.promises.readFile(indexPath, "utf-8");
      html = html.replace(/<title>.*<\/title>/, `<title>${pageTitle}</title>`);
      html = html.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${pageDesc}" />`);
      html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${pageTitle}" />`);
      html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${pageDesc}" />`);
      if (vite) {
        html = await vite.transformIndexHtml(req.originalUrl, html);
      }
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      next(error);
    }
  });
  if (process.env.NODE_ENV === "production") {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath, { index: false }));
  }
  app.use("*", async (req, res, next) => {
    try {
      if (req.originalUrl.startsWith("/api")) return next();
      const indexPath = process.env.NODE_ENV === "production" ? import_path.default.join(process.cwd(), "dist", "index.html") : import_path.default.join(process.cwd(), "index.html");
      let html = await import_fs.default.promises.readFile(indexPath, "utf-8");
      if (vite) {
        html = await vite.transformIndexHtml(req.originalUrl, html);
      }
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      next(error);
    }
  });
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
