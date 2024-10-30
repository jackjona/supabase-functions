import { Hono } from "jsr:@hono/hono";
import { handleRequest } from "./handle_request.ts";

const functionName = "proxy";
const app = new Hono().basePath(`/${functionName}`);

const allowedDomains = ["pixeldrain.com", "cdn.pixeldrain.com"];

// Handle (type) errors
function handleError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred";
}

app.get("/", async (c) => {
  try {
    const response = await handleRequest(c.req, allowedDomains); // Passing allowedDomains to handle_request.ts
    return response;
  } catch (error) {
    return c.text(`Error: ${handleError(error)}`, 500);
  }
});

Deno.serve(app.fetch);
