# Repository notes

- This is a Node.js 20+ static site with one Vercel serverless API function. It does not use Next.js or a client-side framework.
- Build the isolated deployable site with `npm run build`. The generated `public/` directory is intentionally ignored by Git.
- Keep `.env.local` and all real credentials out of Git. Only `.env.example` with placeholders belongs in the repository.
- The browser assistant requires server-side Groq and Upstash configuration. It must fail closed when AI or distributed rate limiting is unavailable.
- Make route and redirect changes in `vercel.json`; canonical URLs and `sitemap.xml` are generated from `KB_PUBLIC_URL` during the build.
- Do not deploy or change billing without the repository owner's explicit approval.
