import jwt from "@tsndr/cloudflare-worker-jwt";

export async function onRequestGet(context: any) {
  try {
    const { results } = await context.env.DB.prepare("SELECT * FROM testimonials ORDER BY created_at ASC").all();
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export async function onRequestPost(context: any) {
  const req = context.request;
  const env = context.env;
  
  try {
    const body = await req.json();
    const { name, role, text, cfTurnstileResponse } = body;

    if (!name || !role || !text || !cfTurnstileResponse) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const turnstileSecret = env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
    const cfVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: turnstileSecret,
        response: cfTurnstileResponse
      })
    });
    const cfData: any = await cfVerify.json();

    if (!cfData.success && turnstileSecret !== "1x0000000000000000000000000000000AA") {
      return new Response(JSON.stringify({ error: "Turnstile verification failed" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Insert into D1
    const avatar = name.charAt(0).toUpperCase();
    const result = await env.DB.prepare(
      "INSERT INTO testimonials (name, role, text, avatar) VALUES (?, ?, ?, ?) RETURNING *"
    ).bind(name, role, text, avatar).first();

    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
