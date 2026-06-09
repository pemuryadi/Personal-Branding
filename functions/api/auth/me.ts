import jwt from "@tsndr/cloudflare-worker-jwt";

export async function onRequestGet(context: any) {
  const req = context.request;
  const env = context.env;
  
  const cookieHeader = req.headers.get("Cookie") || "";
  const match = cookieHeader.match(/auth_token=([^;]+)/);
  const token = match ? match[1] : null;

  if (!token) {
    return new Response(JSON.stringify({ user: null }), { headers: { "Content-Type": "application/json" } });
  }

  const secret = env.JWT_SECRET || "fallback-secret-key-for-local";
  
  try {
    const isValid = await jwt.verify(token, secret);
    if (!isValid) throw new Error("Invalid");
    const decoded = jwt.decode(token);
    return new Response(JSON.stringify({ user: decoded.payload }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ user: null }), { headers: { "Content-Type": "application/json" } });
  }
}
