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

# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Clerk** (Auth)
- **Stripe** (Billing)
- **Supabase** (Database)

## License

MIT
