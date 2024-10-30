// Run test using: deno test ./supabase/functions/tests/hello-world-test.ts
import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";
import { Hono } from "jsr:@hono/hono";

// Code from supabase/functions/hello-world/index.ts
const functionName = "hello-world";
const app = new Hono().basePath(`/${functionName}`);

app.get("/", (c) => c.text("Hello from hono-server!"));

// Testing code below
Deno.test(
  "GET /hello-world should return 'Hello from hono-server!'",
  async () => {
    const request = new Request(`http://localhost/${functionName}`);
    const response = await app.fetch(request);
    const text = await response.text();
    assertEquals(response.status, 200);
    assertEquals(text, "Hello from hono-server!");
  }
);
