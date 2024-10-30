// Function to handle proxy requests
export async function handleRequest(
  request: Request,
  allowedDomains: string[]
) {
  try {
    const url = new URL(request.url);
    const originURL = url.searchParams.get("origin");
    if (!originURL) {
      return new Response("Server is running", { status: 200 });
    }
    if (new URL(originURL).protocol !== "https:") {
      return new Response("Unauthorized: Only HTTPS protocol is allowed", {
        status: 403,
      });
    }
    if (!allowedDomains.includes(new URL(originURL).hostname)) {
      return new Response("Unauthorized: This domain is not in the whitelist", {
        status: 403,
      });
    }
    const newRequest = new Request(originURL, request);
    const response = await fetch(newRequest);
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Cache-Control", "no-store, max-age=0");
    return newResponse;
  } catch (error) {
    return new Response(`Error: ${(error as Error).message}`, { status: 500 });
  }
}
