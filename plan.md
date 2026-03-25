# Launch Pad — Master Project Plan

> **Last updated:** March 24, 2026
> **Status:** Prototype complete. All 4 integrations wired. Ready for production build.

## The One-Line Pitch

> A trusted cockpit for builders who have great ideas and hate backend friction.
> Grant once. Build forever. Get your weekends back.

## Who This Is For

Founders, product people, and ops-minded builders who:

- Are building with AI agents (Claude, Cursor, Copilot)
- Constantly hit permission walls that slow them down
- Know what they want to build but don't want to live in the terminal
- Have lost entire weekends clicking through dashboards, hunting for keys, and configuring auth
- Are willing to pay $9.99/mo to never think about tokens, keys, or CLI flags again

**You are User #1. Build it for yourself. Sell it to everyone like you.**

---

## Business Model

| Tier | Price | What They Get |
|---|---|---|
| Free | $0 | 1 project, core integrations, read-only |
| Pro | $9.99/mo | Unlimited projects, Agent Bay, MCP generator, audit log, memory layer |
| Team | $29/mo | Shared vaults, role-based access, hosted option |

- Launch on Free + Pro only
- Stripe integration via Clerk billing (one integration handles both)
- Auth via Clerk — handles login, sessions, orgs, billing hooks
- **No custom auth code. Ever.**

---

## Core Philosophy

> "Grant once, build forever."

Every tool in the stack (Claude, Cursor, Vercel, Supabase, GitHub) has its own auth model, token lifetime, and permission scope. Launch Pad is the **permission orchestration layer** — you authenticate once per service, the UI handles everything else.

You should never need to:

- Open a terminal to generate a token
- Copy-paste keys between services
- Explain your project context to an agent twice
- Remember which env var goes where
- Miss a weekend with your family because of backend friction

---

## What's Been Built (Prototype)

The following has been built as a fully functional 2,300-line React prototype with real API integrations and persistent storage. This is not a mockup — every panel talks to real APIs.

### Dashboard (Health + Cost Cockpit)
- [x] Real-time service health — shows actual connection status for all 4 services
- [x] Live stats from GitHub (repos), Vercel (projects), Supabase (tables)
- [x] Alert system — surfaces failed deploys, disconnected services
- [x] Cost Cockpit — per-service cost tracking, Claude API token usage with real pricing math
- [x] Recently Updated feed — pulls latest repos + projects sorted by activity
- [x] Quick action shortcuts to connected services

### GitHub Integration (Live API)
- [x] Auto-connect on token save, shows username + repo counts
- [x] Full repo list with search/filter, language tags, stars, private/fork badges
- [x] Click into any repo → real branches + open PRs from API
- [x] Create Repository — name, description, private toggle, auto-init README
- [x] Delete Repository with confirmation
- [x] Open on GitHub links throughout
- [x] Error handling with retry + token update prompts

### Vercel Integration (Live API)
- [x] Auto-connect, shows username + project count
- [x] Project list with live deploy status indicators (green/yellow/red)
- [x] Click into project → three tabbed panels
- [x] Deployments tab — real deployment history with status, URL, branch, timestamps
- [x] Env Vars tab — full CRUD. Add new vars with target environment selectors (production/preview/development). Delete existing vars.
- [x] Domains tab — lists custom domains with verification status
- [x] Deploy Now button — triggers production redeploy via API

### Claude / Anthropic Integration (Live API)
- [x] Live Chat Console — real Anthropic Messages API, chat bubbles, typing indicator
- [x] System Prompt injection — load from Prompt Vault, shows active prompt banner
- [x] Model Selector — Sonnet 4, Opus 4, Haiku 4.5 with cost-per-token pricing
- [x] Prompt Vault — persistent storage, create/edit/delete/use, survives sessions
- [x] Usage Dashboard — real-time input/output token counts + cost calculation

### Supabase Integration (Live API)
- [x] Auto-connect via PostgREST introspection
- [x] Key Copy Bar — one-click copy for Project URL, Anon Key, Service Key
- [x] Tables tab — lists all public tables, click to browse first 50 rows with exact count
- [x] Full data grid with column headers, null handling, JSON truncation
- [x] SQL Console — code editor with preset queries, Cmd+Enter to run
- [x] Storage tab — lists buckets with public/private badges

### Agent Bay (with Memory Layer)
- [x] Project selector — auto-populated from GitHub repos + Vercel projects
- [x] Plain English task input
- [x] Granular permission checkboxes (push code, create PRs, deploy, write DB, run migrations)
- [x] Live terminal-style session log
- [x] Real Claude API integration — sends task with system prompt + accumulated memories
- [x] **Auto-Memory Extraction** — Claude generates MEMORY lines, auto-persisted
- [x] **Persistent Memory** — memories survive across sessions, grouped by project
- [x] **Memory-Augmented Context** — each new agent session gets all previous memories injected
- [x] Session History — full audit trail with task, model, tokens, memory-saved flag

### MCP Config Generator
- [x] Project-scoped config generation
- [x] Two format modes — Claude Code (`mcp_config.json`) and Cursor (`.cursor/mcp.json`)
- [x] Toggle-able MCP servers — GitHub, Supabase, Filesystem
- [x] Scope controls — read-only mode, timebox (30/60/120 min)
- [x] **Agent memories embedded** in config metadata
- [x] Project context included — GitHub repo, default branch, Vercel framework, Supabase tables
- [x] One-click copy for config JSON and generated .env file
- [x] Step-by-step usage instructions per format

### Settings / Vault
- [x] Slide-out drawer with all 6 credential fields
- [x] Show/hide toggle per token
- [x] Direct "Get token" links to GitHub, Vercel, Supabase, Anthropic dashboards
- [x] Save to persistent storage
- [x] Delete individual keys
- [x] Connection status indicators on every sidebar nav item
- [x] Toast notifications for all actions

### UI / Design
- [x] Dark mode throughout (#09090b base) — Robinhood-inspired
- [x] Service-specific color coding (purple GitHub, white Vercel, green Supabase, amber Claude)
- [x] DM Sans typography
- [x] Smooth fade-up animations on mount
- [x] Pulse dot indicators for live connections
- [x] Glow effects on hover
- [x] Custom scrollbars

---

## What Needs to Be Built (Production)

### Phase A — Real Next.js App (Week 1-2)

Take the prototype and stand it up as a real deployable application.

- [ ] Scaffold Next.js 14 project with App Router
- [ ] Install dependencies: tailwindcss, lucide-react
- [ ] Split the 2,300-line prototype into proper component files
- [ ] Move API calls to Next.js API routes (keeps secrets server-side)
- [ ] Set up proper environment variable handling
- [ ] Test all 4 integrations end-to-end
- [ ] Deploy to Vercel (your account is ready)

**Folder structure:**
```
launch-pad/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Dashboard
│   ├── (dashboard)/
│   │   ├── github/page.tsx
│   │   ├── vercel/page.tsx
│   │   ├── supabase/page.tsx
│   │   ├── claude/page.tsx
│   │   ├── agent/page.tsx
│   │   └── mcp/page.tsx
│   └── api/
│       ├── github/[...path]/route.ts
│       ├── vercel/[...path]/route.ts
│       ├── supabase/[...path]/route.ts
│       └── anthropic/route.ts
├── components/
│   ├── layout/                     # Sidebar, Header, Toast
│   ├── dashboard/                  # Health, Cost Cockpit
│   ├── github/                     # GitHubView components
│   ├── vercel/                     # VercelView components
│   ├── supabase/                   # SupabaseView components
│   ├── claude/                     # Chat, Models, PromptVault
│   ├── agent/                      # AgentBay, Memory, Sessions
│   ├── mcp/                        # Config Generator
│   └── ui/                         # Shared components
├── lib/
│   ├── github.ts                   # GitHub API helpers
│   ├── vercel.ts                   # Vercel API helpers
│   ├── supabase.ts                 # Supabase API helpers
│   ├── anthropic.ts                # Claude API helpers
│   ├── vault.ts                    # Key storage abstraction
│   └── memory.ts                   # Agent memory helpers
├── public/
│   ├── manifest.json               # PWA manifest
│   └── sw.js                       # Service worker
└── .env.local
```

### Phase B — Auth + Billing (Week 2-3)

- [ ] Create Clerk account + app (free tier covers launch)
- [ ] Add Clerk middleware to Next.js
- [ ] Login/signup pages (Clerk provides pre-built components)
- [ ] Create Stripe account
- [ ] Set up Stripe product: Launch Pad Pro @ $9.99/mo
- [ ] Wire Clerk ↔ Stripe (native integration, minimal glue code)
- [ ] Build billing page — current plan, upgrade/downgrade, cancel
- [ ] Free tier gating: 1 project, read-only integrations
- [ ] Pro tier: unlimited projects, Agent Bay, MCP generator, memory
- [ ] Move vault storage from browser to encrypted Supabase Vault (user-scoped)
- [ ] Move agent memory to Supabase (user-scoped)
- [ ] Create Supabase project for Launch Pad itself (separate from user projects)

### Phase C — Landing Page (Week 3)

Build a single-page marketing site. This is what people see before they sign up.

- [ ] Hero section: headline, subhead, CTA button
- [ ] Headline: "Stop managing. Start building." or "Get your weekends back."
- [ ] Subhead: Your story — one sentence about the pain, one about the fix
- [ ] Demo GIF or Loom embed showing the dashboard
- [ ] Feature grid — the 4 integrations + Agent Bay + MCP Generator
- [ ] Pricing section — Free vs Pro, simple table
- [ ] Social proof (even if it's just "Built by a builder, for builders")
- [ ] CTA: "Start free" button → Clerk signup
- [ ] Built with Next.js, deployed on same Vercel project as the app

**Key marketing angles:**

- "Control your entire dev stack from one screen"
- "Your AI agents get smarter every session" (memory layer)
- "One config file gives Claude Code full context" (MCP generator)
- "I built this because I lost weekends to dashboard hell"
- "$9.99/mo to never copy-paste a token again"

### Phase D — Launch (Week 4)

- [ ] Record a 2-minute Loom walkthrough: connect GitHub, browse repos, deploy on Vercel, chat with Claude, run an agent task, generate MCP config
- [ ] Write ProductHunt listing (title, tagline, description, screenshots)
- [ ] Schedule ProductHunt launch for a Tuesday or Wednesday (highest traffic days)
- [ ] Post on X/Twitter with the Loom video
- [ ] Post in relevant communities: r/SideProject, r/SaaS, Indie Hackers, Hacker News Show HN
- [ ] Respond to every comment on launch day (this matters more than anything)
- [ ] Set up a simple analytics tool (Plausible or PostHog free tier)

---

## Post-Launch Roadmap (Phase E+)

### Phase E — Mobile PWA (Week 5-6)

- [ ] PWA manifest + service worker
- [ ] Responsive layout for all panels (Tailwind makes this straightforward)
- [ ] Mobile quick-actions: deploy, launch agent, copy key, rollback
- [ ] Push notifications: deploy status, agent completion, token expiring
- [ ] Biometric lock for sensitive actions (Web Authentication API)

### Phase F — Advanced Features (Week 7-10)

- [ ] Project Scaffolder: "New Project" creates GitHub repo + Vercel project + Supabase instance + links them + pushes env vars in one flow
- [ ] Cross-Service Wiring Detector: "Your Vercel project is missing SUPABASE_URL" — flags mismatches and offers one-click fixes
- [ ] .env Sync Engine: define what env vars a project needs once, Launch Pad checks all services
- [ ] Incident Timeline: correlate failed deploys with recent commits and DB changes
- [ ] Deploy Pipeline Builder: visual flow for push → test → preview → approve → production

### Phase G — Team Tier (Week 10+)

- [ ] Shared credential vaults (Clerk organizations)
- [ ] Role-based access (admin can deploy, member can view)
- [ ] Team audit log
- [ ] Onboarding flow for new team members
- [ ] $29/mo pricing

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React | Same code for web + future Tauri desktop |
| Styling | Tailwind CSS | Fast, consistent, responsive |
| Auth | Clerk | Zero custom auth. Login, sessions, orgs, billing hooks |
| Payments | Stripe via Clerk billing | One integration handles both |
| GitHub | Octokit / REST API | Direct API calls, already working |
| Vercel | Vercel REST API | Full coverage, already working |
| Supabase | PostgREST + Management API | Already working in prototype |
| Anthropic | Messages API | Already working, live chat + agent |
| App Database | Supabase (Postgres) | Stores user data, memories, sessions, vault |
| Local Dev | Prototype runs as React artifact | Can be tested in Claude before deploying |

**Key principle:** No custom backend. API routes in Next.js only. Third-party services for everything else.

---

## What You Need to Set Up (One-Time, ~1 Hour Total)

### 1. Clerk Account (~15 min)
- Go to clerk.com → Create application
- Free tier covers everything for launch
- Handles: login, user management, org support (Team tier later)
- Get your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

### 2. Stripe Account (~20 min)
- Go to stripe.com → Create account
- Create a product: "Launch Pad Pro" @ $9.99/month
- Connect to Clerk (native integration in Clerk dashboard)
- Get your price ID for the subscription

### 3. Supabase Project for Launch Pad (~10 min)
- Go to supabase.com → New Project (name it "launch-pad-prod")
- This is separate from any project you build WITH Launch Pad
- Will store: user vault (encrypted), agent memories, session logs
- Tables needed: `user_vault`, `agent_memories`, `agent_sessions`, `audit_log`

### 4. Vercel Project (~5 min)
- You already have a Vercel account
- Connect to GitHub repo → auto-deploys on push
- Add env vars: Clerk keys, Supabase keys, Stripe keys

### 5. Domain (Optional, ~10 min)
- Buy a domain: `launchpad.dev`, `uselaunchpad.com`, or similar
- Point to Vercel project
- Gives the product credibility

**When you're ready to do any of these, just say "let's do step N" and I'll give you exact instructions.**

---

## Success Criteria

- [ ] Zero terminal commands needed for routine permission tasks
- [ ] Any agent task authorized and launched in < 30 seconds
- [ ] Full audit trail of every automated action
- [ ] One codebase runs as hosted web app (and future desktop app)
- [ ] $9.99/mo feels like an obvious yes for anyone building with AI agents
- [ ] Agent gets measurably smarter per project over time (memory layer)
- [ ] One MCP config file gives Claude Code full project context
- [ ] 100 paying users within 60 days of launch
- [ ] You never miss another weekend to backend friction

---

## The Story (For Marketing)

> I'm an ops guy at a real estate tech company. I build side projects with AI agents on nights and weekends. Or at least I try to.
>
> The reality was: I'd sit down on Saturday morning to build something cool, and three hours later I'd still be hunting for tokens across five dashboards, copy-pasting env vars, and trying to remember which Supabase key goes where.
>
> I've missed entire weekends with my family clicking through backend mess.
>
> So I built Launch Pad. One screen. All your services. Grant permissions once, and let your AI agents work. The agent even remembers what it learned last time.
>
> I built it for me. Turns out a lot of people have the same problem.

---

## Quick Reference: What Each Feature Is Worth

| Feature | Pain it solves | Who cares |
|---|---|---|
| GitHub panel | Token hunting, scope confusion, terminal for basic ops | Everyone |
| Vercel panel | Env var hell across environments, dashboard context-switching | Everyone |
| Supabase panel | Keys buried in dashboard, RLS confusion, CLI dependency | Everyone |
| Claude panel | API key management, prompt reuse, cost tracking | AI builders |
| Agent Bay | 15-min agent setup ritual becomes 30 seconds | Power users (Pro) |
| Agent Memory | Agents start from zero every session | Power users (Pro) |
| MCP Generator | No standard way to hand off context to Claude Code | Power users (Pro) |
| Cost Cockpit | Spend scattered across 4 dashboards | Everyone |
| Dashboard | "Is everything okay?" requires checking 4 services | Everyone |

**Free tier gets the top 4. Pro tier gets everything.** The free-to-Pro conversion happens when someone launches their first agent task and sees the memory layer in action.
