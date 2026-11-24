# Production preparation

Existing project: `kunals-projects-63b105ac/heyitskunal`. Existing repository: `Kunal17711/My-portfolio`. Production branch: `main`. Production origin: `https://heyitskunal.vercel.app`.

## Build settings

Framework: Other (`null`); root: repository root; Node.js: 24.x; install: `npm ci --include=dev`; build: `npm run build`; output: `public`. The same settings are committed in `vercel.json`. The assistant is a Node serverless function at `/api/assistant/`, with 60 seconds maximum duration and cancellation enabled. The request timeout is 45 seconds.

## Server environment variables

| Name | Required configuration | Targets |
| --- | --- | --- |
| `GROQ_API_KEY` | Valid Groq credential, stored as Secret | Production, Preview |
| `GROQ_MODEL` | `openai/gpt-oss-20b` (also the code default) | Production, Preview |
| `AI_ENABLED` | `true` to enable real AI; `false` disables it | Production, Preview |
| `UPSTASH_REDIS_REST_URL` | Upstash HTTPS REST endpoint | Production, Preview |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash server credential, stored as Secret | Production, Preview |
| `RATE_LIMIT_SECRET` | At least 24 random characters, stored as Secret | Production, Preview |
| `KB_PUBLIC_URL` | `https://heyitskunal.vercel.app` | Production, Preview |

`AI_ALLOWED_ORIGINS` is optional and accepts a comma-separated list of exact origins; avoid wildcard or arbitrary request-host trust. `UPSTASH_REDIS_PREFIX` is optional; the default is `kbai` for production and `kbai:preview` for previews so preview testing cannot consume production quota. Vercel supplies `VERCEL`, `VERCEL_ENV`, `VERCEL_URL`, and `VERCEL_BRANCH_URL`; preview origin validation uses only those trusted platform hostnames.

Never set `AI_TEST_MOCK`, `AI_TEST_LIVE`, or `AI_LOCAL_DEV` on Vercel. The build rejects enabled local test flags. Neither credentials nor private server files are copied into the public output.

## SEO and routes

Production builds include indexable metadata, the production canonical origin, sitemap, JSON-LD, and the existing Google verification file. Preview builds include `noindex,nofollow`, `robots.txt` disallowing crawling, and canonical URLs pointing at production. Keep Vercel deployment protection enabled; its preview responses also carry `X-Robots-Tag: noindex`.

All 29 previously indexed routes are retained as pages except `/aldren-row`, which permanently redirects to `/projects/aldren-row/`. Five identity aliases permanently redirect to `/who-is-kunal/`. `/contact/` has its own page. Vercel's trailing-slash normalization preserves links without a slash. Do not redirect arbitrary missing pages to the home page.

## Quotas and reconciliation

Redis reservations atomically enforce visitor and global minute/day quotas, shared token budgets, and one generation per session and visitor. A short-lived, identifier-free reservation ledger makes reconciliation idempotent. Token-window generation markers prevent a late completion from refunding a newer window. Confirmed Groq usage refunds unused reserved tokens. Interrupted or unknown usage retains the reservation amount conservatively. Request cancellation aborts the upstream fetch and releases its lock; if Redis fails during cleanup, a lock expires after 60 seconds. Redis failure before reservation rejects the request with 503 and makes no Groq request.

## Launch gates

The hosting account is on Hobby. [Vercel's current Terms of Service](https://vercel.com/legal/terms) restrict Hobby to personal or noncommercial use. Since this site advertises paid development services, treat commercial eligibility as a launch gate: the owner should select an eligible paid plan or obtain written eligibility confirmation from Vercel. Do not buy a plan or change billing automatically.

After hosting eligibility is resolved, the owner must approve merging the reviewed migration branch into `main`. That merge triggers production deployment through the existing Git integration. Confirm the deployed production SHA, run a short real streaming request, inspect primary routes and redirects, then resubmit the sitemap in Search Console. Keep preview protection enabled.

The original supplied MP3s are excluded; the generated original ambient loop preserves the music player. No third-party recording rights are assumed. See `MEDIA.md`.

## Rollback

The previous production commit is `9014d66134a005b5755a442366ad5d10097ebde1`; backup branch: `backup/pre-crt-migration-20261124-210633`. A Vercel rollback to the previous ready production deployment preserves its built settings. Before rebuilding the old Next.js source, restore its project framework to Next.js and reset build/install/output overrides to automatic detection. Use a revert commit for Git rollback; do not force-push or discard unrelated work in the original local checkout.
