# Kunal Builds

Portfolio and project archive for Kunal Builds, with a serverless AI assistant.

Live site: <https://heyitskunal.vercel.app>

## Build and run

Requires Node.js 20 or newer. The site uses built-in Node modules and has no runtime npm dependencies.

```powershell
$env:KB_PUBLIC_URL = 'https://your-verified-domain.example'
npm run build
npm run dev
```

The production build creates an isolated `public/` directory. It includes the static site and SEO output; the assistant API and its knowledge base stay server-side. For a local assistant, create `.env.local` from `.env.example` and configure the server variables below. The dev server binds to `127.0.0.1:8000`.

## Assistant configuration

Set these only in the deployment platform's server environment or local `.env.local`:

- `AI_ENABLED=true`
- `GROQ_API_KEY` and optionally `GROQ_MODEL` (defaults to `openai/gpt-oss-20b`)
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
- `RATE_LIMIT_SECRET` (at least 24 characters)
- `KB_PUBLIC_URL` (the verified HTTPS site origin used for canonical URLs and sitemap generation)

The API fails closed if AI is disabled or shared Redis rate limiting is unavailable. Mock responses are only available through the local development server's explicit `AI_TEST_MOCK=1` setting; do not set this in deployment.

## Checks

```powershell
npm run test:ai
```

The checks cover request validation, origin security, streaming, quota reservation/refunds, concurrency, cancellation, and Redis behavior. No credentials are needed for the test suite.

## SEO and hosting

The build generates canonical metadata, JSON-LD, `robots.txt`, and `sitemap.xml` from the static route inventory. It preserves the site's Google Search Console verification file. Vercel uses `npm run build`, serves `public/`, and runs `api/assistant.js` as a serverless function. Configure the environment variables above before enabling the assistant. Confirm hosting-plan eligibility and rights for all media before production deployment.

## Copyright

Copyright (c) 2026 Kunal (Kunal17711). All rights reserved. See [LICENSE](LICENSE) for the source-use terms.
