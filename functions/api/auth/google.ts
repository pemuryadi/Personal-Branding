import jwt from "@tsndr/cloudflare-worker-jwt";

export async function onRequestGet(context: any) {
  const req = context.request;
  const env = context.env;
  
  const clientId = env.GOOGLE_CLIENT_ID;
  const url = new URL(req.url);
  const redirectUri = `${url.protocol}//${url.host}/api/auth/google/callback`;
  
  if (!clientId) {
    // Simulate login for local testing
    const secret = env.JWT_SECRET || "fallback-secret-key-for-local";
    const token = await jwt.sign({ name: "Pengunjung Tes", avatar: "PT" }, secret, {
      expiresIn: Math.floor(Date.now() / 1000) + (1 * 60 * 60) // 1 hour
    });
    
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/?login=success#testimoni",
        "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly`
      }
    });
  }

  const scope = "profile email";
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  
  return new Response(null, {
    status: 302,
    headers: { "Location": authUrl }
  });
}
