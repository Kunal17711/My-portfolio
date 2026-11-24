# Security Policy

## Reporting a Vulnerability

If you find any security-related issues, please contact: **kkunaall10@gmail.com**

## Security Measures

- The public static build is allowlisted and checked to keep server files, API files, knowledge data, environment files, source maps, and reports out of the public output.
- The assistant API validates request size and schema, checks the configured origin, and fails closed when AI or Upstash Redis is unavailable.
- Upstash uses atomic Lua scripts for shared quotas, concurrent-request locks, token reservations, and refunds. Visitor identifiers are HMAC-derived from request metadata.
- Groq and Upstash credentials are read on the server. Never add real credentials to source files, browser JavaScript, or Git.
- Vercel response headers set a restrictive content security policy, frame and MIME protections, referrer policy, permissions policy, and HSTS.
- Assistant responses stream approved answer text and links; provider errors and internal prompts are not returned to the browser.

Configure `AI_ENABLED=false` until all server environment variables are present and verified. Review `vercel.json` and the build output before deployment.
