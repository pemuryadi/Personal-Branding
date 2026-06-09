export async function onRequestGet(context: any) {
  const req = context.request;
  const env = context.env;
  
  try {
    const url = new URL(req.url);
    const prompt = url.searchParams.get("prompt");
    
    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    
    const apiKey = env.POLLINATIONS_API_KEY || "";
    // Seed berbasis tanggal hari ini
    const seed = new Date().toISOString().split("T")[0].replace(/-/g, '');
    const apiUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?width=300&height=375&nologo=true&seed=${seed}&model=flux${apiKey ? `&key=${apiKey}` : ""}`;
    
    const aiResponse = await fetch(apiUrl);
    if (!aiResponse.ok) {
      throw new Error(`Pollination API error: ${aiResponse.status}`);
    }
    
    const buffer = await aiResponse.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
  } catch (error: any) {
    console.error("Error generating poster:", error);
    return new Response(JSON.stringify({ error: "Failed to generate poster" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
