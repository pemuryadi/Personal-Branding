export async function onRequest(context: any) {
  const req = context.request;
  const env = context.env;
  
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  
  // pathParts[0] is "sekolah", pathParts[1] is kota, pathParts[2] is namaSekolah
  if (pathParts.length >= 3 && pathParts[0] === "sekolah") {
    const kota = pathParts[1];
    const namaSekolah = pathParts[2];
    
    const formatString = (str: string) => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    const formattedKota = formatString(kota);
    const formattedSekolah = formatString(namaSekolah);
    
    const pageTitle = `${formattedSekolah} - ${formattedKota} | Pemuryadi Digital Hub`;
    const pageDesc = `Informasi lengkap mengenai ${formattedSekolah} di kota ${formattedKota}. Terdaftar di database sekolah Indonesia.`;

    // Fetch the original asset (index.html)
    const response = await env.ASSETS.fetch(req);
    
    // Modify the HTML tags using HTMLRewriter
    // @ts-ignore
    return new HTMLRewriter()
      .on('title', {
        element(element: any) {
          element.setInnerContent(pageTitle);
        }
      })
      .on('meta[name="description"]', {
        element(element: any) {
          element.setAttribute("content", pageDesc);
        }
      })
      .on('meta[property="og:title"]', {
        element(element: any) {
          element.setAttribute("content", pageTitle);
        }
      })
      .on('meta[property="og:description"]', {
        element(element: any) {
          element.setAttribute("content", pageDesc);
        }
      })
      .transform(response);
  }
  
  return context.env.ASSETS.fetch(req);
}
