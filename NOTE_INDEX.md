Why you might see 403 on static host:
- Static hosters expect an index.html at the root.
- Next.js projects are not static by default; they must be built and served.
- This repo includes public/index.html as a fallback for simple hosts.
- Recommended: Deploy Next.js on Vercel or serve built output.
