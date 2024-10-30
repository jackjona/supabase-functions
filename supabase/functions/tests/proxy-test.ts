import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { handleRequest } from "../proxy/handle_request.ts";

const allowedDomains = ["pixeldrain.com", "cdn.pixeldrain.com"];

// Mock the fetch function for testing
globalThis.fetch = async (_input: Request | string | URL) => {
  return new Response("Mock response", { status: 200 });
};

// Define the unit tests
Deno.test("should return 200 if no origin URL", async () => {
  const request = new Request("http://localhost/");
  const response = await handleRequest(request, allowedDomains);
  assertEquals(response.status, 200);
  assertEquals(await response.text(), "Server is running");
});

Deno.test("should return 403 if the protocol is not HTTPS", async () => {
  const request = new Request("http://localhost/?origin=http://insecure.com");
  const response = await handleRequest(request, allowedDomains);
  assertEquals(response.status, 403);
  assertEquals(
    await response.text(),
    "Unauthorized: Only HTTPS protocol is allowed"
  );
});

Deno.test("should return 403 if the domain is not whitelisted", async () => {
  const request = new Request(
    "http://localhost/?origin=https://not-allowed.com"
  );
  const response = await handleRequest(request, allowedDomains);
  assertEquals(response.status, 403);
  assertEquals(
    await response.text(),
    "Unauthorized: This domain is not in the whitelist"
  );
});

Deno.test("should return 200 and the fetched response", async () => {
  const request = new Request(
    "http://localhost/?origin=https://pixeldrain.com"
  );
  const response = await handleRequest(request, allowedDomains);
  assertEquals(response.status, 200);
  assertEquals(await response.text(), "Mock response");
});

Deno.test("should return 500 if there's an error", async () => {
  const request = new Request("http://localhost/?origin=invalid-url");
  const response = await handleRequest(request, allowedDomains);
  assertEquals(response.status, 500);
  assertEquals(await response.text(), "Error: Invalid URL: 'invalid-url'");
});
