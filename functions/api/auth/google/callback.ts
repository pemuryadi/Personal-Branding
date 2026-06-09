import jwt from "@tsndr/cloudflare-worker-jwt";

export async function onRequestGet(context: any) {
  const req = context.request;
  const env = context.env;
  
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  
  if (!code) {
    return new Response(null, { status: 302, headers: { "Location": "/" } });
  }

  try {
    const clientId = env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${url.protocol}//${url.host}/api/auth/google/callback`;

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
    
    const tokenData: any = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("Failed to get access token");

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const userData: any = await userRes.json();

    const initials = userData.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
    const secret = env.JWT_SECRET || "fallback-secret-key-for-local";
    
    const token = await jwt.sign({ name: userData.name, avatar: initials }, secret, {
      expiresIn: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    });
    
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/?login=success#testimoni",
        "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly`
      }
    });
  } catch (err) {
    console.error("OAuth error:", err);
    return new Response(null, { status: 302, headers: { "Location": "/?login=error" } });
  }
}
