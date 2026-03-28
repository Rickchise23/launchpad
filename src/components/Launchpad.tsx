// @ts-nocheck
import { useState, useEffect, useCallback, useRef } from "react";

// ─── ICON COMPONENTS ───
const Icons = {
  GitHub: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  Vercel: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 1L24 22H0L12 1z"/></svg>,
  Supabase: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13.5 21.8c-.4.5-1.2.1-1.2-.6V14h8.6c.9 0 1.4 1 .8 1.7L13.5 21.8zM10.5 2.2c.4-.5 1.2-.1 1.2.6V10H3.1c-.9 0-1.4-1-.8-1.7L10.5 2.2z"/></svg>,
  Claude: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4"/></svg>,
  Agent: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="18" cy="8" r="2" fill="currentColor"/></svg>,
  Rocket: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Key: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  Activity: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Terminal: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevronLeft: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Zap: () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Globe: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Copy: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ExternalLink: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Refresh: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  AlertTriangle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Folder: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  GitBranch: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></svg>,
  GitPR: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>,
  Trash: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  DollarSign: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  TrendingUp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  AlertCircle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Brain: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2a6 6 0 016 6c0 1.66-.68 3.16-1.76 4.24L12 16.48l-4.24-4.24A6 6 0 016 8a6 6 0 016-6z"/><path d="M12 16.48V22"/><path d="M8 22h8"/><circle cx="9" cy="8" r="1" fill="currentColor"/><circle cx="15" cy="8" r="1" fill="currentColor"/></svg>,
  Database: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Send: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Link: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  Download: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Code: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
};

const serviceColors = {
  github: { bg: "rgba(110,84,200,0.15)", text: "#8b6cf6", border: "rgba(139,108,246,0.3)", glow: "0 0 20px rgba(139,108,246,0.15)" },
  vercel: { bg: "rgba(255,255,255,0.06)", text: "#ffffff", border: "rgba(255,255,255,0.2)", glow: "0 0 20px rgba(255,255,255,0.05)" },
  supabase: { bg: "rgba(62,207,142,0.12)", text: "#3ecf8e", border: "rgba(62,207,142,0.3)", glow: "0 0 20px rgba(62,207,142,0.15)" },
  claude: { bg: "rgba(217,119,80,0.12)", text: "#d97750", border: "rgba(217,119,80,0.3)", glow: "0 0 20px rgba(217,119,80,0.15)" },
};

const PulseDot = ({ color = "#00e676", size = 8 }) => (
  <span className="relative inline-flex" style={{ width: size, height: size }}>
    <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color, animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}/>
    <span className="relative inline-flex rounded-full h-full w-full" style={{ backgroundColor: color }}/>
  </span>
);

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const colors = { success: "#00e676", error: "#ff5252", info: "#40c4ff", warning: "#ffd740" };
  return (
    <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: "#1a1a1f", border: `1px solid ${colors[type]}40`, boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 15px ${colors[type]}15`, animation: "fadeSlideUp 0.3s ease" }}>
      <div className="w-2 h-2 rounded-full" style={{ background: colors[type] }}/>
      <span className="text-sm text-white">{message}</span>
    </div>
  );
};

// ─── PERSISTENT STORAGE ───
const VAULT_KEY = "launchpad-vault";
const loadVault = async () => { try { const r = await window.storage.get(VAULT_KEY); return r ? JSON.parse(r.value) : {}; } catch { return {}; } };
const saveVault = async (data) => { try { await window.storage.set(VAULT_KEY, JSON.stringify(data)); } catch(e) { console.error(e); } };

// ─── MAIN ───
export default function Launchpad() {
  const [activeView, setActiveView] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [toast, setToast] = useState(null);
  const [vault, setVault] = useState({});
  const [vaultLoaded, setVaultLoaded] = useState(false);

  // GitHub live state
  const [ghUser, setGhUser] = useState(null);
  const [ghRepos, setGhRepos] = useState([]);
  const [ghLoading, setGhLoading] = useState(false);
  const [ghError, setGhError] = useState(null);
  const [ghActiveAction, setGhActiveAction] = useState(null);
  const [createRepoForm, setCreateRepoForm] = useState({ name: "", description: "", isPrivate: true, autoInit: true });
  const [creatingRepo, setCreatingRepo] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoBranches, setRepoBranches] = useState([]);
  const [repoPRs, setRepoPRs] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [repoSearch, setRepoSearch] = useState("");
  const [deletingRepo, setDeletingRepo] = useState(null);

  // Vercel live state
  const [vcUser, setVcUser] = useState(null);
  const [vcProjects, setVcProjects] = useState([]);
  const [vcLoading, setVcLoading] = useState(false);
  const [vcError, setVcError] = useState(null);
  const [vcSelectedProject, setVcSelectedProject] = useState(null);
  const [vcDeployments, setVcDeployments] = useState([]);
  const [vcEnvVars, setVcEnvVars] = useState([]);
  const [vcLoadingDetail, setVcLoadingDetail] = useState(false);
  const [vcActiveAction, setVcActiveAction] = useState(null);
  const [vcProjectSearch, setVcProjectSearch] = useState("");
  const [vcAddEnv, setVcAddEnv] = useState({ key: "", value: "", target: ["production", "preview", "development"] });
  const [vcAddingEnv, setVcAddingEnv] = useState(false);
  const [vcDomains, setVcDomains] = useState([]);

  // Claude live state
  const [clModels] = useState([
    { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", costIn: 3, costOut: 15, speed: "Fast", badge: "balanced" },
    { id: "claude-opus-4-20250514", name: "Claude Opus 4", costIn: 15, costOut: 75, speed: "Slower", badge: "smartest" },
    { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", costIn: 0.80, costOut: 4, speed: "Fastest", badge: "cheapest" },
  ]);
  const [clSelectedModel, setClSelectedModel] = useState("claude-sonnet-4-20250514");
  const [clPromptVault, setClPromptVault] = useState([]);
  const [clActiveTab, setClActiveTab] = useState("chat");
  const [clChatInput, setClChatInput] = useState("");
  const [clChatHistory, setClChatHistory] = useState([]);
  const [clChatLoading, setClChatLoading] = useState(false);
  const [clNewPrompt, setClNewPrompt] = useState({ name: "", content: "" });
  const [clTokensUsed, setClTokensUsed] = useState({ input: 0, output: 0 });
  const [clActiveSystemPrompt, setClActiveSystemPrompt] = useState("");

  // Supabase live state
  const [sbTables, setSbTables] = useState([]);
  const [sbLoading, setSbLoading] = useState(false);
  const [sbError, setSbError] = useState(null);
  const [sbConnected, setSbConnected] = useState(false);
  const [sbActiveTab, setSbActiveTab] = useState("tables");
  const [sbSelectedTable, setSbSelectedTable] = useState(null);
  const [sbTableData, setSbTableData] = useState([]);
  const [sbTableCount, setSbTableCount] = useState(0);
  const [sbLoadingData, setSbLoadingData] = useState(false);
  const [sbSqlQuery, setSbSqlQuery] = useState("SELECT * FROM information_schema.tables WHERE table_schema = 'public';");
  const [sbSqlResult, setSbSqlResult] = useState(null);
  const [sbSqlRunning, setSbSqlRunning] = useState(false);
  const [sbSqlError, setSbSqlError] = useState(null);
  const [sbRlsStatus, setSbRlsStatus] = useState({});
  const [sbStorageBuckets, setSbStorageBuckets] = useState([]);

  // Agent Memory state
  const [agentMemories, setAgentMemories] = useState([]);
  const [agentSessions, setAgentSessions] = useState([]);
  const [agentActiveTab, setAgentActiveTab] = useState("launch");
  const [agentTaskInput, setAgentTaskInput] = useState("");
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentLog, setAgentLog] = useState([]);
  const [agentSelectedProject, setAgentSelectedProject] = useState("Launchpad");
  const [agentPermissions, setAgentPermissions] = useState({ pushCode: true, createPR: true, deploy: false, writeDB: false, runMigrations: false });

  // Setup form state
  const [setupTokens, setSetupTokens] = useState({ github: "", vercel: "", supabase_url: "", supabase_anon: "", supabase_service: "", anthropic: "" });
  const [showToken, setShowToken] = useState({});

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { loadVault().then(v => { setVault(v); setVaultLoaded(true); setSetupTokens(prev => ({ ...prev, ...v })); }); }, []);
  useEffect(() => { if (vault.github && vaultLoaded) fetchGitHubUser(); }, [vault.github, vaultLoaded]);
  useEffect(() => { if (vault.vercel && vaultLoaded) fetchVercelUser(); }, [vault.vercel, vaultLoaded]);
  useEffect(() => { if (vault.supabase_url && vault.supabase_anon && vaultLoaded) fetchSupabaseTables(); }, [vault.supabase_url, vault.supabase_anon, vaultLoaded]);

  // Load prompt vault from storage
  useEffect(() => {
    (async () => {
      try { const r = (() => { const r = localStorage.getItem("launchpad-prompts"); return r ? { value: r } : null; })(); if (r) setClPromptVault(JSON.parse(r.value)); } catch {}
      try { const r = (() => { const r = localStorage.getItem("launchpad-agent-memories"); return r ? { value: r } : null; })(); if (r) setAgentMemories(JSON.parse(r.value)); } catch {}
      try { const r = (() => { const r = localStorage.getItem("launchpad-agent-sessions"); return r ? { value: r } : null; })(); if (r) setAgentSessions(JSON.parse(r.value)); } catch {}
    })();
  }, []);

  const showToast = (message, type = "success") => setToast({ message, type, id: Date.now() });

  // ─── GITHUB API ───
  const ghFetch = async (endpoint, options = {}) => {
    const token = vault.github;
    if (!token) throw new Error("No GitHub token configured");
    const res = await fetch(`https://api.github.com${endpoint}`, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", ...options.headers },
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || `GitHub API error: ${res.status}`); }
    if (res.status === 204) return null;
    return res.json();
  };

  const fetchGitHubUser = async () => {
    setGhLoading(true); setGhError(null);
    try {
      const [user, repos] = await Promise.all([ghFetch("/user"), ghFetch("/user/repos?sort=updated&per_page=50")]);
      setGhUser(user); setGhRepos(repos);
    } catch (e) { setGhError(e.message); setGhUser(null); setGhRepos([]); }
    setGhLoading(false);
  };

  const fetchRepoDetail = async (repo) => {
    setSelectedRepo(repo); setLoadingDetail(true);
    try {
      const [branches, prs] = await Promise.all([
        ghFetch(`/repos/${repo.full_name}/branches?per_page=30`),
        ghFetch(`/repos/${repo.full_name}/pulls?state=open&per_page=20`),
      ]);
      setRepoBranches(branches || []); setRepoPRs(prs || []);
    } catch(e) { showToast(e.message, "error"); }
    setLoadingDetail(false);
  };

  const createRepo = async () => {
    if (!createRepoForm.name.trim()) return;
    setCreatingRepo(true);
    try {
      const repo = await ghFetch("/user/repos", {
        method: "POST",
        body: JSON.stringify({ name: createRepoForm.name, description: createRepoForm.description, private: createRepoForm.isPrivate, auto_init: createRepoForm.autoInit }),
      });
      setGhRepos(prev => [repo, ...prev]);
      setCreateRepoForm({ name: "", description: "", isPrivate: true, autoInit: true });
      setGhActiveAction(null);
      showToast(`Repo "${repo.name}" created!`);
    } catch(e) { showToast(e.message, "error"); }
    setCreatingRepo(false);
  };

  const deleteRepo = async (repo) => {
    setDeletingRepo(repo.id);
    try {
      await ghFetch(`/repos/${repo.full_name}`, { method: "DELETE" });
      setGhRepos(prev => prev.filter(r => r.id !== repo.id));
      setSelectedRepo(null);
      showToast(`Repo "${repo.name}" deleted`);
    } catch(e) { showToast(e.message, "error"); }
    setDeletingRepo(null);
  };

  // ─── VERCEL API ───
  const vcFetch = async (endpoint, options = {}) => {
    const token = vault.vercel;
    if (!token) throw new Error("No Vercel token configured");
    const res = await fetch(`https://api.vercel.com${endpoint}`, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...options.headers },
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `Vercel API error: ${res.status}`); }
    if (res.status === 204) return null;
    return res.json();
  };

  const fetchVercelUser = async () => {
    setVcLoading(true); setVcError(null);
    try {
      const [user, projRes] = await Promise.all([vcFetch("/v2/user"), vcFetch("/v9/projects?limit=50")]);
      setVcUser(user.user); setVcProjects(projRes.projects || []);
    } catch(e) { setVcError(e.message); setVcUser(null); setVcProjects([]); }
    setVcLoading(false);
  };

  const fetchVercelProjectDetail = async (project) => {
    setVcSelectedProject(project); setVcLoadingDetail(true);
    try {
      const [deploys, envRes] = await Promise.all([
        vcFetch(`/v6/deployments?projectId=${project.id}&limit=15`),
        vcFetch(`/v9/projects/${project.id}/env?decrypt=true`).catch(() => ({ envs: [] })),
      ]);
      setVcDeployments(deploys.deployments || []);
      setVcEnvVars(envRes.envs || []);
      try {
        const domRes = await vcFetch(`/v9/projects/${project.id}/domains`);
        setVcDomains(domRes.domains || []);
      } catch { setVcDomains([]); }
    } catch(e) { showToast(e.message, "error"); }
    setVcLoadingDetail(false);
  };

  const addVercelEnvVar = async () => {
    if (!vcAddEnv.key.trim() || !vcAddEnv.value.trim() || !vcSelectedProject) return;
    setVcAddingEnv(true);
    try {
      const res = await vcFetch(`/v10/projects/${vcSelectedProject.id}/env`, {
        method: "POST",
        body: JSON.stringify({ type: "encrypted", key: vcAddEnv.key, value: vcAddEnv.value, target: vcAddEnv.target }),
      });
      setVcEnvVars(prev => [res, ...prev]);
      setVcAddEnv({ key: "", value: "", target: ["production", "preview", "development"] });
      showToast(`Env var "${vcAddEnv.key}" added`);
    } catch(e) { showToast(e.message, "error"); }
    setVcAddingEnv(false);
  };

  const deleteVercelEnvVar = async (envVar) => {
    if (!vcSelectedProject) return;
    try {
      await vcFetch(`/v9/projects/${vcSelectedProject.id}/env/${envVar.id}`, { method: "DELETE" });
      setVcEnvVars(prev => prev.filter(e => e.id !== envVar.id));
      showToast(`Env var "${envVar.key}" removed`);
    } catch(e) { showToast(e.message, "error"); }
  };

  const triggerVercelDeploy = async (project) => {
    try {
      // Vercel redeploy: create deployment from latest
      const deploys = await vcFetch(`/v6/deployments?projectId=${project.id}&limit=1`);
      if (deploys.deployments?.length > 0) {
        const latest = deploys.deployments[0];
        await vcFetch(`/v13/deployments`, {
          method: "POST",
          body: JSON.stringify({ name: project.name, target: "production", gitSource: latest.gitSource || undefined }),
        });
        showToast(`Deploy triggered for ${project.name}!`);
        // Refresh deployments
        setTimeout(() => fetchVercelProjectDetail(project), 2000);
      } else {
        showToast("No previous deployments found to redeploy", "warning");
      }
    } catch(e) { showToast(e.message, "error"); }
  };

  // ─── CLAUDE API ───
  const sendClaudeMessage = async () => {
    if (!clChatInput.trim() || !vault.anthropic) return;
    const userMsg = { role: "user", content: clChatInput };
    setClChatHistory(prev => [...prev, userMsg]);
    setClChatInput("");
    setClChatLoading(true);
    try {
      const messages = [...clChatHistory, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": vault.anthropic, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: clSelectedModel,
          max_tokens: 2048,
          system: clActiveSystemPrompt || undefined,
          messages,
        }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `API error: ${res.status}`); }
      const data = await res.json();
      const assistantText = data.content?.map(b => b.text || "").join("") || "";
      setClChatHistory(prev => [...prev, { role: "assistant", content: assistantText }]);
      setClTokensUsed(prev => ({
        input: prev.input + (data.usage?.input_tokens || 0),
        output: prev.output + (data.usage?.output_tokens || 0),
      }));
    } catch(e) { showToast(e.message, "error"); setClChatHistory(prev => [...prev, { role: "assistant", content: `Error: ${e.message}` }]); }
    setClChatLoading(false);
  };

  const savePromptToVault = async () => {
    if (!clNewPrompt.name.trim() || !clNewPrompt.content.trim()) return;
    const newPrompt = { id: Date.now(), name: clNewPrompt.name, content: clNewPrompt.content, created: new Date().toISOString() };
    const updated = [newPrompt, ...clPromptVault];
    setClPromptVault(updated);
    setClNewPrompt({ name: "", content: "" });
    try { localStorage.setItem("launchpad-prompts", JSON.stringify(updated)); } catch {}
    showToast(`Prompt "${newPrompt.name}" saved`);
  };

  const deletePrompt = async (id) => {
    const updated = clPromptVault.filter(p => p.id !== id);
    setClPromptVault(updated);
    try { localStorage.setItem("launchpad-prompts", JSON.stringify(updated)); } catch {}
    showToast("Prompt deleted");
  };

  const estimateCost = () => {
    const model = clModels.find(m => m.id === clSelectedModel);
    if (!model) return "—";
    const cost = (clTokensUsed.input / 1_000_000 * model.costIn) + (clTokensUsed.output / 1_000_000 * model.costOut);
    return `$${cost.toFixed(4)}`;
  };

  // ─── SUPABASE API ───
  const sbFetch = async (endpoint, options = {}) => {
    const url = vault.supabase_url;
    const key = options.useServiceKey ? vault.supabase_service : vault.supabase_anon;
    if (!url || !key) throw new Error("Supabase URL or key missing");
    const res = await fetch(`${url}${endpoint}`, {
      ...options,
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...options.headers },
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || err.error || `Supabase error: ${res.status}`); }
    if (res.status === 204) return null;
    return res.json();
  };

  const fetchSupabaseTables = async () => {
    setSbLoading(true); setSbError(null);
    try {
      // Use PostgREST introspection to get tables
      const res = await fetch(`${vault.supabase_url}/rest/v1/`, {
        headers: { apikey: vault.supabase_anon, Authorization: `Bearer ${vault.supabase_anon}` },
      });
      if (!res.ok) throw new Error(`Connection failed: ${res.status}`);
      // The root endpoint returns OpenAPI spec with table definitions
      const spec = await res.json();
      const tables = Object.keys(spec.definitions || spec.paths || {})
        .filter(t => !t.startsWith("rpc/") && t !== "/")
        .map(t => t.replace(/^\//, ""));
      setSbTables(tables);
      setSbConnected(true);

      // Try fetching storage buckets
      try {
        const buckets = await fetch(`${vault.supabase_url}/storage/v1/bucket`, {
          headers: { apikey: vault.supabase_service || vault.supabase_anon, Authorization: `Bearer ${vault.supabase_service || vault.supabase_anon}` },
        });
        if (buckets.ok) setSbStorageBuckets(await buckets.json());
      } catch {}
    } catch(e) { setSbError(e.message); setSbConnected(false); }
    setSbLoading(false);
  };

  const fetchTableData = async (table) => {
    setSbSelectedTable(table); setSbLoadingData(true);
    try {
      const key = vault.supabase_service || vault.supabase_anon;
      const res = await fetch(`${vault.supabase_url}/rest/v1/${table}?select=*&limit=50`, {
        headers: { apikey: key, Authorization: `Bearer ${key}`, Range: "0-49", Prefer: "count=exact" },
      });
      if (!res.ok) throw new Error(`Failed to fetch ${table}`);
      const contentRange = res.headers.get("content-range");
      const count = contentRange ? parseInt(contentRange.split("/")[1]) || 0 : 0;
      setSbTableData(await res.json());
      setSbTableCount(count);
    } catch(e) { showToast(e.message, "error"); setSbTableData([]); }
    setSbLoadingData(false);
  };

  const runSqlQuery = async () => {
    if (!sbSqlQuery.trim()) return;
    setSbSqlRunning(true); setSbSqlError(null); setSbSqlResult(null);
    try {
      const key = vault.supabase_service || vault.supabase_anon;
      const res = await fetch(`${vault.supabase_url}/rest/v1/rpc/`, {
        method: "POST",
        headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query: sbSqlQuery }),
      });
      // rpc endpoint may not exist, try pg-meta or raw
      if (!res.ok) {
        // Fallback: try using the SQL via pg_catalog approach
        const pgRes = await fetch(`${vault.supabase_url}/rest/v1/rpc/exec_sql`, {
          method: "POST",
          headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ sql: sbSqlQuery }),
        });
        if (!pgRes.ok) {
          // If no RPC exists, explain to user
          setSbSqlError("SQL console requires a custom 'exec_sql' function in your Supabase project. Use the Supabase dashboard SQL editor for raw queries, or create a Postgres function: CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS json AS $$ BEGIN RETURN (SELECT json_agg(row_to_json(t)) FROM (" + "SELECT 1) t); END; $$ LANGUAGE plpgsql;");
          setSbSqlRunning(false);
          return;
        }
        setSbSqlResult(await pgRes.json());
      } else {
        setSbSqlResult(await res.json());
      }
    } catch(e) { setSbSqlError(e.message); }
    setSbSqlRunning(false);
  };

  // ─── AGENT MEMORY ───
  const saveMemory = async (memory) => {
    const updated = [memory, ...agentMemories];
    setAgentMemories(updated);
    try { localStorage.setItem("launchpad-agent-memories", JSON.stringify(updated)); } catch {}
  };

  const deleteMemory = async (id) => {
    const updated = agentMemories.filter(m => m.id !== id);
    setAgentMemories(updated);
    try { localStorage.setItem("launchpad-agent-memories", JSON.stringify(updated)); } catch {}
    showToast("Memory deleted");
  };

  const saveSession = async (session) => {
    const updated = [session, ...agentSessions].slice(0, 50);
    setAgentSessions(updated);
    try { localStorage.setItem("launchpad-agent-sessions", JSON.stringify(updated)); } catch {}
  };

  const launchAgent = async () => {
    if (!agentTaskInput.trim() || !vault.anthropic) return;
    setAgentRunning(true);
    setAgentLog([{ type: "system", msg: "Initializing agent session...", ts: Date.now() }]);

    const addLog = (type, msg) => setAgentLog(prev => [...prev, { type, msg, ts: Date.now() }]);

    // Build context from memories
    const projectMemories = agentMemories.filter(m => m.project === agentSelectedProject);
    const memoryContext = projectMemories.length > 0
      ? `\n\nProject memories from previous sessions:\n${projectMemories.map(m => `- [${m.type}] ${m.content}`).join("\n")}`
      : "";

    const permList = Object.entries(agentPermissions).filter(([,v]) => v).map(([k]) => k).join(", ");
    addLog("system", `Project: ${agentSelectedProject} | Permissions: ${permList}`);
    if (projectMemories.length > 0) addLog("system", `Loaded ${projectMemories.length} memories from previous sessions`);
    addLog("task", `Task: "${agentTaskInput}"`);

    try {
      const systemPrompt = `You are an AI agent operating within Launchpad, a developer cockpit tool. You are working on the project "${agentSelectedProject}".
Granted permissions: ${permList}.
Your job: Complete the user's task, explain what you'd do step by step, and generate a concise memory entry summarizing what you learned about this project.
${memoryContext}
At the end of your response, include a line starting with "MEMORY:" followed by a one-sentence summary of what you learned or accomplished that would be useful for future sessions.`;

      addLog("agent", "Sending task to Claude...");

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": vault.anthropic, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: clSelectedModel, max_tokens: 2048, system: systemPrompt, messages: [{ role: "user", content: agentTaskInput }] }),
      });

      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `API error: ${res.status}`); }
      const data = await res.json();
      const responseText = data.content?.map(b => b.text || "").join("") || "";

      // Update token tracking
      setClTokensUsed(prev => ({
        input: prev.input + (data.usage?.input_tokens || 0),
        output: prev.output + (data.usage?.output_tokens || 0),
      }));

      // Parse response into log entries
      const lines = responseText.split("\n").filter(l => l.trim());
      let memoryLine = null;
      for (const line of lines) {
        if (line.startsWith("MEMORY:")) {
          memoryLine = line.replace("MEMORY:", "").trim();
        } else {
          addLog("agent", line);
        }
      }

      // Auto-save memory if Claude generated one
      if (memoryLine) {
        const memory = { id: Date.now(), project: agentSelectedProject, content: memoryLine, type: "learned", created: new Date().toISOString(), task: agentTaskInput.substring(0, 100) };
        await saveMemory(memory);
        addLog("memory", `Memory saved: ${memoryLine}`);
      }

      // Save session record
      const session = {
        id: Date.now(), project: agentSelectedProject, task: agentTaskInput, model: clSelectedModel,
        permissions: permList, tokensUsed: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
        memorySaved: !!memoryLine, created: new Date().toISOString(),
      };
      await saveSession(session);

      addLog("done", "Session complete.");
    } catch(e) {
      addLog("error", `Error: ${e.message}`);
    }
    setAgentRunning(false);
  };

  const handleSaveVault = async () => {
    const cleaned = {};
    Object.entries(setupTokens).forEach(([k, v]) => { if (v && v.trim()) cleaned[k] = v.trim(); });
    setVault(cleaned);
    await saveVault(cleaned);
    showToast("Vault saved securely");
    setShowSetup(false);
  };

  const removeKey = async (key) => {
    const updated = { ...vault };
    delete updated[key];
    setVault(updated);
    setSetupTokens(prev => ({ ...prev, [key]: "" }));
    await saveVault(updated);
    if (key === "github") { setGhUser(null); setGhRepos([]); setGhError(null); }
    if (key === "vercel") { setVcUser(null); setVcProjects([]); setVcError(null); setVcSelectedProject(null); }
    if (key === "anthropic") { setClChatHistory([]); setClTokensUsed({ input: 0, output: 0 }); }
    if (key === "supabase_url" || key === "supabase_anon" || key === "supabase_service") { setSbTables([]); setSbConnected(false); setSbError(null); setSbSelectedTable(null); }
    showToast(`${key} token removed`);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Icons.Activity /> },
    { id: "github", label: "GitHub", icon: <Icons.GitHub /> },
    { id: "vercel", label: "Vercel", icon: <Icons.Vercel /> },
    { id: "supabase", label: "Supabase", icon: <Icons.Supabase /> },
    { id: "claude", label: "Claude", icon: <Icons.Claude /> },
    { id: "agent", label: "Agent Bay", icon: <Icons.Agent /> },
    { id: "mcp", label: "MCP Config", icon: <Icons.Link /> },
    { id: "domains", label: "Domains", icon: <Icons.Globe /> },
    { id: "vault", label: "Vault", icon: <Icons.Shield /> },
  ];

  const isConnected = (svc) => {
    if (svc === "supabase") return !!(vault.supabase_url && vault.supabase_anon);
    return !!vault[svc];
  };
  const filteredRepos = ghRepos.filter(r => r.name.toLowerCase().includes(repoSearch.toLowerCase()) || (r.description || "").toLowerCase().includes(repoSearch.toLowerCase()));

  // ─── SETUP DRAWER ───
  const SetupDrawer = () => (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowSetup(false)}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}/>
      <div className="relative w-full max-w-lg h-full overflow-y-auto" style={{ background: "#0e0e11", borderLeft: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-white">API Keys & Tokens</h2><p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Stored via persistent storage. Your keys stay with you.</p></div>
            <button onClick={() => setShowSetup(false)} className="p-2 rounded-lg" style={{ color: "rgba(255,255,255,0.4)" }}><Icons.X /></button>
          </div>
          {[
            { key: "github", label: "GitHub PAT", placeholder: "ghp_xxxxxxxxxxxx", helpUrl: "https://github.com/settings/tokens?type=beta", helpText: "Settings → Developer settings → Fine-grained tokens. Grant Contents, Pull Requests, Metadata." },
            { key: "vercel", label: "Vercel Token", placeholder: "prj_xxxxxxxxxxxx", helpUrl: "https://vercel.com/account/tokens", helpText: "Vercel → Settings → Tokens → Create." },
            { key: "supabase_url", label: "Supabase URL", placeholder: "https://xxxxx.supabase.co", helpText: "Project Settings → API page." },
            { key: "supabase_anon", label: "Supabase Anon Key", placeholder: "eyJhbGci...", helpText: "Settings → API → anon public." },
            { key: "supabase_service", label: "Supabase Service Key", placeholder: "eyJhbGci...", helpText: "Settings → API → service_role. Keep secret!" },
            { key: "anthropic", label: "Anthropic Key", placeholder: "sk-ant-xxxxxxxxxxxx", helpUrl: "https://console.anthropic.com/settings/keys", helpText: "console.anthropic.com → API Keys → Create." },
          ].map(field => (
            <div key={field.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white">{field.label}</label>
                <div className="flex items-center gap-2">
                  {vault[field.key] && <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00e676" }}/><span className="text-[10px]" style={{ color: "#00e676" }}>active</span></div>}
                  {field.helpUrl && <a href={field.helpUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded" style={{ color: "#40c4ff", background: "rgba(64,196,255,0.1)" }}>Get token <Icons.ExternalLink /></a>}
                </div>
              </div>
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>{field.helpText}</p>
              <div className="flex gap-2">
                <input type={showToken[field.key] ? "text" : "password"} value={setupTokens[field.key] || ""} onChange={e => setSetupTokens(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder}
                  className="flex-1 px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onFocus={e => e.target.style.borderColor = "rgba(139,108,246,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
                <button onClick={() => setShowToken(p => ({ ...p, [field.key]: !p[field.key] }))} className="p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}>
                  {showToken[field.key] ? <Icons.EyeOff /> : <Icons.Eye />}
                </button>
                {vault[field.key] && <button onClick={() => removeKey(field.key)} className="p-2.5 rounded-xl" style={{ background: "rgba(255,82,82,0.1)", color: "#ff5252" }}><Icons.Trash /></button>}
              </div>
            </div>
          ))}
          <button onClick={handleSaveVault} className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #00e676, #00c853)", color: "#0a0a0a" }}>
            <Icons.Shield /> Save to Vault
          </button>
        </div>
      </div>
    </div>
  );

  // ─── GITHUB VIEW ───
  const GitHubView = () => {
    const c = serviceColors.github;
    if (!vault.github) return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.5s ease" }}>
        <div className="p-5 rounded-3xl mb-6" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}><Icons.GitHub /></div>
        <h2 className="text-xl font-bold text-white mb-2">Connect GitHub</h2>
        <p className="text-sm mb-6 max-w-md text-center" style={{ color: "rgba(255,255,255,0.4)" }}>Add a GitHub PAT to manage repos, branches, PRs, and agent authorization — zero terminal required.</p>
        <button onClick={() => setShowSetup(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: "linear-gradient(135deg, #8b6cf6, #7c3aed)", color: "white", boxShadow: "0 0 25px rgba(139,108,246,0.3)" }}>
          <Icons.Key /> Add GitHub Token
        </button>
        <p className="text-[11px] mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>Need one? <a href="https://github.com/settings/tokens?type=beta" target="_blank" rel="noopener noreferrer" style={{ color: "#8b6cf6", textDecoration: "underline" }}>Generate on GitHub</a> — 60 seconds.</p>
      </div>
    );

    if (ghLoading && !ghUser) return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#8b6cf6", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}/>
        <span className="ml-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Connecting to GitHub...</span>
      </div>
    );

    if (ghError) return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.4s ease" }}>
        <div className="p-4 rounded-3xl mb-4" style={{ background: "rgba(255,82,82,0.1)", color: "#ff5252" }}><Icons.AlertTriangle /></div>
        <h3 className="text-lg font-bold text-white mb-2">Connection Failed</h3>
        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{ghError}</p>
        <div className="flex gap-3">
          <button onClick={fetchGitHubUser} className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2" style={{ background: "rgba(139,108,246,0.15)", color: "#8b6cf6" }}><Icons.Refresh /> Retry</button>
          <button onClick={() => setShowSetup(true)} className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>Update Token</button>
        </div>
      </div>
    );

    return (
      <div className="space-y-5">
        {/* Connected Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}><Icons.GitHub /></div>
            <div>
              <h2 className="text-xl font-bold text-white">GitHub</h2>
              <div className="flex items-center gap-3 mt-1">
                <PulseDot color="#00e676" size={6} />
                <span className="text-xs" style={{ color: "#00e676" }}>Connected as <strong style={{ color: "#8b6cf6" }}>{ghUser?.login}</strong></span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>{ghUser?.public_repos} public · {ghRepos.filter(r=>r.private).length} private</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchGitHubUser} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }} title="Refresh"><Icons.Refresh /></button>
            <button onClick={() => setShowSetup(true)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.Settings /></button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { id: "create-repo", label: "Create Repo", icon: <Icons.Plus />, color: "#00e676" },
            { id: "repos", label: "All Repos", icon: <Icons.Folder />, color: "#8b6cf6" },
            { id: "prs", label: "Open PRs", icon: <Icons.GitPR />, color: "#40c4ff" },
            { id: "branches", label: "Branches", icon: <Icons.GitBranch />, color: "#ffd740" },
          ].map(a => (
            <button key={a.id} onClick={() => { setGhActiveAction(ghActiveAction === a.id ? null : a.id); setSelectedRepo(null); }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200"
              style={{ background: ghActiveAction === a.id ? `${a.color}12` : "rgba(255,255,255,0.02)", border: `1px solid ${ghActiveAction === a.id ? `${a.color}30` : "rgba(255,255,255,0.06)"}` }}
              onMouseEnter={e => { if (ghActiveAction !== a.id) { e.currentTarget.style.background = `${a.color}08`; }}}
              onMouseLeave={e => { if (ghActiveAction !== a.id) { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}}>
              <div className="p-2 rounded-xl" style={{ background: `${a.color}15`, color: a.color }}>{a.icon}</div>
              <span className="text-xs font-medium text-white">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Create Repo */}
        {ghActiveAction === "create-repo" && (
          <div className="rounded-2xl p-6 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", animation: "fadeSlideUp 0.3s ease" }}>
            <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>New Repository</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Name *</label>
                <input value={createRepoForm.name} onChange={e => setCreateRepoForm(p => ({ ...p, name: e.target.value }))} placeholder="my-awesome-project"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}/></div>
              <div><label className="text-xs block mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Description</label>
                <input value={createRepoForm.description} onChange={e => setCreateRepoForm(p => ({ ...p, description: e.target.value }))} placeholder="Optional description"
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}/></div>
            </div>
            <div className="flex gap-6">
              {[{ k: "isPrivate", label: "Private" }, { k: "autoInit", label: "README" }].map(o => (
                <label key={o.k} className="flex items-center gap-2 cursor-pointer" onClick={() => setCreateRepoForm(p => ({ ...p, [o.k]: !p[o.k] }))}>
                  <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: createRepoForm[o.k] ? "#8b6cf6" : "rgba(255,255,255,0.06)", border: createRepoForm[o.k] ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
                    {createRepoForm[o.k] && <Icons.Check />}</div>
                  <span className="text-sm text-white">{o.label}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={createRepo} disabled={creatingRepo || !createRepoForm.name.trim()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: !createRepoForm.name.trim() ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #00e676, #00c853)", color: !createRepoForm.name.trim() ? "rgba(255,255,255,0.2)" : "#0a0a0a", cursor: !createRepoForm.name.trim() ? "not-allowed" : "pointer" }}>
                {creatingRepo ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }}/> Creating...</> : <><Icons.Plus /> Create</>}
              </button>
              <button onClick={() => setGhActiveAction(null)} className="px-4 py-2.5 rounded-xl text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Repo Detail View */}
        {selectedRepo ? (
          <div className="space-y-4" style={{ animation: "fadeSlideUp 0.3s ease" }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedRepo(null)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.ChevronLeft /></button>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{selectedRepo.full_name}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                  {selectedRepo.language && <span className="text-xs" style={{ color: "#8b6cf6" }}>{selectedRepo.language}</span>}
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{selectedRepo.default_branch} · Updated {new Date(selectedRepo.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
              <a href={selectedRepo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs" style={{ background: "rgba(139,108,246,0.1)", color: "#8b6cf6" }}>
                GitHub <Icons.ExternalLink /></a>
              <button onClick={() => { if (confirm(`Delete ${selectedRepo.name}? This cannot be undone.`)) deleteRepo(selectedRepo); }}
                className="p-2 rounded-xl" style={{ background: "rgba(255,82,82,0.1)", color: "#ff5252" }}><Icons.Trash /></button>
            </div>
            {loadingDetail ? (
              <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 rounded-full" style={{ borderColor: "#8b6cf6", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}/></div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.45)" }}><Icons.GitBranch /> Branches ({repoBranches.length})</h4>
                  <div className="space-y-1 max-h-72 overflow-y-auto">
                    {repoBranches.map(b => (
                      <div key={b.name} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: b.name === selectedRepo.default_branch ? "rgba(0,230,118,0.05)" : "transparent" }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: b.name === selectedRepo.default_branch ? "#00e676" : "rgba(255,255,255,0.15)" }}/>
                        <span className="text-xs text-white font-mono">{b.name}</span>
                        {b.name === selectedRepo.default_branch && <span className="text-[10px] px-1.5 py-0.5 rounded ml-auto" style={{ background: "rgba(0,230,118,0.1)", color: "#00e676" }}>default</span>}
                        {b.protected && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,215,64,0.1)", color: "#ffd740" }}>protected</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.45)" }}><Icons.GitPR /> Open PRs ({repoPRs.length})</h4>
                  <div className="space-y-1 max-h-72 overflow-y-auto">
                    {repoPRs.length === 0 ? <div className="text-xs py-8 text-center" style={{ color: "rgba(255,255,255,0.15)" }}>No open PRs</div> :
                      repoPRs.map(pr => (
                        <a key={pr.id} href={pr.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-lg transition-all"
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(64,196,255,0.05)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#40c4ff" }}/>
                          <div className="flex-1 min-w-0"><div className="text-xs text-white truncate">{pr.title}</div><div className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>#{pr.number} by {pr.user?.login}</div></div>
                          <Icons.ExternalLink />
                        </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Repo List */
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input value={repoSearch} onChange={e => setRepoSearch(e.target.value)} placeholder="Search repos..." className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}/>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(139,108,246,0.1)", color: "#8b6cf6" }}>{filteredRepos.length} repos</span>
            </div>
            <div className="space-y-1">
              {filteredRepos.slice(0, 20).map((repo, i) => (
                <button key={repo.id} onClick={() => fetchRepoDetail(repo)} className="w-full flex items-center gap-4 p-3.5 rounded-xl text-left transition-all duration-200 group"
                  style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", animation: mounted ? `fadeSlideUp 0.3s ease ${i * 30}ms forwards` : "none" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,108,246,0.05)"; e.currentTarget.style.borderColor = "rgba(139,108,246,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: repo.language ? "#8b6cf6" : "rgba(255,255,255,0.15)" }}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{repo.name}</span>
                      {repo.private && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,215,64,0.1)", color: "#ffd740" }}>private</span>}
                      {repo.fork && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(64,196,255,0.1)", color: "#40c4ff" }}>fork</span>}
                    </div>
                    {repo.description && <div className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.25)" }}>{repo.description}</div>}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {repo.language && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: "rgba(139,108,246,0.1)", color: "#8b6cf6" }}>{repo.language}</span>}
                    {repo.stargazers_count > 0 && <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}><Icons.Star />{repo.stargazers_count}</span>}
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.15)" }}>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#8b6cf6" }}><Icons.ChevronRight /></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── VERCEL VIEW ───
  const VercelView = () => {
    const c = serviceColors.vercel;
    const filteredProjects = vcProjects.filter(p => p.name.toLowerCase().includes(vcProjectSearch.toLowerCase()));

    if (!vault.vercel) return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.5s ease" }}>
        <div className="p-5 rounded-3xl mb-6" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}><Icons.Vercel /></div>
        <h2 className="text-xl font-bold text-white mb-2">Connect Vercel</h2>
        <p className="text-sm mb-6 max-w-md text-center" style={{ color: "rgba(255,255,255,0.4)" }}>Add your Vercel token to manage projects, env vars, deployments, and domains — all from Launchpad.</p>
        <button onClick={() => setShowSetup(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: "linear-gradient(135deg, #fff, #ccc)", color: "#0a0a0a", boxShadow: "0 0 25px rgba(255,255,255,0.15)" }}>
          <Icons.Key /> Add Vercel Token
        </button>
        <p className="text-[11px] mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>Need one? <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>Generate on Vercel</a></p>
      </div>
    );

    if (vcLoading && !vcUser) return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#fff", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}/>
        <span className="ml-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Connecting to Vercel...</span>
      </div>
    );

    if (vcError) return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.4s ease" }}>
        <div className="p-4 rounded-3xl mb-4" style={{ background: "rgba(255,82,82,0.1)", color: "#ff5252" }}><Icons.AlertTriangle /></div>
        <h3 className="text-lg font-bold text-white mb-2">Connection Failed</h3>
        <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{vcError}</p>
        <div className="flex gap-3">
          <button onClick={fetchVercelUser} className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2" style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}><Icons.Refresh /> Retry</button>
          <button onClick={() => setShowSetup(true)} className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>Update Token</button>
        </div>
      </div>
    );

    const deployStatusColor = (state) => {
      const map = { READY: "#00e676", BUILDING: "#ffd740", ERROR: "#ff5252", QUEUED: "#40c4ff", CANCELED: "rgba(255,255,255,0.3)", INITIALIZING: "#40c4ff" };
      return map[state] || "rgba(255,255,255,0.3)";
    };

    const deployStatusLabel = (state) => {
      const map = { READY: "Live", BUILDING: "Building", ERROR: "Failed", QUEUED: "Queued", CANCELED: "Canceled", INITIALIZING: "Init" };
      return map[state] || state;
    };

    const timeAgo = (ts) => {
      if (!ts) return "";
      const diff = Date.now() - ts;
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return "just now";
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}><Icons.Vercel /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Vercel</h2>
              <div className="flex items-center gap-3 mt-1">
                <PulseDot color="#00e676" size={6} />
                <span className="text-xs" style={{ color: "#00e676" }}>Connected as <strong className="text-white">{vcUser?.username || vcUser?.name}</strong></span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>{vcProjects.length} projects</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchVercelUser} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.Refresh /></button>
            <button onClick={() => setShowSetup(true)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.Settings /></button>
          </div>
        </div>

        {/* Project Detail View */}
        {vcSelectedProject ? (
          <div className="space-y-4" style={{ animation: "fadeSlideUp 0.3s ease" }}>
            <div className="flex items-center gap-3">
              <button onClick={() => { setVcSelectedProject(null); setVcActiveAction(null); }} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.ChevronLeft /></button>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{vcSelectedProject.name}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                  {vcSelectedProject.framework && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>{vcSelectedProject.framework}</span>}
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Updated {new Date(vcSelectedProject.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => triggerVercelDeploy(vcSelectedProject)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "linear-gradient(135deg, #00e676, #00c853)", color: "#0a0a0a" }}>
                <Icons.Rocket /> Deploy Now
              </button>
              {vcSelectedProject.alias?.[0] && (
                <a href={`https://${vcSelectedProject.alias[0]}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "#fff" }}>
                  Visit <Icons.ExternalLink />
                </a>
              )}
            </div>

            {/* Action tabs */}
            <div className="flex gap-2">
              {[
                { id: "deploys", label: "Deployments", count: vcDeployments.length },
                { id: "env", label: "Env Vars", count: vcEnvVars.length },
                { id: "domains", label: "Domains", count: vcDomains.length },
              ].map(tab => (
                <button key={tab.id} onClick={() => setVcActiveAction(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all"
                  style={{ background: vcActiveAction === tab.id ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${vcActiveAction === tab.id ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`, color: vcActiveAction === tab.id ? "#fff" : "rgba(255,255,255,0.45)" }}>
                  {tab.label} <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)" }}>{tab.count}</span>
                </button>
              ))}
            </div>

            {vcLoadingDetail ? (
              <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 rounded-full" style={{ borderColor: "#fff", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}/></div>
            ) : (
              <>
                {/* Deployments */}
                {(vcActiveAction === "deploys" || !vcActiveAction) && (
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="grid grid-cols-12 gap-3 p-3 text-[10px] font-semibold uppercase tracking-widest" style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.3)" }}>
                      <div className="col-span-1">Status</div><div className="col-span-4">URL</div><div className="col-span-2">Branch</div><div className="col-span-2">State</div><div className="col-span-3">Created</div>
                    </div>
                    {vcDeployments.slice(0, 12).map((d, i) => (
                      <div key={d.uid} className="grid grid-cols-12 gap-3 p-3 items-center text-xs transition-all" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <div className="col-span-1"><div className="w-2 h-2 rounded-full" style={{ background: deployStatusColor(d.state || d.readyState) }}/></div>
                        <div className="col-span-4 truncate">
                          {d.url ? <a href={`https://${d.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#40c4ff" }}>{d.url}</a> : <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>}
                        </div>
                        <div className="col-span-2 truncate font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{d.meta?.githubCommitRef || d.gitSource?.ref || "—"}</div>
                        <div className="col-span-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: `${deployStatusColor(d.state || d.readyState)}15`, color: deployStatusColor(d.state || d.readyState) }}>
                            {deployStatusLabel(d.state || d.readyState)}
                          </span>
                        </div>
                        <div className="col-span-3" style={{ color: "rgba(255,255,255,0.25)" }}>{timeAgo(d.created || d.createdAt)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Env Vars */}
                {vcActiveAction === "env" && (
                  <div className="space-y-4">
                    {/* Add env var form */}
                    <div className="rounded-2xl p-5 space-y-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Add Environment Variable</h4>
                      <div className="grid grid-cols-5 gap-3">
                        <input value={vcAddEnv.key} onChange={e => setVcAddEnv(p => ({ ...p, key: e.target.value }))} placeholder="KEY_NAME" className="col-span-2 px-3 py-2 rounded-xl text-xs text-white font-mono placeholder-white/20 outline-none"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}/>
                        <input value={vcAddEnv.value} onChange={e => setVcAddEnv(p => ({ ...p, value: e.target.value }))} placeholder="value" className="col-span-2 px-3 py-2 rounded-xl text-xs text-white font-mono placeholder-white/20 outline-none"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}/>
                        <button onClick={addVercelEnvVar} disabled={vcAddingEnv || !vcAddEnv.key.trim()} className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                          style={{ background: vcAddEnv.key.trim() ? "linear-gradient(135deg, #00e676, #00c853)" : "rgba(255,255,255,0.05)", color: vcAddEnv.key.trim() ? "#0a0a0a" : "rgba(255,255,255,0.2)" }}>
                          {vcAddingEnv ? <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }}/> : <><Icons.Plus /> Add</>}
                        </button>
                      </div>
                      <div className="flex gap-2">
                        {["production", "preview", "development"].map(t => (
                          <label key={t} className="flex items-center gap-1.5 cursor-pointer"
                            onClick={() => setVcAddEnv(p => ({ ...p, target: p.target.includes(t) ? p.target.filter(x => x !== t) : [...p.target, t] }))}>
                            <div className="w-4 h-4 rounded flex items-center justify-center" style={{
                              background: vcAddEnv.target.includes(t) ? (t === "production" ? "#00e676" : t === "preview" ? "#ffd740" : "#40c4ff") : "rgba(255,255,255,0.06)",
                              border: vcAddEnv.target.includes(t) ? "none" : "1px solid rgba(255,255,255,0.12)"
                            }}>{vcAddEnv.target.includes(t) && <Icons.Check />}</div>
                            <span className="text-[11px] capitalize" style={{ color: "rgba(255,255,255,0.5)" }}>{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Env var list */}
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="grid grid-cols-12 gap-3 p-3 text-[10px] font-semibold uppercase tracking-widest" style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.3)" }}>
                        <div className="col-span-4">Key</div><div className="col-span-3">Value</div><div className="col-span-3">Target</div><div className="col-span-2">Actions</div>
                      </div>
                      {vcEnvVars.map(env => (
                        <div key={env.id} className="grid grid-cols-12 gap-3 p-3 items-center text-xs transition-all" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <div className="col-span-4 font-mono text-white truncate">{env.key}</div>
                          <div className="col-span-3 font-mono truncate" style={{ color: "rgba(255,255,255,0.3)" }}>{env.value ? "••••••••" : "—"}</div>
                          <div className="col-span-3 flex gap-1 flex-wrap">
                            {(env.target || []).map(t => (
                              <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-medium capitalize" style={{
                                background: t === "production" ? "rgba(0,230,118,0.1)" : t === "preview" ? "rgba(255,215,64,0.1)" : "rgba(64,196,255,0.1)",
                                color: t === "production" ? "#00e676" : t === "preview" ? "#ffd740" : "#40c4ff"
                              }}>{t}</span>
                            ))}
                          </div>
                          <div className="col-span-2">
                            <button onClick={() => deleteVercelEnvVar(env)} className="p-1.5 rounded-lg" style={{ background: "rgba(255,82,82,0.1)", color: "#ff5252" }}><Icons.Trash /></button>
                          </div>
                        </div>
                      ))}
                      {vcEnvVars.length === 0 && <div className="py-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>No environment variables</div>}
                    </div>
                  </div>
                )}

                {/* Domains */}
                {vcActiveAction === "domains" && (
                  <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                    {vcDomains.map((d, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 transition-all" style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <Icons.Globe />
                        <div className="flex-1">
                          <a href={`https://${d.name}`} target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">{d.name}</a>
                          {d.redirect && <span className="text-[10px] ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>→ {d.redirect}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          {d.verified !== false && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(0,230,118,0.1)", color: "#00e676" }}>verified</span>}
                          <a href={`https://${d.name}`} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.3)" }}><Icons.ExternalLink /></a>
                        </div>
                      </div>
                    ))}
                    {vcDomains.length === 0 && <div className="py-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>No custom domains configured</div>}
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          /* Project List */
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input value={vcProjectSearch} onChange={e => setVcProjectSearch(e.target.value)} placeholder="Search projects..." className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}/>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#fff" }}>{filteredProjects.length} projects</span>
            </div>
            <div className="space-y-1">
              {filteredProjects.map((proj, i) => {
                const latestDeploy = proj.latestDeployments?.[0];
                const status = latestDeploy?.readyState || "READY";
                return (
                  <button key={proj.id} onClick={() => { fetchVercelProjectDetail(proj); setVcActiveAction("deploys"); }}
                    className="w-full flex items-center gap-4 p-3.5 rounded-xl text-left transition-all duration-200 group"
                    style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", animation: mounted ? `fadeSlideUp 0.3s ease ${i * 30}ms forwards` : "none" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}>
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: deployStatusColor(status) }}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{proj.name}</span>
                        {proj.framework && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>{proj.framework}</span>}
                      </div>
                      {proj.alias?.[0] && <div className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.25)" }}>{proj.alias[0]}</div>}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: `${deployStatusColor(status)}15`, color: deployStatusColor(status) }}>
                        {deployStatusLabel(status)}
                      </span>
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.15)" }}>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#fff" }}><Icons.ChevronRight /></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── CLAUDE VIEW ───
  const ClaudeView = () => {
    const c = serviceColors.claude;
    const chatEndRef = useRef(null);
    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [clChatHistory, clChatLoading]);

    if (!vault.anthropic) return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.5s ease" }}>
        <div className="p-5 rounded-3xl mb-6" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}><Icons.Claude /></div>
        <h2 className="text-xl font-bold text-white mb-2">Connect Claude</h2>
        <p className="text-sm mb-6 max-w-md text-center" style={{ color: "rgba(255,255,255,0.4)" }}>Add your Anthropic API key to unlock the live chat console, prompt vault, model selector, and usage tracking.</p>
        <button onClick={() => setShowSetup(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: "linear-gradient(135deg, #d97750, #c4623e)", color: "white", boxShadow: "0 0 25px rgba(217,119,80,0.3)" }}>
          <Icons.Key /> Add Anthropic Key
        </button>
        <p className="text-[11px] mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>Get one at <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ color: "#d97750", textDecoration: "underline" }}>console.anthropic.com</a></p>
      </div>
    );

    const selectedModelInfo = clModels.find(m => m.id === clSelectedModel);

    return (
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}><Icons.Claude /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Claude / Anthropic</h2>
              <div className="flex items-center gap-3 mt-1">
                <PulseDot color="#00e676" size={6} />
                <span className="text-xs" style={{ color: "#00e676" }}>API Connected</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(217,119,80,0.1)", color: "#d97750" }}>{selectedModelInfo?.name}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Session: {estimateCost()}</span>
              </div>
            </div>
          </div>
          <button onClick={() => setShowSetup(true)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.Settings /></button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "chat", label: "Live Console" },
            { id: "models", label: "Model Selector" },
            { id: "prompts", label: "Prompt Vault" },
            { id: "usage", label: "Usage" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setClActiveTab(tab.id)}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ background: clActiveTab === tab.id ? "rgba(217,119,80,0.12)" : "rgba(255,255,255,0.02)", border: `1px solid ${clActiveTab === tab.id ? "rgba(217,119,80,0.3)" : "rgba(255,255,255,0.06)"}`, color: clActiveTab === tab.id ? "#d97750" : "rgba(255,255,255,0.45)" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chat Console */}
        {clActiveTab === "chat" && (
          <div className="space-y-3">
            {/* System prompt selector */}
            {clActiveSystemPrompt && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(217,119,80,0.06)", border: "1px solid rgba(217,119,80,0.15)" }}>
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#d97750" }}>System</span>
                <span className="text-xs truncate flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>{clActiveSystemPrompt.substring(0, 80)}...</span>
                <button onClick={() => setClActiveSystemPrompt("")} className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}><Icons.X /></button>
              </div>
            )}

            {/* Chat messages */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", height: 380 }}>
              <div className="h-full overflow-y-auto p-4 space-y-3">
                {clChatHistory.length === 0 && !clChatLoading && (
                  <div className="flex flex-col items-center justify-center h-full" style={{ color: "rgba(255,255,255,0.12)" }}>
                    <Icons.Terminal /><div className="mt-2 text-xs">Send a message to start a session</div>
                    {clPromptVault.length > 0 && <div className="text-[10px] mt-1">Tip: Load a system prompt from the Prompt Vault tab</div>}
                  </div>
                )}
                {clChatHistory.map((msg, i) => (
                  <div key={i} className="flex gap-3" style={{ animation: "fadeSlideUp 0.3s ease", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                    {msg.role === "assistant" && <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-1" style={{ background: "rgba(217,119,80,0.15)", color: "#d97750" }}><Icons.Claude /></div>}
                    <div className="max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed" style={{
                      background: msg.role === "user" ? "rgba(139,108,246,0.12)" : "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.85)",
                      borderBottomRightRadius: msg.role === "user" ? 4 : undefined,
                      borderBottomLeftRadius: msg.role === "assistant" ? 4 : undefined,
                      whiteSpace: "pre-wrap", wordBreak: "break-word",
                    }}>{msg.content}</div>
                  </div>
                ))}
                {clChatLoading && (
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center mt-1" style={{ background: "rgba(217,119,80,0.15)", color: "#d97750" }}><Icons.Claude /></div>
                    <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="flex gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "#d97750", animation: "ping 1.2s infinite" }}/><span className="w-2 h-2 rounded-full" style={{ background: "#d97750", animation: "ping 1.2s 0.2s infinite" }}/><span className="w-2 h-2 rounded-full" style={{ background: "#d97750", animation: "ping 1.2s 0.4s infinite" }}/></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input value={clChatInput} onChange={e => setClChatInput(e.target.value)} placeholder="Send a message to Claude..."
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendClaudeMessage(); } }}
                className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onFocus={e => e.target.style.borderColor = "rgba(217,119,80,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
              <button onClick={sendClaudeMessage} disabled={clChatLoading || !clChatInput.trim()}
                className="px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
                style={{ background: clChatInput.trim() && !clChatLoading ? "linear-gradient(135deg, #d97750, #c4623e)" : "rgba(255,255,255,0.05)", color: clChatInput.trim() && !clChatLoading ? "white" : "rgba(255,255,255,0.2)", cursor: !clChatInput.trim() || clChatLoading ? "not-allowed" : "pointer" }}>
                <Icons.Zap /> Send
              </button>
              <button onClick={() => { setClChatHistory([]); setClTokensUsed({ input: 0, output: 0 }); }} className="px-3 py-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }} title="Clear chat">
                <Icons.Trash />
              </button>
            </div>
          </div>
        )}

        {/* Model Selector */}
        {clActiveTab === "models" && (
          <div className="grid grid-cols-3 gap-4">
            {clModels.map(model => {
              const isSelected = clSelectedModel === model.id;
              return (
                <button key={model.id} onClick={() => setClSelectedModel(model.id)}
                  className="rounded-2xl p-5 text-left transition-all duration-200"
                  style={{ background: isSelected ? "rgba(217,119,80,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${isSelected ? "rgba(217,119,80,0.3)" : "rgba(255,255,255,0.06)"}` }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = "rgba(217,119,80,0.15)"; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize" style={{
                      background: model.badge === "smartest" ? "rgba(139,108,246,0.1)" : model.badge === "balanced" ? "rgba(217,119,80,0.1)" : "rgba(0,230,118,0.1)",
                      color: model.badge === "smartest" ? "#8b6cf6" : model.badge === "balanced" ? "#d97750" : "#00e676"
                    }}>{model.badge}</span>
                    {isSelected && <div className="w-3 h-3 rounded-full" style={{ background: "#d97750" }}/>}
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{model.name}</h4>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>{model.speed}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span style={{ color: "rgba(255,255,255,0.3)" }}>Input</span><span className="font-mono" style={{ color: "#d97750" }}>${model.costIn}/MTok</span></div>
                    <div className="flex justify-between text-xs"><span style={{ color: "rgba(255,255,255,0.3)" }}>Output</span><span className="font-mono" style={{ color: "#d97750" }}>${model.costOut}/MTok</span></div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Prompt Vault */}
        {clActiveTab === "prompts" && (
          <div className="space-y-4">
            <div className="rounded-2xl p-5 space-y-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h4 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Save New Prompt</h4>
              <input value={clNewPrompt.name} onChange={e => setClNewPrompt(p => ({ ...p, name: e.target.value }))} placeholder="Prompt name (e.g., Code Review Expert)"
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}/>
              <textarea value={clNewPrompt.content} onChange={e => setClNewPrompt(p => ({ ...p, content: e.target.value }))} placeholder="System prompt content..."
                rows={4} className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}/>
              <button onClick={savePromptToVault} disabled={!clNewPrompt.name.trim() || !clNewPrompt.content.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: clNewPrompt.name.trim() && clNewPrompt.content.trim() ? "linear-gradient(135deg, #d97750, #c4623e)" : "rgba(255,255,255,0.05)", color: clNewPrompt.name.trim() && clNewPrompt.content.trim() ? "white" : "rgba(255,255,255,0.2)" }}>
                <Icons.Shield /> Save Prompt
              </button>
            </div>

            <div className="space-y-2">
              {clPromptVault.length === 0 && <div className="py-12 text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>No saved prompts yet. Create one above to get started.</div>}
              {clPromptVault.map(prompt => (
                <div key={prompt.id} className="flex items-center gap-3 p-4 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${clActiveSystemPrompt === prompt.content ? "rgba(217,119,80,0.3)" : "rgba(255,255,255,0.04)"}` }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(217,119,80,0.04)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{prompt.name}</div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.25)" }}>{prompt.content.substring(0, 100)}...</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setClActiveSystemPrompt(prompt.content); setClActiveTab("chat"); showToast(`"${prompt.name}" loaded as system prompt`); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(217,119,80,0.1)", color: "#d97750" }}>
                      Use
                    </button>
                    <button onClick={() => { navigator.clipboard?.writeText(prompt.content); showToast("Copied to clipboard"); }}
                      className="p-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }}><Icons.Copy /></button>
                    <button onClick={() => deletePrompt(prompt.id)} className="p-1.5 rounded-lg" style={{ background: "rgba(255,82,82,0.1)", color: "#ff5252" }}><Icons.Trash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage */}
        {clActiveTab === "usage" && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Input Tokens", value: clTokensUsed.input.toLocaleString(), color: "#40c4ff" },
              { label: "Output Tokens", value: clTokensUsed.output.toLocaleString(), color: "#d97750" },
              { label: "Session Cost", value: estimateCost(), color: "#00e676" },
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{stat.label}</div>
                <div className="text-2xl font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            ))}
            <div className="col-span-3 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Active Model</div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-white">{selectedModelInfo?.name}</span>
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>${selectedModelInfo?.costIn}/MTok in · ${selectedModelInfo?.costOut}/MTok out</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{selectedModelInfo?.speed}</span>
              </div>
              <div className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                Messages this session: {clChatHistory.filter(m => m.role === "user").length} sent · {clChatHistory.filter(m => m.role === "assistant").length} received
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── SUPABASE VIEW ───
  const SupabaseView = () => {
    const c = serviceColors.supabase;
    const hasCreds = vault.supabase_url && vault.supabase_anon;

    if (!hasCreds) return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.5s ease" }}>
        <div className="p-5 rounded-3xl mb-6" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}><Icons.Supabase /></div>
        <h2 className="text-xl font-bold text-white mb-2">Connect Supabase</h2>
        <p className="text-sm mb-6 max-w-md text-center" style={{ color: "rgba(255,255,255,0.4)" }}>Add your Supabase project URL and keys to browse tables, run queries, manage storage, and monitor RLS.</p>
        <button onClick={() => setShowSetup(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: "linear-gradient(135deg, #3ecf8e, #2ea872)", color: "white", boxShadow: "0 0 25px rgba(62,207,142,0.3)" }}>
          <Icons.Key /> Add Supabase Keys
        </button>
      </div>
    );

    if (sbLoading && !sbConnected) return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 rounded-full" style={{ borderColor: "#3ecf8e", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}/>
        <span className="ml-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Connecting to Supabase...</span>
      </div>
    );

    if (sbError) return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.4s ease" }}>
        <div className="p-4 rounded-3xl mb-4" style={{ background: "rgba(255,82,82,0.1)", color: "#ff5252" }}><Icons.AlertTriangle /></div>
        <h3 className="text-lg font-bold text-white mb-2">Connection Failed</h3>
        <p className="text-sm mb-4 max-w-md text-center" style={{ color: "rgba(255,255,255,0.4)" }}>{sbError}</p>
        <div className="flex gap-3">
          <button onClick={fetchSupabaseTables} className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2" style={{ background: "rgba(62,207,142,0.15)", color: "#3ecf8e" }}><Icons.Refresh /> Retry</button>
          <button onClick={() => setShowSetup(true)} className="px-4 py-2 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>Update Keys</button>
        </div>
      </div>
    );

    return (
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}><Icons.Supabase /></div>
            <div>
              <h2 className="text-xl font-bold text-white">Supabase</h2>
              <div className="flex items-center gap-3 mt-1">
                <PulseDot color="#3ecf8e" size={6} />
                <span className="text-xs" style={{ color: "#3ecf8e" }}>Connected</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(62,207,142,0.1)", color: "#3ecf8e" }}>{sbTables.length} tables</span>
                {vault.supabase_service && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,215,64,0.1)", color: "#ffd740" }}>service key</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchSupabaseTables} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.Refresh /></button>
            <button onClick={() => setShowSetup(true)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.Settings /></button>
          </div>
        </div>

        {/* Key Copy Bar */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Project URL", val: vault.supabase_url, color: "#3ecf8e" },
            { label: "Anon Key", val: vault.supabase_anon, color: "#40c4ff" },
            { label: "Service Key", val: vault.supabase_service || "Not set", color: vault.supabase_service ? "#ffd740" : "rgba(255,255,255,0.2)" },
          ].map((k, i) => (
            <button key={i} onClick={() => { if (k.val && k.val !== "Not set") { navigator.clipboard?.writeText(k.val); showToast(`${k.label} copied`); } }}
              className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${k.color}30`} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
              <Icons.Key /><div className="flex-1 min-w-0"><div className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{k.label}</div>
              <div className="text-xs font-mono truncate" style={{ color: k.color }}>{k.val?.substring(0, 30)}{k.val?.length > 30 ? "..." : ""}</div></div>
              <Icons.Copy />
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "tables", label: "Tables" },
            { id: "sql", label: "SQL Console" },
            { id: "storage", label: "Storage" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setSbActiveTab(tab.id)}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ background: sbActiveTab === tab.id ? "rgba(62,207,142,0.12)" : "rgba(255,255,255,0.02)", border: `1px solid ${sbActiveTab === tab.id ? "rgba(62,207,142,0.3)" : "rgba(255,255,255,0.06)"}`, color: sbActiveTab === tab.id ? "#3ecf8e" : "rgba(255,255,255,0.45)" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tables Tab */}
        {sbActiveTab === "tables" && !sbSelectedTable && (
          <div className="space-y-1">
            {sbTables.length === 0 ? (
              <div className="py-12 text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>No public tables found. Create tables in Supabase to see them here.</div>
            ) : sbTables.map((table, i) => (
              <button key={table} onClick={() => fetchTableData(table)}
                className="w-full flex items-center gap-4 p-3.5 rounded-xl text-left transition-all duration-200 group"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", animation: `fadeSlideUp 0.3s ease ${i * 30}ms forwards` }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(62,207,142,0.04)"; e.currentTarget.style.borderColor = "rgba(62,207,142,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#3ecf8e" }}/>
                <div className="flex-1"><span className="text-sm font-medium font-mono text-white">{table}</span></div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3ecf8e" }}><Icons.ChevronRight /></div>
              </button>
            ))}
          </div>
        )}

        {/* Table Data View */}
        {sbActiveTab === "tables" && sbSelectedTable && (
          <div className="space-y-3" style={{ animation: "fadeSlideUp 0.3s ease" }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setSbSelectedTable(null)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.ChevronLeft /></button>
              <h3 className="text-lg font-bold font-mono text-white">{sbSelectedTable}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(62,207,142,0.1)", color: "#3ecf8e" }}>{sbTableCount} rows</span>
            </div>
            {sbLoadingData ? (
              <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 rounded-full" style={{ borderColor: "#3ecf8e", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}/></div>
            ) : sbTableData.length === 0 ? (
              <div className="py-12 text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>Table is empty</div>
            ) : (
              <div className="rounded-2xl overflow-x-auto" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <table className="w-full text-xs">
                  <thead><tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    {Object.keys(sbTableData[0]).map(col => (
                      <th key={col} className="px-3 py-2.5 text-left font-semibold font-mono uppercase tracking-wider whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{col}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {sbTableData.slice(0, 25).map((row, ri) => (
                      <tr key={ri} className="transition-all" onMouseEnter={e => e.currentTarget.style.background = "rgba(62,207,142,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        {Object.values(row).map((val, ci) => (
                          <td key={ci} className="px-3 py-2 font-mono whitespace-nowrap" style={{ color: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.03)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>
                            {val === null ? <span style={{ color: "rgba(255,255,255,0.15)" }}>NULL</span> : typeof val === "object" ? JSON.stringify(val).substring(0, 50) : String(val).substring(0, 80)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* SQL Console */}
        {sbActiveTab === "sql" && (
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="px-4 py-2 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>SQL Editor</span>
                <div className="flex gap-2">
                  {["SELECT * FROM information_schema.tables WHERE table_schema = 'public';", "SELECT tablename, hasindexes, hastriggers FROM pg_tables WHERE schemaname = 'public';", "SELECT table_name, is_insertable_into FROM information_schema.tables WHERE table_schema = 'public';"].map((q, i) => (
                    <button key={i} onClick={() => setSbSqlQuery(q)} className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(62,207,142,0.08)", color: "#3ecf8e" }}>
                      {["Tables", "PG Tables", "Insert Status"][i]}
                    </button>
                  ))}
                </div>
              </div>
              <textarea value={sbSqlQuery} onChange={e => setSbSqlQuery(e.target.value)} rows={4}
                className="w-full px-4 py-3 text-sm font-mono text-white placeholder-white/20 outline-none resize-none"
                style={{ background: "rgba(0,0,0,0.3)" }}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); runSqlQuery(); } }}/>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={runSqlQuery} disabled={sbSqlRunning || !sbSqlQuery.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: sbSqlQuery.trim() ? "linear-gradient(135deg, #3ecf8e, #2ea872)" : "rgba(255,255,255,0.05)", color: sbSqlQuery.trim() ? "#0a0a0a" : "rgba(255,255,255,0.2)" }}>
                {sbSqlRunning ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }}/> Running...</> : <><Icons.Zap /> Run Query</>}
              </button>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Cmd+Enter to run</span>
            </div>
            {sbSqlError && <div className="p-4 rounded-xl text-xs" style={{ background: "rgba(255,82,82,0.08)", border: "1px solid rgba(255,82,82,0.2)", color: "#ff5252" }}>{sbSqlError}</div>}
            {sbSqlResult && (
              <div className="rounded-2xl overflow-x-auto" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                {Array.isArray(sbSqlResult) && sbSqlResult.length > 0 ? (
                  <table className="w-full text-xs">
                    <thead><tr style={{ background: "rgba(255,255,255,0.03)" }}>
                      {Object.keys(sbSqlResult[0]).map(col => (
                        <th key={col} className="px-3 py-2 text-left font-semibold font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{col}</th>
                      ))}
                    </tr></thead>
                    <tbody>{sbSqlResult.slice(0, 50).map((row, ri) => (
                      <tr key={ri}>{Object.values(row).map((val, ci) => (
                        <td key={ci} className="px-3 py-2 font-mono" style={{ color: "rgba(255,255,255,0.6)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          {val === null ? <span style={{ color: "rgba(255,255,255,0.15)" }}>NULL</span> : String(val).substring(0, 80)}
                        </td>
                      ))}</tr>
                    ))}</tbody>
                  </table>
                ) : <div className="p-4 text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>{JSON.stringify(sbSqlResult, null, 2)}</div>}
              </div>
            )}
          </div>
        )}

        {/* Storage */}
        {sbActiveTab === "storage" && (
          <div className="space-y-2">
            {sbStorageBuckets.length === 0 ? (
              <div className="py-12 text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>No storage buckets found. {!vault.supabase_service && "Add a service key to access storage."}</div>
            ) : sbStorageBuckets.map((bucket, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(62,207,142,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}>
                <Icons.Folder />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{bucket.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{bucket.public ? "Public" : "Private"} · Created {new Date(bucket.created_at).toLocaleDateString()}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: bucket.public ? "rgba(0,230,118,0.1)" : "rgba(255,215,64,0.1)", color: bucket.public ? "#00e676" : "#ffd740" }}>
                  {bucket.public ? "public" : "private"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── AGENT BAY (with Memory) ───
  const AgentView = () => {
    const logEndRef = useRef(null);
    useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [agentLog]);
    const projectMemories = agentMemories.filter(m => m.project === agentSelectedProject);
    const projectSessions = agentSessions.filter(s => s.project === agentSelectedProject);
    const projectOptions = ["Launchpad", ...ghRepos.slice(0, 10).map(r => r.name), ...vcProjects.slice(0, 5).map(p => p.name)].filter((v, i, a) => a.indexOf(v) === i);

    return (
      <div className="space-y-5" style={{ animation: "fadeSlideUp 0.4s ease" }}>
        <div className="flex items-center justify-between">
          <div><h2 className="text-xl font-bold text-white">Agent Bay</h2><p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Describe a task. Grant permissions. Claude does the work. Memory compounds.</p></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "launch", label: "Launch Task" },
            { id: "memory", label: `Memory (${agentMemories.length})` },
            { id: "sessions", label: `Sessions (${agentSessions.length})` },
          ].map(tab => (
            <button key={tab.id} onClick={() => setAgentActiveTab(tab.id)} className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ background: agentActiveTab === tab.id ? "rgba(0,230,118,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${agentActiveTab === tab.id ? "rgba(0,230,118,0.3)" : "rgba(255,255,255,0.06)"}`, color: agentActiveTab === tab.id ? "#00e676" : "rgba(255,255,255,0.45)" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Launch Tab */}
        {agentActiveTab === "launch" && (
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-4">
              {/* Project selector */}
              <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Project</label>
                <div className="flex flex-wrap gap-2">
                  {projectOptions.map(p => (
                    <button key={p} onClick={() => setAgentSelectedProject(p)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{ background: agentSelectedProject === p ? "rgba(0,230,118,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${agentSelectedProject === p ? "rgba(0,230,118,0.3)" : "rgba(255,255,255,0.06)"}`, color: agentSelectedProject === p ? "#00e676" : "rgba(255,255,255,0.4)" }}>
                      {p}
                    </button>
                  ))}
                </div>
                {projectMemories.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 px-2 py-1.5 rounded-lg" style={{ background: "rgba(139,108,246,0.06)" }}>
                    <Icons.Brain /><span className="text-[10px]" style={{ color: "#8b6cf6" }}>{projectMemories.length} memories loaded for this project</span>
                  </div>
                )}
              </div>

              {/* Task input */}
              <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Task</label>
                <textarea value={agentTaskInput} onChange={e => setAgentTaskInput(e.target.value)}
                  placeholder="e.g. Add error handling to the API routes, write tests, and summarize what you changed..."
                  rows={4} className="w-full bg-transparent text-sm text-white placeholder-white/15 outline-none resize-none" style={{ lineHeight: 1.7 }}/>
              </div>

              {/* Permissions */}
              <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Permissions</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { k: "pushCode", label: "Push code" },
                    { k: "createPR", label: "Create PRs" },
                    { k: "deploy", label: "Trigger deploys" },
                    { k: "writeDB", label: "Write to DB" },
                    { k: "runMigrations", label: "Run migrations" },
                  ].map(p => (
                    <label key={p.k} className="flex items-center gap-2 p-1.5 rounded cursor-pointer" onClick={() => setAgentPermissions(prev => ({ ...prev, [p.k]: !prev[p.k] }))}>
                      <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: agentPermissions[p.k] ? "#00e676" : "rgba(255,255,255,0.06)", border: agentPermissions[p.k] ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                        {agentPermissions[p.k] && <Icons.Check />}
                      </div>
                      <span className="text-xs" style={{ color: agentPermissions[p.k] ? "white" : "rgba(255,255,255,0.4)" }}>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Model + Launch */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Model</div>
                  <div className="text-xs font-medium text-white">{clModels.find(m => m.id === clSelectedModel)?.name}</div>
                </div>
                <button onClick={launchAgent} disabled={agentRunning || !agentTaskInput.trim() || !vault.anthropic}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: agentRunning ? "rgba(255,215,64,0.12)" : (!agentTaskInput.trim() || !vault.anthropic ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #00e676, #00c853)"),
                    color: agentRunning ? "#ffd740" : (!agentTaskInput.trim() || !vault.anthropic ? "rgba(255,255,255,0.2)" : "#0a0a0a"),
                    cursor: agentRunning || !agentTaskInput.trim() ? "not-allowed" : "pointer",
                    boxShadow: !agentRunning && agentTaskInput.trim() && vault.anthropic ? "0 0 25px rgba(0,230,118,0.2)" : "none",
                  }}>
                  {agentRunning ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }}/> Working...</> : <><Icons.Zap /> Launch</>}
                </button>
              </div>
            </div>

            {/* Live Log */}
            <div className="rounded-2xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Session Log</span>
                {agentRunning && <PulseDot color="#ffd740" />}
              </div>
              <div className="p-4 space-y-1.5 font-mono text-xs overflow-y-auto" style={{ height: 400 }}>
                {agentLog.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full" style={{ color: "rgba(255,255,255,0.1)" }}>
                    <Icons.Terminal /><div className="mt-2 text-xs">Waiting for task...</div>
                  </div>
                ) : agentLog.map((entry, i) => {
                  const colors = { system: "#40c4ff", task: "#ffd740", agent: "rgba(255,255,255,0.6)", memory: "#8b6cf6", done: "#00e676", error: "#ff5252" };
                  const labels = { system: "SYS", task: "TSK", agent: "AGT", memory: "MEM", done: " OK", error: "ERR" };
                  return (
                    <div key={i} className="flex gap-2 p-1.5 rounded" style={{
                      animation: "fadeSlideUp 0.2s ease",
                      background: entry.type === "done" ? "rgba(0,230,118,0.06)" : entry.type === "memory" ? "rgba(139,108,246,0.06)" : entry.type === "error" ? "rgba(255,82,82,0.06)" : "transparent",
                    }}>
                      <span className="flex-shrink-0 w-7" style={{ color: colors[entry.type] }}>{labels[entry.type]}</span>
                      <span style={{ color: colors[entry.type] || "rgba(255,255,255,0.5)", wordBreak: "break-word" }}>{entry.msg}</span>
                    </div>
                  );
                })}
                <div ref={logEndRef} />
              </div>
            </div>
          </div>
        )}

        {/* Memory Tab */}
        {agentActiveTab === "memory" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Memories persist across sessions. Agents auto-learn and get smarter per project over time.</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(139,108,246,0.1)", color: "#8b6cf6" }}>{agentMemories.length} total</span>
            </div>

            {/* Group by project */}
            {Object.entries(agentMemories.reduce((acc, m) => { (acc[m.project] = acc[m.project] || []).push(m); return acc; }, {})).map(([project, memories]) => (
              <div key={project}>
                <div className="flex items-center gap-2 mb-2 mt-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#8b6cf6" }}/>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{project}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.25)" }}>{memories.length}</span>
                </div>
                {memories.map(mem => (
                  <div key={mem.id} className="flex items-start gap-3 p-3 rounded-xl mb-1.5 transition-all" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(139,108,246,0.04)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}>
                    <div className="p-1.5 rounded-lg mt-0.5" style={{ background: "rgba(139,108,246,0.1)", color: "#8b6cf6" }}><Icons.Brain /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white">{mem.content}</div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded capitalize" style={{ background: `rgba(139,108,246,0.1)`, color: "#8b6cf6" }}>{mem.type}</span>
                        {mem.task && <span className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.2)" }}>Task: {mem.task}</span>}
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>{new Date(mem.created).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button onClick={() => deleteMemory(mem.id)} className="p-1.5 rounded-lg flex-shrink-0" style={{ background: "rgba(255,82,82,0.08)", color: "#ff5252" }}><Icons.Trash /></button>
                  </div>
                ))}
              </div>
            ))}
            {agentMemories.length === 0 && (
              <div className="py-16 text-center">
                <div className="inline-block p-4 rounded-3xl mb-4" style={{ background: "rgba(139,108,246,0.08)" }}><Icons.Brain /></div>
                <div className="text-sm text-white mb-1">No memories yet</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Launch an agent task and it will automatically save what it learned. Memories compound over time — your agents get smarter the more you use them.</div>
              </div>
            )}
          </div>
        )}

        {/* Sessions Tab */}
        {agentActiveTab === "sessions" && (
          <div className="space-y-2">
            {agentSessions.length === 0 ? (
              <div className="py-16 text-center"><div className="text-sm text-white mb-1">No sessions yet</div><div className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Launch a task from the Launch tab to start.</div></div>
            ) : agentSessions.map((session, i) => (
              <div key={session.id} className="flex items-center gap-4 p-3.5 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)", animation: `fadeSlideUp 0.3s ease ${i * 30}ms forwards` }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.015)"}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#00e676" }}/>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{session.task}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(0,230,118,0.08)", color: "#00e676" }}>{session.project}</span>
                    <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>{session.tokensUsed?.toLocaleString()} tokens</span>
                    {session.memorySaved && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(139,108,246,0.08)", color: "#8b6cf6" }}>memory saved</span>}
                  </div>
                </div>
                <span className="text-[10px] flex-shrink-0" style={{ color: "rgba(255,255,255,0.15)" }}>{new Date(session.created).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ─── DASHBOARD (Health + Cost Cockpit) ───
  const DashboardView = () => {
    const connectedCount = [isConnected("github"), isConnected("vercel"), isConnected("supabase"), isConnected("claude")].filter(Boolean).length;
    const totalTokens = clTokensUsed.input + clTokensUsed.output;

    // Build health checks from real state
    const healthChecks = [];
    if (vault.github) {
      if (ghUser) healthChecks.push({ svc: "GitHub", status: "ok", msg: `Connected as ${ghUser.login} · ${ghRepos.length} repos`, color: "#8b6cf6" });
      else if (ghError) healthChecks.push({ svc: "GitHub", status: "error", msg: ghError, color: "#8b6cf6" });
      else healthChecks.push({ svc: "GitHub", status: "loading", msg: "Connecting...", color: "#8b6cf6" });
    } else healthChecks.push({ svc: "GitHub", status: "disconnected", msg: "No token configured", color: "#8b6cf6" });

    if (vault.vercel) {
      if (vcUser) healthChecks.push({ svc: "Vercel", status: "ok", msg: `${vcUser.username || vcUser.name} · ${vcProjects.length} projects`, color: "#ffffff" });
      else if (vcError) healthChecks.push({ svc: "Vercel", status: "error", msg: vcError, color: "#ffffff" });
      else healthChecks.push({ svc: "Vercel", status: "loading", msg: "Connecting...", color: "#ffffff" });
    } else healthChecks.push({ svc: "Vercel", status: "disconnected", msg: "No token configured", color: "#ffffff" });

    if (vault.supabase_url && vault.supabase_anon) {
      if (sbConnected) healthChecks.push({ svc: "Supabase", status: "ok", msg: `Connected · ${sbTables.length} tables`, color: "#3ecf8e" });
      else if (sbError) healthChecks.push({ svc: "Supabase", status: "error", msg: sbError, color: "#3ecf8e" });
      else healthChecks.push({ svc: "Supabase", status: "loading", msg: "Connecting...", color: "#3ecf8e" });
    } else healthChecks.push({ svc: "Supabase", status: "disconnected", msg: "No keys configured", color: "#3ecf8e" });

    if (vault.anthropic) healthChecks.push({ svc: "Claude", status: "ok", msg: `API key set · ${clModels.find(m=>m.id===clSelectedModel)?.name}`, color: "#d97750" });
    else healthChecks.push({ svc: "Claude", status: "disconnected", msg: "No API key", color: "#d97750" });

    const svcIcons = { GitHub: <Icons.GitHub />, Vercel: <Icons.Vercel />, Supabase: <Icons.Supabase />, Claude: <Icons.Claude /> };
    const statusDot = { ok: "#00e676", error: "#ff5252", loading: "#ffd740", disconnected: "rgba(255,255,255,0.15)" };

    // Alerts
    const alerts = [];
    // Check for Vercel deploys with errors
    if (vcProjects.length > 0) {
      vcProjects.forEach(p => {
        const latest = p.latestDeployments?.[0];
        if (latest?.readyState === "ERROR") alerts.push({ msg: `Deploy failed: ${p.name}`, color: "#ff5252", action: () => { setActiveView("vercel"); } });
      });
    }
    // Token expiration warnings could go here
    if (connectedCount < 4) alerts.push({ msg: `${4 - connectedCount} service${4 - connectedCount > 1 ? "s" : ""} not connected`, color: "#ffd740", action: () => setShowSetup(true) });

    // Cost estimation
    const claudeCost = (clTokensUsed.input / 1e6 * (clModels.find(m=>m.id===clSelectedModel)?.costIn || 3)) + (clTokensUsed.output / 1e6 * (clModels.find(m=>m.id===clSelectedModel)?.costOut || 15));

    return (
      <div className="space-y-6" style={{ animation: "fadeSlideUp 0.4s ease" }}>
        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Services Online", value: `${connectedCount}/4`, color: connectedCount === 4 ? "#00e676" : "#ffd740", icon: <Icons.Heart /> },
            { label: "Repos", value: ghRepos.length, color: "#8b6cf6", icon: <Icons.GitHub /> },
            { label: "Vercel Projects", value: vcProjects.length, color: "#ffffff", icon: <Icons.Vercel /> },
            { label: "DB Tables", value: sbTables.length, color: "#3ecf8e", icon: <Icons.Supabase /> },
          ].map((stat, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.06)", animation: `fadeSlideUp 0.5s ease ${i * 80}ms forwards` }}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-3xl opacity-15" style={{ background: stat.color, transform: "translate(30%, -30%)" }}/>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>{stat.label}</span>
              </div>
              <div className="text-3xl font-bold tracking-tight" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Service Health */}
          <div className="col-span-2 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>Service Health</h3>
            <div className="space-y-2">
              {healthChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer"
                  style={{ background: check.status === "error" ? "rgba(255,82,82,0.04)" : "rgba(255,255,255,0.01)" }}
                  onClick={() => setActiveView(check.svc.toLowerCase())}
                  onMouseEnter={e => e.currentTarget.style.background = `${check.color}08`} onMouseLeave={e => e.currentTarget.style.background = check.status === "error" ? "rgba(255,82,82,0.04)" : "rgba(255,255,255,0.01)"}>
                  <div className="p-2 rounded-xl" style={{ background: `${check.color}12`, color: check.color }}>{svcIcons[check.svc]}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{check.svc}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{check.msg}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {check.status === "loading" ? (
                      <div className="w-4 h-4 border-2 rounded-full" style={{ borderColor: check.color, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }}/>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: statusDot[check.status] }}/>
                    )}
                    <span className="text-[10px] capitalize" style={{ color: statusDot[check.status] }}>{check.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Quick Actions */}
          <div className="space-y-4">
            {alerts.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Alerts</h3>
                <div className="space-y-2">
                  {alerts.map((alert, i) => (
                    <button key={i} onClick={alert.action} className="w-full flex items-center gap-2 p-2.5 rounded-lg text-left transition-all"
                      style={{ background: `${alert.color}08`, border: `1px solid ${alert.color}20` }}
                      onMouseEnter={e => e.currentTarget.style.background = `${alert.color}12`} onMouseLeave={e => e.currentTarget.style.background = `${alert.color}08`}>
                      <Icons.AlertCircle />
                      <span className="text-xs" style={{ color: alert.color }}>{alert.msg}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Quick Actions</h3>
              <div className="space-y-1.5">
                {[
                  { label: "Go to GitHub", icon: <Icons.GitHub />, color: "#8b6cf6", view: "github" },
                  { label: "Deploy on Vercel", icon: <Icons.Rocket />, color: "#fff", view: "vercel" },
                  { label: "Chat with Claude", icon: <Icons.Claude />, color: "#d97750", view: "claude" },
                  { label: "Query Supabase", icon: <Icons.Supabase />, color: "#3ecf8e", view: "supabase" },
                ].filter((_, i) => [vault.github, vault.vercel, vault.anthropic, vault.supabase_url][i]).map((a, i) => (
                  <button key={i} onClick={() => setActiveView(a.view)} className="w-full flex items-center gap-2 p-2.5 rounded-lg text-left transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${a.color}08`; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                    <div style={{ color: a.color }}>{a.icon}</div>
                    <span className="text-xs font-medium text-white">{a.label}</span>
                    <div className="ml-auto" style={{ color: "rgba(255,255,255,0.15)" }}><Icons.ChevronRight /></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cost Cockpit */}
        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Cost Cockpit</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(0,230,118,0.08)", color: "#00e676" }}>This session</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Claude API", value: `$${claudeCost.toFixed(4)}`, sub: `${totalTokens.toLocaleString()} tokens`, color: "#d97750", icon: <Icons.Claude /> },
              { label: "Vercel", value: "Free tier", sub: `${vcProjects.length} projects`, color: "#ffffff", icon: <Icons.Vercel /> },
              { label: "Supabase", value: "Free tier", sub: `${sbTables.length} tables`, color: "#3ecf8e", icon: <Icons.Supabase /> },
              { label: "GitHub", value: "Free", sub: `${ghRepos.filter(r=>r.private).length} private repos`, color: "#8b6cf6", icon: <Icons.GitHub /> },
            ].map((cost, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2 mb-2"><div style={{ color: cost.color }}>{cost.icon}</div><span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{cost.label}</span></div>
                <div className="text-lg font-bold font-mono" style={{ color: cost.color }}>{cost.value}</div>
                <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>{cost.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,230,118,0.04)", border: "1px solid rgba(0,230,118,0.1)" }}>
            <Icons.TrendingUp />
            <span className="text-xs" style={{ color: "#00e676" }}>Total estimated session cost: <strong className="font-mono">${claudeCost.toFixed(4)}</strong></span>
            <span className="text-[10px] ml-auto" style={{ color: "rgba(255,255,255,0.2)" }}>Tracked: Claude API usage · Vercel/Supabase/GitHub on free tiers</span>
          </div>
        </div>

        {/* Recent Activity from real data */}
        {(ghRepos.length > 0 || vcProjects.length > 0) && (
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>Recently Updated</h3>
            <div className="space-y-1">
              {[
                ...ghRepos.slice(0, 5).map(r => ({ type: "github", name: r.name, detail: r.language || "repo", time: r.updated_at, color: "#8b6cf6", action: () => { setActiveView("github"); } })),
                ...vcProjects.slice(0, 3).map(p => ({ type: "vercel", name: p.name, detail: p.framework || "project", time: p.updatedAt, color: "#ffffff", action: () => { setActiveView("vercel"); } })),
              ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8).map((item, i) => (
                <button key={i} onClick={item.action} className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all"
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }}/>
                  <span className="text-sm text-white flex-1">{item.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${item.color}10`, color: item.color }}>{item.detail}</span>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>{new Date(item.time).toLocaleDateString()}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── MCP CONFIG GENERATOR ───
  const MCPView = () => {
    const [mcpProject, setMcpProject] = useState("Launchpad");
    const [mcpServices, setMcpServices] = useState({ github: true, supabase: true, filesystem: true });
    const [mcpScope, setMcpScope] = useState({ readOnly: false, timeboxMinutes: 60 });
    const [mcpGenerated, setMcpGenerated] = useState(null);
    const [mcpCopied, setMcpCopied] = useState(false);
    const [mcpFormat, setMcpFormat] = useState("claude-code");

    const projectOptions = ["Launchpad", ...ghRepos.slice(0, 15).map(r => r.name), ...vcProjects.slice(0, 5).map(p => p.name)].filter((v, i, a) => a.indexOf(v) === i);

    // Find the matching GitHub repo for selected project
    const matchedRepo = ghRepos.find(r => r.name === mcpProject);
    const matchedVcProject = vcProjects.find(p => p.name === mcpProject);

    const generateConfig = () => {
      const config = { mcpServers: {} };

      if (mcpServices.github && vault.github) {
        if (mcpFormat === "claude-code") {
          config.mcpServers["github"] = {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-github"],
            env: {
              GITHUB_PERSONAL_ACCESS_TOKEN: vault.github,
              ...(matchedRepo ? { GITHUB_REPOSITORY: matchedRepo.full_name } : {}),
            },
          };
        } else {
          config.mcpServers["github"] = {
            type: "url",
            url: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
            config: {
              token: "***GITHUB_PAT***",
              ...(matchedRepo ? { repository: matchedRepo.full_name } : {}),
            },
          };
        }
      }

      if (mcpServices.supabase && vault.supabase_url) {
        if (mcpFormat === "claude-code") {
          config.mcpServers["supabase"] = {
            command: "npx",
            args: ["-y", "@supabase/mcp-server-supabase", "--supabase-url", vault.supabase_url],
            env: {
              SUPABASE_SERVICE_ROLE_KEY: vault.supabase_service || vault.supabase_anon,
            },
          };
        } else {
          config.mcpServers["supabase"] = {
            type: "url",
            url: "https://mcp.supabase.com",
            config: {
              supabaseUrl: vault.supabase_url,
              serviceRoleKey: "***SUPABASE_SERVICE_KEY***",
            },
          };
        }
      }

      if (mcpServices.filesystem) {
        config.mcpServers["filesystem"] = {
          command: "npx",
          args: ["-y", "@modelcontextprotocol/server-filesystem", matchedRepo ? `./${matchedRepo.name}` : "./"],
        };
      }

      // Add project context as metadata
      const projectMemories = agentMemories.filter(m => m.project === mcpProject);
      if (projectMemories.length > 0) {
        config._launchpad = {
          project: mcpProject,
          generatedAt: new Date().toISOString(),
          memories: projectMemories.map(m => m.content),
          ...(matchedRepo ? { githubRepo: matchedRepo.full_name, defaultBranch: matchedRepo.default_branch } : {}),
          ...(matchedVcProject ? { vercelProject: matchedVcProject.name, framework: matchedVcProject.framework } : {}),
          ...(sbTables.length > 0 ? { supabaseTables: sbTables } : {}),
          scope: {
            readOnly: mcpScope.readOnly,
            timeboxMinutes: mcpScope.timeboxMinutes,
          },
        };
      }

      setMcpGenerated(JSON.stringify(config, null, 2));
      setMcpCopied(false);
    };

    const generateEnvFile = () => {
      let env = `# Launchpad — Generated .env for ${mcpProject}\n# ${new Date().toISOString()}\n\n`;
      if (vault.github) env += `GITHUB_PERSONAL_ACCESS_TOKEN=${vault.github}\n`;
      if (vault.supabase_url) env += `NEXT_PUBLIC_SUPABASE_URL=${vault.supabase_url}\n`;
      if (vault.supabase_anon) env += `NEXT_PUBLIC_SUPABASE_ANON_KEY=${vault.supabase_anon}\n`;
      if (vault.supabase_service) env += `SUPABASE_SERVICE_ROLE_KEY=${vault.supabase_service}\n`;
      if (vault.anthropic) env += `ANTHROPIC_API_KEY=${vault.anthropic}\n`;
      if (vault.vercel) env += `VERCEL_TOKEN=${vault.vercel}\n`;
      if (matchedRepo) env += `GITHUB_REPOSITORY=${matchedRepo.full_name}\n`;
      return env;
    };

    const copyToClipboard = (text, label) => {
      navigator.clipboard?.writeText(text);
      showToast(`${label} copied to clipboard`);
      setMcpCopied(true);
    };

    return (
      <div className="space-y-5" style={{ animation: "fadeSlideUp 0.4s ease" }}>
        <div><h2 className="text-xl font-bold text-white">MCP Config Generator</h2>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Generate MCP server configs for Claude Code. Scoped per project, pre-loaded with credentials.</p></div>

        <div className="grid grid-cols-3 gap-5">
          {/* Left: Config Options */}
          <div className="col-span-1 space-y-4">
            {/* Project */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Project</label>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {projectOptions.map(p => (
                  <button key={p} onClick={() => setMcpProject(p)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition-all"
                    style={{ background: mcpProject === p ? "rgba(0,230,118,0.08)" : "transparent", color: mcpProject === p ? "#00e676" : "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => { if (mcpProject !== p) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                    onMouseLeave={e => { if (mcpProject !== p) e.currentTarget.style.background = "transparent"; }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: mcpProject === p ? "#00e676" : "rgba(255,255,255,0.12)" }}/> {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Format</label>
              {[
                { id: "claude-code", label: "Claude Code", desc: "Local MCP servers via npx" },
                { id: "cursor", label: "Cursor / Generic", desc: "URL-based MCP config" },
              ].map(f => (
                <button key={f.id} onClick={() => setMcpFormat(f.id)} className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left mb-1 transition-all"
                  style={{ background: mcpFormat === f.id ? "rgba(64,196,255,0.08)" : "transparent", border: `1px solid ${mcpFormat === f.id ? "rgba(64,196,255,0.2)" : "transparent"}` }}>
                  <div className="w-3 h-3 rounded-full border-2 flex items-center justify-center" style={{ borderColor: mcpFormat === f.id ? "#40c4ff" : "rgba(255,255,255,0.15)" }}>
                    {mcpFormat === f.id && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#40c4ff" }}/>}
                  </div>
                  <div><div className="text-xs font-medium" style={{ color: mcpFormat === f.id ? "#40c4ff" : "rgba(255,255,255,0.5)" }}>{f.label}</div>
                    <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>{f.desc}</div></div>
                </button>
              ))}
            </div>

            {/* MCP Servers to Include */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Include Servers</label>
              {[
                { k: "github", label: "GitHub", desc: "Repo access, PRs, issues", color: "#8b6cf6", connected: !!vault.github },
                { k: "supabase", label: "Supabase", desc: "Database, tables, RPC", color: "#3ecf8e", connected: !!(vault.supabase_url) },
                { k: "filesystem", label: "Filesystem", desc: "Local file read/write", color: "#ffd740", connected: true },
              ].map(s => (
                <label key={s.k} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-1"
                  onClick={() => setMcpServices(prev => ({ ...prev, [s.k]: !prev[s.k] }))}>
                  <div className="w-4 h-4 rounded flex items-center justify-center" style={{
                    background: mcpServices[s.k] ? s.color : "rgba(255,255,255,0.06)",
                    border: mcpServices[s.k] ? "none" : "1px solid rgba(255,255,255,0.12)"
                  }}>{mcpServices[s.k] && <Icons.Check />}</div>
                  <div className="flex-1"><div className="text-xs font-medium" style={{ color: mcpServices[s.k] ? "white" : "rgba(255,255,255,0.4)" }}>{s.label}</div>
                    <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>{s.desc}</div></div>
                  {!s.connected && <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,215,64,0.1)", color: "#ffd740" }}>no key</span>}
                </label>
              ))}
            </div>

            {/* Scope */}
            <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Scope</label>
              <label className="flex items-center gap-2 p-1.5 cursor-pointer mb-2" onClick={() => setMcpScope(p => ({ ...p, readOnly: !p.readOnly }))}>
                <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: mcpScope.readOnly ? "#ffd740" : "rgba(255,255,255,0.06)", border: mcpScope.readOnly ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                  {mcpScope.readOnly && <Icons.Check />}</div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Read-only mode</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Timebox:</span>
                {[30, 60, 120, 0].map(min => (
                  <button key={min} onClick={() => setMcpScope(p => ({ ...p, timeboxMinutes: min }))}
                    className="px-2 py-1 rounded text-[10px] transition-all"
                    style={{ background: mcpScope.timeboxMinutes === min ? "rgba(64,196,255,0.1)" : "rgba(255,255,255,0.03)", color: mcpScope.timeboxMinutes === min ? "#40c4ff" : "rgba(255,255,255,0.3)" }}>
                    {min === 0 ? "None" : `${min}m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button onClick={generateConfig} className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #00e676, #00c853)", color: "#0a0a0a", boxShadow: "0 0 25px rgba(0,230,118,0.2)" }}>
              <Icons.Zap /> Generate Config
            </button>
          </div>

          {/* Right: Output */}
          <div className="col-span-2 space-y-4">
            {!mcpGenerated ? (
              <div className="rounded-2xl flex flex-col items-center justify-center py-20" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", minHeight: 500 }}>
                <div className="p-4 rounded-3xl mb-4" style={{ background: "rgba(0,230,118,0.06)" }}><Icons.Link /></div>
                <div className="text-sm text-white mb-1">Select a project and generate</div>
                <div className="text-xs max-w-sm text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Your config will include scoped credentials, project-specific MCP servers, and any agent memories from previous sessions. One config file gives Claude Code full context.
                </div>
              </div>
            ) : (
              <>
                {/* Action bar */}
                <div className="flex items-center gap-2">
                  <button onClick={() => copyToClipboard(mcpGenerated, "MCP config")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: mcpCopied ? "rgba(0,230,118,0.12)" : "rgba(64,196,255,0.1)", color: mcpCopied ? "#00e676" : "#40c4ff" }}>
                    {mcpCopied ? <><Icons.Check /> Copied!</> : <><Icons.Copy /> Copy Config</>}
                  </button>
                  <button onClick={() => copyToClipboard(generateEnvFile(), ".env file")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium"
                    style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>
                    <Icons.Download /> Copy .env
                  </button>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Project:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(0,230,118,0.08)", color: "#00e676" }}>{mcpProject}</span>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>{mcpFormat === "claude-code" ? "Claude Code" : "Cursor"}</span>
                  </div>
                </div>

                {/* Code output */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="px-4 py-2 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2">
                      <Icons.Code />
                      <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {mcpFormat === "claude-code" ? "mcp_config.json" : ".cursor/mcp.json"}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>{mcpGenerated.split("\n").length} lines</span>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto" style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.7)", maxHeight: 400, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                    {mcpGenerated}
                  </pre>
                </div>

                {/* Usage instructions */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(64,196,255,0.04)", border: "1px solid rgba(64,196,255,0.12)" }}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#40c4ff" }}>How to use this</h4>
                  {mcpFormat === "claude-code" ? (
                    <div className="space-y-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>1</span> Save as <span className="font-mono" style={{ color: "#40c4ff" }}>~/.claude/mcp_config.json</span></div>
                      <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>2</span> Run <span className="font-mono" style={{ color: "#40c4ff" }}>claude</span> in your project directory</div>
                      <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>3</span> Claude Code now has scoped access to {Object.entries(mcpServices).filter(([,v])=>v).map(([k])=>k).join(", ")}</div>
                      {agentMemories.filter(m => m.project === mcpProject).length > 0 && (
                        <div className="flex gap-2 mt-1 p-2 rounded-lg" style={{ background: "rgba(139,108,246,0.06)" }}>
                          <Icons.Brain />
                          <span style={{ color: "#8b6cf6" }}>{agentMemories.filter(m => m.project === mcpProject).length} project memories embedded in _launchpad metadata</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                      <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>1</span> Save as <span className="font-mono" style={{ color: "#40c4ff" }}>.cursor/mcp.json</span> in your project root</div>
                      <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>2</span> Replace <span className="font-mono" style={{ color: "#ffd740" }}>***TOKEN***</span> placeholders with real values (or use .env)</div>
                      <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>3</span> Cursor will auto-detect MCP servers on next session</div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ─── DOMAINS PANEL ───
  const DomainsView = () => {
    const [domainQuery, setDomainQuery] = useState("");
    const [domainResults, setDomainResults] = useState([]);
    const [domainSearching, setDomainSearching] = useState(false);
    const [domainError, setDomainError] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [vcDomainList, setVcDomainList] = useState([]);
    const [loadingVcDomains, setLoadingVcDomains] = useState(false);
    const [connectingDomain, setConnectingDomain] = useState(null);
    const [connectProject, setConnectProject] = useState("");

    // Fetch user's Vercel domains on mount
    useEffect(() => {
      if (vault.vercel) {
        setLoadingVcDomains(true);
        fetch("https://api.vercel.com/v5/domains", { headers: { Authorization: `Bearer ${vault.vercel}` } })
          .then(r => r.ok ? r.json() : Promise.reject("Failed"))
          .then(data => setVcDomainList(data.domains || []))
          .catch(() => {})
          .finally(() => setLoadingVcDomains(false));
      }
    }, [vault.vercel]);

    const searchDomains = async () => {
      if (!domainQuery.trim()) return;
      setDomainSearching(true); setDomainError(null); setDomainResults([]);
      try {
        // Clean the query — strip protocols, www, trailing slashes
        let q = domainQuery.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");

        // If user typed just a word (no dot), generate suggestions across TLDs
        const hasDot = q.includes(".");
        const baseName = hasDot ? q.split(".")[0] : q;

        const tlds = [".com", ".dev", ".sh", ".io", ".co", ".app", ".build", ".tools", ".so", ".ai"];
        const candidates = hasDot ? [q] : tlds.map(tld => baseName + tld);

        // Check availability via Vercel's domain check (if connected) or generate smart results
        const results = [];
        for (const domain of candidates) {
          let available = null;
          let price = null;

          // Try Vercel domain check API
          if (vault.vercel) {
            try {
              const res = await fetch(`https://api.vercel.com/v4/domains/status?name=${domain}`, {
                headers: { Authorization: `Bearer ${vault.vercel}` },
              });
              if (res.ok) {
                const data = await res.json();
                available = data.available;
              }
            } catch {}
          }

          // Estimate price based on TLD
          const tld = "." + domain.split(".").slice(1).join(".");
          const priceMap = { ".com": 10, ".dev": 13, ".sh": 12, ".io": 35, ".co": 12, ".app": 14, ".build": 20, ".tools": 25, ".so": 10, ".ai": 30 };
          price = priceMap[tld] || 15;

          results.push({ domain, available, price, tld });
        }

        setDomainResults(results);
      } catch(e) { setDomainError(e.message); }
      setDomainSearching(false);
    };

    const connectDomainToVercel = async (domain) => {
      if (!vault.vercel || !connectProject) return;
      setConnectingDomain(domain);
      try {
        // Add domain to Vercel project
        const proj = vcProjects.find(p => p.name === connectProject);
        if (!proj) throw new Error("Select a project first");

        const res = await fetch(`https://api.vercel.com/v10/projects/${proj.id}/domains`, {
          method: "POST",
          headers: { Authorization: `Bearer ${vault.vercel}`, "Content-Type": "application/json" },
          body: JSON.stringify({ name: domain }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || "Failed to add domain");
        }

        const data = await res.json();
        showToast(`${domain} added to ${connectProject}!`);
        setSelectedDomain({ ...selectedDomain, connected: true, vercelConfig: data });
      } catch(e) { showToast(e.message, "error"); }
      setConnectingDomain(null);
    };

    const availColor = (a) => a === true ? "#00e676" : a === false ? "#ff5252" : "rgba(255,255,255,0.3)";
    const availLabel = (a) => a === true ? "Available" : a === false ? "Taken" : "Check";

    return (
      <div className="space-y-5" style={{ animation: "fadeSlideUp 0.4s ease" }}>
        <div><h2 className="text-xl font-bold text-white">Domains</h2>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Search, check availability, buy, and connect to Vercel — all without leaving Launchpad.</p></div>

        {/* Search */}
        <div className="flex gap-3">
          <input value={domainQuery} onChange={e => setDomainQuery(e.target.value)} placeholder="Search for a domain... (e.g. myproject or myproject.com)"
            onKeyDown={e => { if (e.key === "Enter") searchDomains(); }}
            className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            onFocus={e => e.target.style.borderColor = "rgba(0,230,118,0.4)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}/>
          <button onClick={searchDomains} disabled={domainSearching || !domainQuery.trim()}
            className="px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
            style={{ background: domainQuery.trim() ? "linear-gradient(135deg, #00e676, #00c853)" : "rgba(255,255,255,0.05)", color: domainQuery.trim() ? "#0a0a0a" : "rgba(255,255,255,0.2)" }}>
            {domainSearching ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }}/> Searching...</> : <><Icons.Globe /> Search</>}
          </button>
        </div>

        {domainError && <div className="p-3 rounded-xl text-xs" style={{ background: "rgba(255,82,82,0.08)", color: "#ff5252" }}>{domainError}</div>}

        {/* Results */}
        {domainResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Results</h3>
            {domainResults.map((r, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl transition-all"
                style={{ background: selectedDomain?.domain === r.domain ? "rgba(0,230,118,0.04)" : "rgba(255,255,255,0.015)", border: `1px solid ${selectedDomain?.domain === r.domain ? "rgba(0,230,118,0.15)" : "rgba(255,255,255,0.04)"}`, animation: `fadeSlideUp 0.3s ease ${i * 50}ms forwards` }}
                onMouseEnter={e => e.currentTarget.style.background = r.available !== false ? "rgba(0,230,118,0.03)" : "rgba(255,82,82,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = selectedDomain?.domain === r.domain ? "rgba(0,230,118,0.04)" : "rgba(255,255,255,0.015)"}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: availColor(r.available) }}/>
                <div className="flex-1">
                  <span className="text-sm font-medium font-mono text-white">{r.domain}</span>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${availColor(r.available)}15`, color: availColor(r.available) }}>
                  {availLabel(r.available)}
                </span>
                <span className="text-sm font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>~${r.price}/yr</span>
                <div className="flex gap-2">
                  {r.available !== false && (
                    <a href={`https://www.namecheap.com/domains/registration/results/?domain=${r.domain}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{ background: "linear-gradient(135deg, #00e676, #00c853)", color: "#0a0a0a" }}>
                      Buy <Icons.ExternalLink />
                    </a>
                  )}
                  <button onClick={() => setSelectedDomain(r)} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Domain Detail / Connect to Vercel */}
        {selectedDomain && (
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", animation: "fadeSlideUp 0.3s ease" }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-mono text-white">{selectedDomain.domain}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: availColor(selectedDomain.available) }}/>
                  <span className="text-xs" style={{ color: availColor(selectedDomain.available) }}>{availLabel(selectedDomain.available)}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>~${selectedDomain.price}/yr on Namecheap</span>
                </div>
              </div>
              <button onClick={() => setSelectedDomain(null)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}><Icons.X /></button>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-3">
              <a href={`https://www.namecheap.com/domains/registration/results/?domain=${selectedDomain.domain}`} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all text-center"
                style={{ background: "rgba(0,230,118,0.06)", border: "1px solid rgba(0,230,118,0.15)" }}>
                <div className="p-2 rounded-xl" style={{ background: "rgba(0,230,118,0.15)", color: "#00e676" }}><Icons.DollarSign /></div>
                <span className="text-xs font-medium text-white">Buy on Namecheap</span>
              </a>
              <a href={`https://www.godaddy.com/domainsearch/find?domainToCheck=${selectedDomain.domain}`} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all text-center"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}><Icons.Globe /></div>
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Check GoDaddy</span>
              </a>
              <a href={`https://domains.google.com/registrar/search?searchTerm=${selectedDomain.domain}`} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all text-center"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}><Icons.Globe /></div>
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Google Domains</span>
              </a>
            </div>

            {/* Connect to Vercel */}
            {vault.vercel && vcProjects.length > 0 && (
              <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Connect to Vercel Project</h4>
                <p className="text-[11px] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>Already own this domain? Connect it to a Vercel project and we handle the DNS config for you.</p>
                <div className="flex gap-2">
                  <select value={connectProject} onChange={e => setConnectProject(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl text-xs text-white outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", appearance: "none" }}>
                    <option value="" style={{ background: "#151518" }}>Select a project...</option>
                    {vcProjects.map(p => <option key={p.id} value={p.name} style={{ background: "#151518" }}>{p.name}</option>)}
                  </select>
                  <button onClick={() => connectDomainToVercel(selectedDomain.domain)} disabled={!connectProject || connectingDomain}
                    className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
                    style={{ background: connectProject ? "linear-gradient(135deg, #fff, #ccc)" : "rgba(255,255,255,0.05)", color: connectProject ? "#0a0a0a" : "rgba(255,255,255,0.2)" }}>
                    {connectingDomain ? <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full" style={{ animation: "spin 0.8s linear infinite" }}/> : <Icons.Link />} Connect
                  </button>
                </div>
                {selectedDomain.connected && (
                  <div className="flex items-center gap-2 mt-3 p-2 rounded-lg" style={{ background: "rgba(0,230,118,0.06)" }}>
                    <PulseDot color="#00e676" size={6} />
                    <span className="text-xs" style={{ color: "#00e676" }}>Domain added to {connectProject}! Configure your DNS nameservers to point to Vercel.</span>
                  </div>
                )}
              </div>
            )}

            {/* DNS instructions */}
            <div className="rounded-xl p-4" style={{ background: "rgba(64,196,255,0.04)", border: "1px solid rgba(64,196,255,0.1)" }}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#40c4ff" }}>DNS Setup Guide</h4>
              <div className="space-y-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>1</span> Buy the domain on your preferred registrar</div>
                <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>2</span> Use Connect above to add it to your Vercel project</div>
                <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>3</span> Set nameservers to <span className="font-mono" style={{ color: "#40c4ff" }}>ns1.vercel-dns.com</span> and <span className="font-mono" style={{ color: "#40c4ff" }}>ns2.vercel-dns.com</span></div>
                <div className="flex gap-2"><span className="font-mono px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(255,255,255,0.06)", color: "#40c4ff" }}>4</span> SSL auto-provisions. Live in ~10 minutes.</div>
              </div>
            </div>
          </div>
        )}

        {/* Your Vercel Domains */}
        {vault.vercel && vcDomainList.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Your Vercel Domains</h3>
            {vcDomainList.map((d, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl transition-all"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.015)"}>
                <div className="w-2 h-2 rounded-full" style={{ background: d.verified !== false ? "#00e676" : "#ffd740" }}/>
                <div className="flex-1">
                  <a href={`https://${d.name}`} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-white hover:underline">{d.name}</a>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: d.verified !== false ? "rgba(0,230,118,0.1)" : "rgba(255,215,64,0.1)", color: d.verified !== false ? "#00e676" : "#ffd740" }}>
                  {d.verified !== false ? "verified" : "pending"}
                </span>
                {d.expiresAt && <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Expires {new Date(d.expiresAt).toLocaleDateString()}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Empty state for no results yet */}
        {domainResults.length === 0 && !domainSearching && (
          <div className="flex flex-col items-center justify-center py-16" style={{ color: "rgba(255,255,255,0.1)" }}>
            <Icons.Globe /><div className="mt-3 text-sm text-white" style={{ color: "rgba(255,255,255,0.2)" }}>Search for a domain to get started</div>
            <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.12)" }}>Type a name like myproject — we check availability across .com, .dev, .sh, .io and more</div>
          </div>
        )}
      </div>
    );
  };

  // ─── PLACEHOLDER ───
  const PlaceholderView = ({ serviceId }) => {
    const names = { vercel: "Vercel", supabase: "Supabase", claude: "Claude", dashboard: "Dashboard", agent: "Agent Bay", vault: "Vault" };
    const icons = { vercel: <Icons.Vercel />, supabase: <Icons.Supabase />, claude: <Icons.Claude />, dashboard: <Icons.Activity />, agent: <Icons.Agent />, vault: <Icons.Shield /> };
    const c = serviceColors[serviceId] || { bg: "rgba(255,255,255,0.06)", text: "#fff", border: "rgba(255,255,255,0.2)" };
    return (
      <div className="flex flex-col items-center justify-center py-20" style={{ animation: "fadeSlideUp 0.5s ease" }}>
        <div className="p-5 rounded-3xl mb-6" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>{icons[serviceId] || <Icons.Globe />}</div>
        <h2 className="text-xl font-bold text-white mb-2">{names[serviceId] || serviceId}</h2>
        <p className="text-sm mb-6 max-w-md text-center" style={{ color: "rgba(255,255,255,0.4)" }}>{isConnected(serviceId) ? "Connected! This panel is next in the build queue." : "Add your API key to unlock this integration."}</p>
        {!isConnected(serviceId) ? (
          <button onClick={() => setShowSetup(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm" style={{ background: `linear-gradient(135deg, ${c.text}, ${c.text}cc)`, color: "#0a0a0a" }}><Icons.Key /> Connect</button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(0,230,118,0.08)", border: "1px solid rgba(0,230,118,0.15)" }}><PulseDot color="#00e676" size={6} /><span className="text-xs font-medium" style={{ color: "#00e676" }}>Connected — wiring next</span></div>
        )}
      </div>
    );
  };

  const renderView = () => { if (activeView === "dashboard") return <DashboardView />; if (activeView === "github") return <GitHubView />; if (activeView === "vercel") return <VercelView />; if (activeView === "claude") return <ClaudeView />; if (activeView === "supabase") return <SupabaseView />; if (activeView === "agent") return <AgentView />; if (activeView === "mcp") return <MCPView />; if (activeView === "domains") return <DomainsView />; return <PlaceholderView serviceId={activeView} />; };

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#09090b", fontFamily: "'DM Sans', -apple-system, sans-serif", color: "rgba(255,255,255,0.7)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        .sidebar-glow { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, rgba(0,230,118,0.03) 0%, transparent 30%, transparent 70%, rgba(139,108,246,0.03) 100%); pointer-events: none; }
      `}</style>

      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showSetup && <SetupDrawer />}

      {/* SIDEBAR */}
      <div className="relative flex flex-col h-full" style={{ width: 240, background: "rgba(255,255,255,0.015)", borderRight: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div className="sidebar-glow" />
        <div className="flex items-center px-4 py-4 relative z-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <img src="/launchpad-logo-dark.svg" alt="Launchpad" className="h-12 sm:h-14 w-auto max-w-full object-contain object-left" />
        </div>
        <nav className="flex-1 px-3 py-3 space-y-1 relative z-10 overflow-y-auto">
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button key={item.id} onClick={() => setActiveView(item.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative"
                style={{ background: isActive ? "rgba(0,230,118,0.08)" : "transparent", color: isActive ? "#00e676" : "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full" style={{ background: "#00e676" }}/>}
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                {["github","vercel","supabase","claude"].includes(item.id) && <div className="w-1.5 h-1.5 rounded-full" style={{ background: isConnected(item.id) ? "#00e676" : "rgba(255,255,255,0.12)" }}/>}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-3 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => setShowSetup(true)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.35)" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Icons.Settings /><span className="text-sm">Settings</span>
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white">{navItems.find(n => n.id === activeView)?.label || activeView}</h1>
            <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }}/>
            <div className="flex items-center gap-2">
              {Object.keys(vault).filter(k => vault[k]).map(k => <div key={k} className="w-1.5 h-1.5 rounded-full" title={k} style={{ background: serviceColors[k]?.text || "#00e676" }}/>)}
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{Object.values(vault).filter(Boolean).length} connected</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {Object.values(vault).filter(Boolean).length === 0 ? (
              <button onClick={() => setShowSetup(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "rgba(255,215,64,0.1)", color: "#ffd740", border: "1px solid rgba(255,215,64,0.2)" }}>
                <Icons.Key /> Get Started — Add Your First Key
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(0,230,118,0.08)", border: "1px solid rgba(0,230,118,0.15)" }}>
                <PulseDot color="#00e676" size={6} /><span className="text-xs font-medium" style={{ color: "#00e676" }}>Systems Online</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8">{renderView()}</div>
      </div>
    </div>
  );
}
