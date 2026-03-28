# 🚀 Launch Pad

> The cockpit for builders who hate backend friction.
> Grant once. Build forever. Get your weekends back.

## What is this?

Launch Pad is a unified control panel for your entire dev stack. GitHub, Vercel, Supabase, Claude — one screen, one login, zero terminal commands.

### Routes

| Path | Purpose |
|------|---------|
| `/` | **Marketing landing** (full-page Claude build) **or** signed-in **Launch Pad** — see `HomeGate` + `HomeAuthenticated` |
| `/pricing` | Short pricing page (optional; landing also has `#pricing`) |
| `/sign-in`, `/sign-up` | [Clerk](https://clerk.com) auth (dark-themed); CTAs use `/sign-up` |
| `/app` | **Dashboard** — same `LaunchPad` UI (still protected by middleware when Clerk is on) |

### Auth gating (Clerk)

When **`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`** and **`CLERK_SECRET_KEY`** are set in Vercel, [middleware](middleware.ts) requires sign-in for `/app` and all non-public paths. **If those keys are missing, the app runs in open mode** (for local/CI builds) — **always set both keys in production.**

Optional: `LAUNCHPAD_AUTH_DISABLED=1` forces open mode even with keys (local only; never in production).

After creating a [Clerk application](https://dashboard.clerk.com), add your production domain under **Domains** and allow redirects to `/app`, `/sign-in`, `/sign-up`.

- **GitHub:** Manage repos, branches, PRs without leaving the app
- **Vercel:** Deploy, manage env vars, monitor domains
- **Supabase:** Browse tables, run SQL, manage storage
- **Claude:** Live chat, prompt vault, model selector, cost tracking
- **Agent Bay:** Launch AI agent tasks with persistent memory
- **MCP Generator:** One-click configs for Claude Code and Cursor
- **Domains:** Search availability across common TLDs (Vercel Domains API), compare registrars, connect a domain to a Vercel project in one click, and see domains already on your Vercel account

## Domains panel

Requires a **Vercel token** in Vault (same as the Vercel panel).

- **Search** — checks availability via `GET /v4/domains/status?name=` across `.com`, `.dev`, `.sh`, `.io`, `.co`, `.app`, `.build`, `.tools`, `.so`, `.ai`
- **Buy links** — deep-links to Namecheap (and detail panel links for GoDaddy / Google Domains flows)
- **Connect to Vercel** — pick a project, then `POST /v10/projects/{id}/domains` to attach the domain
- **Your Vercel domains** — `GET /v5/domains` with verification status

DNS: point nameservers at Vercel (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`); SSL is provisioned automatically once DNS is correct.

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

Open [http://localhost:3000](http://localhost:3000) — with Clerk keys, signed-out users see the **marketing landing**; after sign-up they land in the cockpit on **`/`**. [http://localhost:3000/app](http://localhost:3000/app) is the same dashboard (direct link).

Without Clerk keys in `.env.local`, `/` shows the landing only (no `useUser`); use **`/app`** to open the cockpit.

## Deploy (Vercel)

1. Push this repo to GitHub (see clone URL above).
2. In [Vercel](https://vercel.com), **Add New Project** and import the repository. Framework defaults are correct for Next.js.
3. **Required for a gated product:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` (from [Clerk dashboard](https://dashboard.clerk.com) → API Keys).
4. Set **`NEXT_PUBLIC_SITE_URL`** to your canonical URL (e.g. `https://uselaunchpad.dev`) so Open Graph, `robots.txt`, and `sitemap.xml` use the right host.
5. **Stripe:** connect Stripe to Clerk in the Clerk dashboard when you enable billing; use `STRIPE_PRICE_ID` / `STRIPE_SECRET_KEY` as in `.env.example` for server/webhook code you add later.
6. Supabase keys in `.env.example` are for Launch Pad’s **own** backend vault (Phase B), not required to run the dashboard prototype.

## Security note

Dependencies are kept on current **Next.js 15** patch releases so `npm audit` stays clean. This prototype still stores service tokens in **browser localStorage** and calls third-party APIs from the client—fine for personal use; for a public product, move secrets and requests server-side (see project roadmap).

## Desktop (later)

Same React UI can be wrapped in **[Tauri](https://tauri.app/)** (see `plan.md`): ship a Mac app that loads your **authenticated** `/app` URL or a bundled static build. Do this after web auth + vault are stable.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS**
- **Clerk** (auth + future Stripe Billing)
- **Stripe** (via Clerk; webhook routes TBD)
- **Supabase** (planned for encrypted vault / persistence)

## License

[MIT](LICENSE)
