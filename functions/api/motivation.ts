export async function onRequestGet(context: any) {
  const req = context.request;
  const env = context.env;
  
  try {
    const textModels = ["gemini", "deepseek"];
    const selectedTextModel = textModels[Math.floor(Math.random() * textModels.length)];

    const aiResponse = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.POLLINATIONS_API_KEY || ''}`
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
    
    const data: any = await aiResponse.json();
    const text = data.choices?.[0]?.message?.content;
    
    if (text) {
      const parsed = JSON.parse(text);
      return new Response(JSON.stringify({ 
        text: parsed.text || "Guru adalah pelita harapan bangsa.", 
        imagePrompt: parsed.imagePrompt || "inspiring minimalist teacher poster vector art blue purple", 
        modelUsed: selectedTextModel 
      }), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      });
    } else {
      return new Response(JSON.stringify({ error: "No text generated" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
  } catch (error: any) {
    console.error("Error generating motivation:", error);
    return new Response(JSON.stringify({ error: "Failed to generate motivation" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
