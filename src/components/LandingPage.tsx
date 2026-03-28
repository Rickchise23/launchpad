'use client';

/* eslint-disable react/no-unescaped-entities */

import Link from 'next/link';
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [demoStep, setDemoStep] = useState(0);
  const [count, setCount] = useState({ devs: 0, deploys: 0, prompts: 0 });

  // Auto-cycle demo steps
  useEffect(() => {
    const timer = setInterval(() => setDemoStep(p => (p + 1) % 4), 3000);
    return () => clearInterval(timer);
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const targets = { devs: 480, deploys: 12400, prompts: 89000 };
        Object.entries(targets).forEach(([key, target]) => {
          let val = 0;
          const step = target / 40;
          const t = setInterval(() => {
            val += step;
            if (val >= target) { val = target; clearInterval(t); }
            setCount(p => ({ ...p, [key]: Math.floor(val) }));
          }, 30);
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    const el = document.getElementById("social-proof");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const demoSteps = [
    { service: "GitHub", color: "#8b5cf6", token: "ghp_x4kR...mN7q", time: "3s", icon: "◈" },
    { service: "Vercel", color: "#fff", token: "vrcl_8jT...pW2x", time: "3s", icon: "▲" },
    { service: "Supabase", color: "#3ecf8e", token: "sbp_2nK...yR5m", time: "3s", icon: "⬡" },
    { service: "Claude", color: "#d97706", token: "sk-ant...4xQ", time: "3s", icon: "◇" },
  ];

  const features = [
    { title: "GitHub", desc: "Repos, branches, PRs, and code search. Create, delete, and manage without leaving your cockpit.", color: "#8b5cf6", details: ["List and search repos", "Create and delete repos", "View branches and PRs", "Full error handling"] },
    { title: "Vercel", desc: "Projects, deployments, domains, and env vars. Trigger deploys and manage your entire hosting layer.", color: "#fff", details: ["View all projects", "Trigger deployments", "Manage env variables", "Connect custom domains"] },
    { title: "Supabase", desc: "Tables, data, SQL console, and storage. Browse your database and run queries from one panel.", color: "#3ecf8e", details: ["Browse tables and data", "SQL console", "Storage buckets", "Copy connection strings"] },
    { title: "Claude", desc: "Chat console, model selector, prompt vault, and usage tracking. Your AI co-pilot lives here.", color: "#d97706", details: ["Multi-model chat", "Prompt vault (save and reuse)", "Usage and cost tracking", "Context-aware responses"] },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#09090b", fontFamily: "'DM Sans', -apple-system, sans-serif", color: "#e0e0e0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes slideToken { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes checkmark { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        @keyframes tabCollapse { 0% { transform: translateX(var(--tx)) scale(1); opacity: 1; } 100% { transform: translateX(0) scale(0.95); opacity: 0; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(0,230,118,0.1); } 50% { box-shadow: 0 0 40px rgba(0,230,118,0.25); } }
        .fade-up { animation: fadeUp 0.8s ease both; }
        .card-hover { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.12) !important; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: "rgba(9,9,11,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#00e676" }}>
            <svg viewBox="0 0 24 24" fill="#09090b" className="w-4 h-4"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11.95A22 22 0 0112 15z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
          </div>
          <span className="text-sm font-semibold text-white tracking-wide">Launch Pad</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#demo" className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Demo</a>
          <a href="#features" className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Features</a>
          <a href="#pricing" className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Pricing</a>
          <Link href="/sign-up" className="px-5 py-2 rounded-full text-xs font-semibold" style={{ background: "#00e676", color: "#09090b" }}>Open Launch Pad</Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%)", top: "10%", left: "25%", animation: "float 12s ease-in-out infinite" }}/>
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)" }}/>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* PH Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ background: "rgba(0,230,118,0.06)", border: "1px solid rgba(0,230,118,0.15)", animation: "fadeUp 0.8s ease 0.1s both" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00e676", animation: "pulse 2s infinite" }}/>
            <span className="text-[11px] font-medium" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>Live on ProductHunt</span>
          </div>

          {/* Pain */}
          <div className="mb-6" style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              {["GitHub", "Vercel", "Supabase", "Claude", "???"].map((tab, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg text-[10px]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono", animation: `fadeIn 0.3s ease ${0.3 + i * 0.1}s both` }}>
                  {tab}
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>^ Every time you switch tabs, you lose context. Every time you close the laptop, you start over.</p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white" style={{ letterSpacing: "-0.04em", lineHeight: 1.05, animation: "fadeUp 0.8s ease 0.4s both" }}>
            Your project state.<br/>Saved. Always.
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-medium" style={{ color: "rgba(255,255,255,0.7)", animation: "fadeUp 0.8s ease 0.5s both", letterSpacing: "-0.02em" }}>
            Stop rebuilding context. Your AI remembers everything.
          </p>

          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, animation: "fadeUp 0.8s ease 0.6s both" }}>
            GitHub. Vercel. Supabase. Claude. One cockpit that saves your entire project state. Close the laptop Friday. Open it Monday. Pick up exactly where you left off.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animation: "fadeUp 0.8s ease 0.8s both" }}>
            <Link href="/sign-up" className="group px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 transition-all"
              style={{ background: "#00e676", color: "#09090b", animation: "glow 3s ease infinite" }}>
              Launch Your Cockpit. It&apos;s Free.
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <a href="#demo" className="px-8 py-4 rounded-full text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              Watch the 20-Second Setup
            </a>
          </div>

          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.2)", animation: "fadeUp 0.8s ease 1s both" }}>Free forever. No credit card. Your API keys are stored locally in your browser. We never see them.</p>
        </div>
      </section>

      {/* ─── 20-SECOND DEMO ─── */}
      <section id="demo" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>THE SETUP</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4" style={{ letterSpacing: "-0.03em" }}>20 seconds. 4 services. Done.</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Paste your API keys. Everything lights up. That's the whole onboarding.</p>
          </div>

          {/* Animated demo */}
          <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Timer */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: "#00e676", animation: "pulse 1.5s infinite" }}/>
                <span className="text-xs" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>Setting up Launch Pad...</span>
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "JetBrains Mono" }}>{(demoStep + 1) * 5}s / 20s</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 rounded-full mb-8" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((demoStep + 1) / 4) * 100}%`, background: "#00e676" }}/>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-4 gap-3">
              {demoSteps.map((step, i) => {
                const isActive = i === demoStep;
                const isDone = i < demoStep;
                return (
                  <div key={i} className="rounded-xl p-5 transition-all duration-500 relative"
                    style={{ background: isActive ? "rgba(0,230,118,0.04)" : isDone ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)",
                      border: `1px solid ${isActive ? "rgba(0,230,118,0.2)" : isDone ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"}`,
                      transform: isActive ? "scale(1.02)" : "scale(1)" }}>
                    {isDone && (
                      <div className="absolute top-3 right-3">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" className="w-4 h-4" style={{ stroke: "#00e676" }}>
                          <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 24, animation: "checkmark 0.3s ease both" }}/>
                        </svg>
                      </div>
                    )}
                    <div className="text-lg mb-2" style={{ color: step.color, opacity: isDone || isActive ? 1 : 0.2 }}>{step.icon}</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: isDone || isActive ? "#fff" : "rgba(255,255,255,0.2)" }}>{step.service}</div>
                    {(isActive || isDone) && (
                      <div className="mt-2" style={{ animation: "slideToken 0.4s ease both" }}>
                        <div className="text-[10px] px-2 py-1 rounded inline-block" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono" }}>
                          {step.token}
                        </div>
                      </div>
                    )}
                    {!isActive && !isDone && (
                      <div className="mt-2 text-[10px]" style={{ color: "rgba(255,255,255,0.1)", fontFamily: "JetBrains Mono" }}>Waiting...</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Result */}
            <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="text-sm" style={{ color: demoStep === 3 ? "#00e676" : "rgba(255,255,255,0.3)" }}>
                {demoStep === 3 ? "All services connected. Your cockpit is live." : `${3 - demoStep} service${3 - demoStep !== 1 ? "s" : ""} remaining...`}
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Works with any GitHub, Vercel, Supabase, or Anthropic account. Personal or team. Free tier or paid. Just paste your token.</p>
        </div>
      </section>

      {/* ─── PROBLEM/SOLUTION ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,82,82,0.03)", border: "1px solid rgba(255,82,82,0.1)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-4" style={{ color: "#ff5252", fontFamily: "JetBrains Mono" }}>Without Launch Pad</div>
              <div className="space-y-3">
                {[
                  "You close the laptop. Context is gone.",
                  "You reopen 5 dashboards to remember where you were.",
                  "You scroll through Claude history to find that one conversation.",
                  "Your API keys are scattered across sticky notes and .env files.",
                  "Your best prompts live in a Google Doc you can't find.",
                  "You lose 30 minutes before you write a single line of code.",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-sm mt-0.5" style={{ color: "rgba(255,82,82,0.5)" }}>x</span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{line}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* After */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(0,230,118,0.03)", border: "1px solid rgba(0,230,118,0.1)" }}>
              <div className="text-[10px] uppercase tracking-widest mb-4" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>With Launch Pad</div>
              <div className="space-y-3">
                {[
                  "Open one screen. Your entire project state is right there.",
                  "AI agents remember what you worked on yesterday.",
                  "Your best prompts are saved forever in the Vault.",
                  "All API keys are stored securely. One place. Always.",
                  "Repos, deploys, tables, and conversations. One scroll.",
                  "You're coding in 30 seconds, not 30 minutes.",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5" className="w-4 h-4 mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section id="social-proof" className="py-16 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white" style={{ fontFamily: "JetBrains Mono" }}>{count.devs.toLocaleString()}+</div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Developers using Launch Pad</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white" style={{ fontFamily: "JetBrains Mono" }}>{count.deploys.toLocaleString()}</div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Deploys triggered from cockpit</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white" style={{ fontFamily: "JetBrains Mono" }}>{count.prompts.toLocaleString()}</div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Claude prompts sent</div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>THE PANELS</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-4" style={{ letterSpacing: "-0.03em" }}>Your stack. Your state. One screen.</h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Everything you need to ship. Nothing you need to reconstruct.</p>
          </div>

          {/* Feature tabs */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {features.map((f, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: activeTab === i ? "rgba(255,255,255,0.06)" : "transparent", color: activeTab === i ? "#fff" : "rgba(255,255,255,0.3)", border: `1px solid ${activeTab === i ? "rgba(255,255,255,0.1)" : "transparent"}` }}>
                <span style={{ color: features[i].color, marginRight: 6 }}>{["◈","▲","⬡","◇"][i]}</span>{f.title}
              </button>
            ))}
          </div>

          {/* Active feature */}
          <div className="rounded-2xl p-8 card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }} key={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">{features[activeTab].title}</h3>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{features[activeTab].desc}</p>
                <div className="space-y-2">
                  {features[activeTab].details.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" className="w-4 h-4 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#00e676" }}/>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono" }}>LIVE PREVIEW</span>
                </div>
                {/* Mock panel preview */}
                <div className="space-y-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="w-6 h-6 rounded" style={{ background: `${features[activeTab].color}15` }}/>
                      <div className="flex-1">
                        <div className="h-2 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.08)", width: `${60 + i * 10}%` }}/>
                        <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.03)", width: `${40 + i * 8}%` }}/>
                      </div>
                      <div className="h-2 w-8 rounded-full" style={{ background: "rgba(0,230,118,0.15)" }}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Extra features grid */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {[
              { title: "Domains", desc: "Search availability, buy, and connect to Vercel projects. Never leave the cockpit.", icon: "🌐" },
              { title: "Prompt Vault", desc: "Your best prompts, saved forever. Stop rewriting the same system prompt every session. Build a library that compounds.", icon: "📦" },
            ].map((f, i) => (
              <div key={i} className="rounded-xl p-5 card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-xl mb-2">{f.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AGENT BAY (HERO FEATURE) ─── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🧠</span>
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>Agent Bay</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>An AI that remembers<br/>your entire project.</h3>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                  Most AI tools forget you the second the conversation ends. Agent Bay doesn't. It builds a persistent memory layer across every session. Your architecture decisions, your naming conventions, your debugging history, your preferences. It learns how YOU work and gets better every time you use it.
                </p>
                <div className="space-y-3">
                  {[
                    "Persistent memory that survives across sessions",
                    "Auto-extracts key decisions from every conversation",
                    "Injects project context into every new task automatically",
                    "Session audit trail. See exactly what your agent did and why.",
                    "Your agent knows your codebase, your stack, your style",
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" className="w-4 h-4 mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center" style={{ background: "rgba(255,255,255,0.015)" }}>
                {/* Agent conversation mock */}
                <div className="space-y-3">
                  <div className="flex justify-end"><div className="px-4 py-2.5 rounded-xl rounded-br-sm text-sm" style={{ background: "rgba(0,230,118,0.08)", color: "rgba(255,255,255,0.7)", maxWidth: "85%" }}>Deploy the auth update to Vercel and run the migration on Supabase</div></div>
                  <div className="flex justify-start"><div className="px-4 py-2.5 rounded-xl rounded-bl-sm text-sm" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", maxWidth: "85%" }}>On it. I see from our last session you're using Clerk for auth and your Supabase migration is in /supabase/migrations/004_add_user_roles.sql. Deploying to your "launchpad" Vercel project now and running the migration against your production database.</div></div>
                  <div className="flex justify-end"><div className="px-4 py-2.5 rounded-xl rounded-br-sm text-sm" style={{ background: "rgba(0,230,118,0.08)", color: "rgba(255,255,255,0.7)", maxWidth: "85%" }}>How did you know about the migration file?</div></div>
                  <div className="flex justify-start"><div className="px-4 py-2.5 rounded-xl rounded-bl-sm text-sm" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", maxWidth: "85%" }}>You mentioned it on Tuesday. I saved it as a memory. I have 47 memories about this project so far.</div></div>
                </div>
                <div className="flex items-center gap-2 mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00e676" }}/>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono" }}>47 memories / 12 sessions / Learning continuously</span>
                </div>
                {/* Memory store preview */}
                <div className="mt-4 rounded-lg p-3 space-y-1.5" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div className="text-[9px] uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "JetBrains Mono" }}>Agent Memory Store</div>
                  {[
                    "Stack: Next.js 14 + Supabase + Clerk",
                    "Auth: Clerk webhooks sync to Supabase users table",
                    "DB: migration 004_add_user_roles.sql pending",
                    "Deploy: Vercel project \"launchpad\", last deploy Mar 26",
                    "Style: prefers Tailwind, dark mode, DM Sans font",
                    "Pattern: always uses App Router, never Pages",
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(0,230,118,0.4)" }}/>
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono" }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MCP CONFIG (HERO FEATURE) ─── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 flex flex-col justify-center order-2 md:order-1" style={{ background: "rgba(255,255,255,0.015)" }}>
                {/* Config preview */}
                <div className="rounded-xl p-5" style={{ background: "rgba(0,0,0,0.3)", fontFamily: "JetBrains Mono", fontSize: "11px", lineHeight: 1.8 }}>
                  <div style={{ color: "rgba(255,255,255,0.2)" }}>{'// Generated by Launch Pad'}</div>
                  <div style={{ color: "rgba(255,255,255,0.2)" }}>{'// .cursor/mcp.json'}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>{"{"}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>{"  "}<span style={{ color: "#00e676" }}>"github"</span>: {"{"} <span style={{ color: "rgba(255,255,255,0.3)" }}>"token": "ghp_..."</span> {"}"}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>{"  "}<span style={{ color: "#00e676" }}>"vercel"</span>: {"{"} <span style={{ color: "rgba(255,255,255,0.3)" }}>"token": "vrcl_..."</span> {"}"}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>{"  "}<span style={{ color: "#00e676" }}>"supabase"</span>: {"{"} <span style={{ color: "rgba(255,255,255,0.3)" }}>"url": "...", "key": "..."</span> {"}"}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>{"  "}<span style={{ color: "#00e676" }}>"context"</span>: {"{"}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)" }}>{"    "}"project": "launchpad",</div>
                  <div style={{ color: "rgba(255,255,255,0.3)" }}>{"    "}"memories": [47 items],</div>
                  <div style={{ color: "rgba(255,255,255,0.3)" }}>{"    "}"stack": "Next.js + Supabase + Clerk"</div>
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>{"  }"}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>{"}"}</div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button className="text-[10px] px-3 py-1.5 rounded-lg font-medium" style={{ background: "rgba(0,230,118,0.1)", color: "#00e676", border: "1px solid rgba(0,230,118,0.2)" }}>Copy to Cursor</button>
                  <button className="text-[10px] px-3 py-1.5 rounded-lg font-medium" style={{ background: "rgba(0,230,118,0.1)", color: "#00e676", border: "1px solid rgba(0,230,118,0.2)" }}>Copy to Claude Code</button>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "JetBrains Mono" }}>One click. Done.</span>
                </div>
              </div>
              <div className="p-10 md:p-12 order-1 md:order-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⚙️</span>
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>MCP Config Generator</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}>Your tools wake up<br/>knowing your project.</h3>
                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                  MCP is how AI coding tools connect to your services. Setting it up manually means hunting for token formats, writing JSON by hand, and debugging config files. Launch Pad generates your entire MCP config with one click. Your credentials, your project context, and your agent memories. All baked in. Paste it into Cursor or Claude Code and your AI instantly knows your stack.
                </p>
                <div className="space-y-3">
                  {[
                    "Generates .cursor/mcp.json and Claude Code configs",
                    "Scoped credentials for GitHub, Vercel, Supabase",
                    "Embeds your Agent Bay memories into the config",
                    "Your AI tools know your project before you type a word",
                    "Updates automatically as your project evolves",
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" className="w-4 h-4 mt-0.5 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ letterSpacing: "-0.03em" }}>Builders who stopped losing context.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Alex K.", role: "Full-stack dev", text: "I used to spend 20 minutes every morning rebuilding my mental context. Now I open Launch Pad and I'm exactly where I left off. It's like a save state for my entire workflow." },
              { name: "Sarah M.", role: "Indie hacker", text: "The Agent Bay is the reason I stay. It remembers my project architecture, my naming conventions, my last 5 debugging sessions. I've never had an AI tool that keeps context like this." },
              { name: "James T.", role: "Startup founder", text: "Our team ships on nights and weekends. Launch Pad means I can close the laptop at midnight and pick up Saturday morning without losing a single thread. That's worth 10x the price." },
            ].map((t, i) => (
              <div key={i} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center gap-0.5 mb-3">{[1,2,3,4,5].map(s => <span key={s} style={{ color: "#00e676", fontSize: 12 }}>★</span>)}</div>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>"{t.text}"</p>
                <div className="text-xs"><span className="text-white font-medium">{t.name}</span> <span style={{ color: "rgba(255,255,255,0.25)" }}>{t.role}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "#00e676", fontFamily: "JetBrains Mono" }}>PRICING</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4" style={{ letterSpacing: "-0.03em" }}>Start free. Upgrade when you're hooked.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-sm font-medium text-white mb-1">Free</div>
              <div className="text-3xl font-bold text-white mb-1">$0</div>
              <div className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>Forever. No credit card.</div>
              <div className="space-y-2 mb-6">
                {["1 project", "All 9 panels", "GitHub + Vercel + Supabase + Claude", "Agent Bay (5 memories)", "Prompt Vault (10 prompts)", "Community support"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>{f}
                  </div>
                ))}
              </div>
              <Link href="/sign-up" className="block text-center py-3 rounded-xl text-sm font-medium" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>Get Started Free</Link>
            </div>
            {/* Pro */}
            <div className="rounded-2xl p-8 relative" style={{ background: "rgba(0,230,118,0.03)", border: "1px solid rgba(0,230,118,0.15)" }}>
              <div className="absolute top-4 right-4 text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0,230,118,0.1)", color: "#00e676" }}>POPULAR</div>
              <div className="text-sm font-medium text-white mb-1">Pro</div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">$9.99</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>/month</span>
              </div>
              <div className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>Cancel anytime. Never rebuild context again.</div>
              <div className="space-y-2 mb-6">
                {["Unlimited projects", "All 9 panels", "Agent Bay with unlimited memory", "Full session history and audit trail", "MCP Config Generator", "Unlimited Prompt Vault", "Domain search and connect", "Priority support", "Early access to new features"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>{f}
                  </div>
                ))}
              </div>
              <Link href="/sign-up" className="block text-center py-3 rounded-xl text-sm font-bold" style={{ background: "#00e676", color: "#09090b" }}>Start Pro</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: "-0.03em" }}>
            Stop starting over.
          </h2>
          <p className="text-lg mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Your projects deserve to be finished.</p>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.3)" }}>Join {count.devs}+ developers who never start from scratch again.</p>
          <Link href="/sign-up" className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-bold transition-all"
            style={{ background: "#00e676", color: "#09090b", animation: "glow 3s ease infinite" }}>
            Open Launch Pad. It&apos;s Free.
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>Free tier. No credit card. Set up in 20 seconds.</p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#00e676" }}>
              <svg viewBox="0 0 24 24" fill="#09090b" className="w-3.5 h-3.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11.95A22 22 0 0112 15z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            </div>
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Launch Pad</span>
            <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.15)" }}>by Ralli AI</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#demo" className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Demo</a>
            <a href="#features" className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Features</a>
            <a href="#pricing" className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Pricing</a>
            <Link href="/sign-up" className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>App</Link>
          </div>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.1)", fontFamily: "JetBrains Mono" }}>© 2026 Ralli AI</span>
        </div>
      </footer>
    </div>
  );
}
