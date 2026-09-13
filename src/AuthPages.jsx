import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, ExternalLink, KeyRound, LogOut, Mail, Pencil, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { authConfigured, supabase } from "./authClient";
import { calculate, FORMULA_ENGINE_VERSION } from "./engine";
import { industries } from "./industries";

const authMeta = {
  "/login": ["Log in to MyBreakeven", "Access your private MyBreakeven planning workspace."],
  "/signup": ["Create a MyBreakeven account", "Create an optional account for saved business planning scenarios and reports."],
  "/forgot-password": ["Reset your MyBreakeven password", "Request a secure password-reset link for your MyBreakeven account."],
  "/reset-password": ["Choose a new MyBreakeven password", "Securely update your MyBreakeven account password."],
  "/dashboard": ["Your MyBreakeven dashboard", "Manage your private MyBreakeven account and planning workspace."],
};

function usePrivatePageMeta(path) {
  useEffect(() => {
    const [title, description] = authMeta[path] || authMeta["/login"];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex,nofollow");
    document.querySelector('meta[name="googlebot"]')?.setAttribute("content", "noindex,nofollow");
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://mybreakeven.com${path}/`);
  }, [path]);
}

const SetupNotice = () => (
  <div className="auth-notice" role="status">
    <ShieldCheck />
    <div><strong>Secure accounts are being connected</strong><p>The calculator remains free and private without an account. Account access will open after secure email service configuration is complete.</p></div>
  </div>
);

export function AuthPage({ path }) {
  usePrivatePageMeta(path);
  const mode = path === "/signup" ? "signup" : path === "/forgot-password" ? "forgot" : path === "/reset-password" ? "reset" : "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });

  const submit = async (event) => {
    event.preventDefault();
    if (!supabase) return;
    if ((mode === "signup" || mode === "reset") && password.length < 8) {
      return setStatus({ loading: false, error: "Use at least 8 characters for your password.", message: "" });
    }
    if ((mode === "signup" || mode === "reset") && password !== confirmPassword) {
      return setStatus({ loading: false, error: "The passwords do not match.", message: "" });
    }
    setStatus({ loading: true, error: "", message: "" });
    let result;
    if (mode === "signup") {
      result = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard/` } });
    } else if (mode === "forgot") {
      result = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password/` });
    } else if (mode === "reset") {
      result = await supabase.auth.updateUser({ password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }
    if (result.error) return setStatus({ loading: false, error: result.error.message, message: "" });
    if (mode === "login" || mode === "reset") window.location.assign("/dashboard/");
    else setStatus({ loading: false, error: "", message: mode === "signup" ? "Check your email to verify your account." : "If an account exists, a secure reset link has been sent." });
  };

  const copy = {
    login: ["WELCOME BACK", "Log in to your planning workspace", "Use the email address connected to your MyBreakeven account."],
    signup: ["OPTIONAL ACCOUNT", "Save your planning work securely", "The free calculator never requires registration. Create an account only when you want private saved scenarios."],
    forgot: ["ACCOUNT RECOVERY", "Reset your password securely", "Enter your account email and we will send a time-limited reset link."],
    reset: ["SECURE PASSWORD", "Choose a new password", "Use a unique password with at least eight characters."],
  }[mode];

  return <section className="auth-page">
    <div className="auth-copy"><span>{copy[0]}</span><h1>{copy[1]}</h1><p>{copy[2]}</p><ul><li><ShieldCheck /> Email verification</li><li><KeyRound /> Secure session handling</li><li><CheckCircle2 /> Your records stay separated by account</li></ul></div>
    <div className="auth-card">
      {!authConfigured ? <SetupNotice /> : <form onSubmit={submit}>
        {mode !== "reset" && <label>Email address<div className="auth-control"><Mail /><input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></div></label>}
        {mode !== "forgot" && <label>{mode === "reset" ? "New password" : "Password"}<div className="auth-control"><KeyRound /><input type="password" minLength="8" autoComplete={mode === "login" ? "current-password" : "new-password"} required value={password} onChange={e => setPassword(e.target.value)} /></div></label>}
        {(mode === "signup" || mode === "reset") && <label>Confirm password<div className="auth-control"><KeyRound /><input type="password" minLength="8" autoComplete="new-password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></div></label>}
        {status.error && <p className="auth-error" role="alert">{status.error}</p>}
        {status.message && <p className="auth-success" role="status">{status.message}</p>}
        <button className="page-button" disabled={status.loading}>{status.loading ? "Please wait…" : mode === "signup" ? "Create free account" : mode === "forgot" ? "Send reset link" : mode === "reset" ? "Update password" : "Log in"}</button>
      </form>}
      {mode === "login" && <p className="auth-switch"><a href="/forgot-password/">Forgot password?</a><br />New to MyBreakeven? <a href="/signup/">Create an optional account</a></p>}
      {mode === "signup" && <p className="auth-switch">Already have an account? <a href="/login/">Log in</a></p>}
      {(mode === "forgot" || mode === "reset") && <p className="auth-switch"><a href="/login/">Return to login</a></p>}
    </div>
  </section>;
}

export function DashboardPage() {
  usePrivatePageMeta("/dashboard");
  const [state, setState] = useState({ loading: true, user: null, scenarios: [], error: "" });
  const [selected, setSelected] = useState([]);
  const loadScenarios = async (user) => {
    const { data, error } = await supabase.from("saved_scenarios").select("id,name,industry_key,currency,inputs,engine_version,created_at,updated_at").eq("user_id", user.id).order("updated_at", { ascending: false });
    setState({ loading: false, user, scenarios: data || [], error: error?.message || "" });
  };
  useEffect(() => {
    if (!supabase) return setState({ loading: false, user: null });
    supabase.auth.getSession().then(({ data }) => data.session?.user ? loadScenarios(data.session.user) : setState({ loading: false, user: null, scenarios: [], error: "" }));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) setState({ loading: false, user: null, scenarios: [], error: "" });
    });
    return () => data.subscription.unsubscribe();
  }, []);
  const calculated = useMemo(() => state.scenarios.map(item => ({ ...item, result: calculate(item.inputs) })), [state.scenarios]);
  if (!authConfigured) return <section className="dashboard-page"><SetupNotice /></section>;
  if (state.loading) return <section className="dashboard-page"><p>Loading your secure workspace…</p></section>;
  if (!state.user) return <section className="dashboard-page"><div className="auth-card"><UserRound /><h1>Log in to access your workspace</h1><p>Your private saved scenarios will appear here.</p><a className="page-button" href="/login/">Log in</a></div></section>;
  const logout = async () => { await supabase.auth.signOut(); window.location.assign("/"); };
  const remove = async (id) => {
    if (!window.confirm("Delete this saved scenario? This cannot be undone.")) return;
    const { error } = await supabase.from("saved_scenarios").delete().eq("id", id);
    if (error) return setState(current => ({ ...current, error: error.message }));
    setSelected(current => current.filter(value => value !== id));
    setState(current => ({ ...current, scenarios: current.scenarios.filter(item => item.id !== id), error: "" }));
  };
  const rename = async (item) => {
    const name = window.prompt("Rename scenario", item.name)?.trim();
    if (!name || name === item.name || name.length > 80) return;
    const { error } = await supabase.from("saved_scenarios").update({ name, updated_at: new Date().toISOString() }).eq("id", item.id);
    if (error) return setState(current => ({ ...current, error: error.message }));
    setState(current => ({ ...current, scenarios: current.scenarios.map(row => row.id === item.id ? { ...row, name, updated_at: new Date().toISOString() } : row), error: "" }));
  };
  const toggle = (id) => setSelected(current => current.includes(id) ? current.filter(value => value !== id) : current.length < 3 ? [...current, id] : current);
  const compared = calculated.filter(item => selected.includes(item.id));
  const exportSaved = () => {
    const rows = [["Scenario","Business","Currency","Break-even revenue","Exact units","Whole units","Capacity","Inquiries","Score","Engine"], ...calculated.map(item => [item.name, industries[item.industry_key]?.name, item.currency, item.result.revenue, item.result.jobs, item.result.wholeJobs, item.result.capacity, item.result.leads, item.result.score, item.engine_version])];
    const blob = new Blob([rows.map(row => row.map(value => `"${String(value ?? "").replaceAll('"','""')}"`).join(",")).join("\n")], { type: "text/csv" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "mybreakeven-saved-scenarios.csv"; link.click(); URL.revokeObjectURL(link.href);
  };
  return <section className="dashboard-page">
    <div className="dashboard-heading"><div><span>PRIVATE WORKSPACE</span><h1>Your MyBreakeven dashboard</h1><p>Signed in as {state.user.email}</p></div><button className="page-button secondary" onClick={logout}><LogOut /> Log out</button></div>
    {state.error && <p className="auth-error" role="alert">{state.error}</p>}
    {!calculated.length ? <div className="dashboard-empty"><ShieldCheck /><h2>No saved scenarios yet</h2><p>Open the calculator, enter your assumptions and choose Save scenario. Only your authenticated account can access saved records.</p><a className="page-button" href="/#calculator">Create your first scenario</a></div> : <>
      <div className="saved-toolbar"><p><strong>{calculated.length}</strong> saved scenario{calculated.length === 1 ? "" : "s"} · Select up to 3 to compare</p><button onClick={exportSaved}><Download /> Export all CSV</button></div>
      <div className="saved-grid">{calculated.map(item => <article className={selected.includes(item.id) ? "selected" : ""} key={item.id}><label className="compare-check"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} disabled={!selected.includes(item.id) && selected.length >= 3} /> Compare</label><small>{industries[item.industry_key]?.name} · {item.currency}</small><h2>{item.name}</h2><strong>{item.result.valid ? new Intl.NumberFormat("en-US",{style:"currency",currency:item.currency}).format(item.result.revenue) : "Review inputs"}</strong><p>{item.result.valid ? `${item.result.jobs.toFixed(2)} ${industries[item.industry_key]?.unit} · ${item.result.score}/100 feasibility` : item.result.message}</p><time dateTime={item.updated_at}>Updated {new Date(item.updated_at).toLocaleDateString("en-US")}</time><div><a href={`/?scenario=${item.id}#calculator`}><ExternalLink /> Open</a><button onClick={() => rename(item)}><Pencil /> Rename</button><button className="danger" onClick={() => remove(item.id)}><Trash2 /> Delete</button></div></article>)}</div>
      {compared.length >= 2 && <div className="saved-comparison"><h2>Scenario comparison</h2><div className="scenario-table"><div className="scenario-row heading"><span>Scenario</span><span>Revenue</span><span>Exact units</span><span>Capacity</span><span>Score</span></div>{compared.map(item => <div className="scenario-row" key={item.id}><strong>{item.name}</strong><span>{new Intl.NumberFormat("en-US",{style:"currency",currency:item.currency}).format(item.result.revenue)}</span><span>{item.result.jobs.toFixed(2)}</span><span>{item.result.capacity.toFixed(2)}</span><span>{item.result.score}/100</span></div>)}</div></div>}
      <p className="dashboard-version">Results recalculate with formula engine {FORMULA_ENGINE_VERSION}; original save version is retained for auditability.</p>
    </>}
  </section>;
}
