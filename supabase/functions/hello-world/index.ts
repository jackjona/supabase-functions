import { Hono } from "jsr:@hono/hono";

// Change this to your function name
const functionName = "hello-world";
const app = new Hono().basePath(`/${functionName}`);

app.get("/", (c) => c.text("Hello World!"));

// Serve the app
Deno.serve(app.fetch);
