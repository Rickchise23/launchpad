# 🚀 Launch Pad

> The cockpit for builders who hate backend friction.
> Grant once. Build forever. Get your weekends back.

## What is this?

Launch Pad is a unified control panel for your entire dev stack. GitHub, Vercel, Supabase, Claude — one screen, one login, zero terminal commands.

- **GitHub:** Manage repos, branches, PRs without leaving the app
- **Vercel:** Deploy, manage env vars, monitor domains
- **Supabase:** Browse tables, run SQL, manage storage
- **Claude:** Live chat, prompt vault, model selector, cost tracking
- **Agent Bay:** Launch AI agent tasks with persistent memory
- **MCP Generator:** One-click configs for Claude Code and Cursor

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Rickchise23/launchpad.git
cd launchpad

# Use Node 20 to match Vercel (`engines` + `.nvmrc`) — e.g. `nvm use`
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Push this repo to GitHub (see clone URL above).
2. In [Vercel](https://vercel.com), **Add New Project** and import the repository. Framework defaults are correct for Next.js.
3. Optional: set **Environment variable** `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://launchpad.vercel.app`) so Open Graph and `sitemap.xml` use the right origin. Vercel also sets `VERCEL_URL`, which is used as a fallback at build time.
4. Clerk, Stripe, and Supabase keys from `.env.example` are only needed when those features are wired into the app.

## Security note

Dependencies are kept on current **Next.js 15** patch releases so `npm audit` stays clean. This prototype still stores service tokens in **browser localStorage** and calls third-party APIs from the client—fine for personal use; for a public product, move secrets and requests server-side (see project roadmap).

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS**
- **Clerk** (Auth)
- **Stripe** (Billing)
- **Supabase** (Database)

## License

[MIT](LICENSE)
