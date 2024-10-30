# supabase-functions

Trying out Supabase Edge Functions.

Functions are writtin in TypeScript using [Hono](https://github.com/honojs/hono).

---

## Edge Functions

`/hello-world` returns the text "Hello world"

`/proxy` proxies requests that have pass a URL using the origin query parameter (/proxy?origin=`<originURL>`)

`/tests` contain unit tests for the edge functions using Deno Test

---

### Develop Locally

#### Prerequisites

Before you begin, make sure you have the Supabase CLI installed. If you haven't installed it yet, follow the instructions in the [official documentation](https://supabase.com/docs/guides/cli/getting-started).

#### Run

To run the function locally, use the following command:

1. Use the following command to serve the function:

```bash
supabase start # start the supabase stack
supabase functions serve --no-verify-jwt # start the Functions watcher
```

The `--no-verify-jwt` flag allows you to bypass JWT verification during local development.

2. Make a GET request using cURL or Postman to `http://127.0.0.1:54321/functions/v1/hello-world`:

```bash
curl  --location  'http://127.0.0.1:54321/functions/v1/hello-world'
```

This request should return the text "Hello World!".

---

#### Tests

Make sure you have Deno installed. If you haven't installed it yet, follow the instructions in the [official documentation](https://docs.deno.com/runtime/getting_started/installation/).

Then run `deno test ./supabase/functions/tests/<function-test-file.ts>`

For example, run `deno test ./supabase/functions/tests/hello-world-test.ts` to run the tests for the hello-world edge function.
