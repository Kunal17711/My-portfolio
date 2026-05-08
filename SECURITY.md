# Security Policy

## Reporting a Vulnerability

If you find any security-related issues, please contact: **kkunaall10@gmail.com**

## Security Measures

- **Static Portfolio**: This is a static portfolio website. No sensitive user data is collected or stored.
- **No Secrets**: All API keys and sensitive credentials are moved to environment variables and never committed to version control.
- **Security Headers**: Configured via `next.config.ts` to include CSP, HSTS, X-Frame-Options, etc.
- **Safe External Links**: All external links use `rel="noopener noreferrer"` for protection against tabnabbing.
- **Rate Limiting**: Not required for this static site as there are no public write endpoints or server-side API routes.
- **Deployment**: Securely deployed via Vercel with automatic SSL/TLS.
