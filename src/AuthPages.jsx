import "./pro-dashboard-entry.css";
import React, { useEffect, useMemo, useState } from "react";
import { Activity, CheckCircle2, CreditCard, Download, ExternalLink, Eye, EyeOff, KeyRound, LogOut, Mail, Pencil, Search, ShieldCheck, SlidersHorizontal, Trash2, UserRound } from "lucide-react";
import { authConfigured, supabase } from "./authClient";
import { calculate, FORMULA_ENGINE_VERSION } from "./engine";
import { industries } from "./industries";
import { limitsFor, normalizePlan } from "./entitlements";
import { friendlyAuthError, withTimeout } from "./authSecurity";
import AccountControls from "./AccountControls";
import { POLAR_CUSTOMER_PORTAL_URL } from "./billing";
import { compareScenarioCostDrift, filterScenarioPortfolio, summarizeScenarioPortfolio } from "./scenarioPortfolio";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });
  const [resetReady, setResetReady] = useState(mode !== "reset");

  useEffect(() => {
    if (mode !== "reset" || !supabase) return;
    let active = true;
    withTimeout(supabase.auth.getSession()).then(({ data, error }) => {
      if (!active) return;
      if (error || !data.session) setStatus({ loading: false, error: "This secure link has expired or is invalid. Request a new password-reset link.", message: "" });
      else setResetReady(true);
    }).catch(error => active && setStatus({ loading: false, error: friendlyAuthError(error), message: "" }));
    return () => { active = false; };
  }, [mode]);

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
    try {
      let result;
      if (mode === "signup") result = await withTimeout(supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard/` } }));
      else if (mode === "forgot") result = await withTimeout(supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password/` }));
      else if (mode === "reset") result = await withTimeout(supabase.auth.updateUser({ password }));
      else result = await withTimeout(supabase.auth.signInWithPassword({ email, password }));
      if (result.error) return setStatus({ loading: false, error: friendlyAuthError(result.error, "We could not complete that request. Please check your details and try again."), message: "" });
      if (mode === "login" || mode === "reset") window.location.assign("/dashboard/");
      else setStatus({ loading: false, error: "", message: mode === "signup" ? "Check your email to verify your account." : "If an account exists, a secure reset link has been sent." });
    } catch (error) {
      setStatus({ loading: false, error: friendlyAuthError(error), message: "" });
    }
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
      <div className="auth-card-heading">
        <span>{mode === "signup" ? "START FREE" : mode === "login" ? "YOUR ACCOUNT" : "ACCOUNT SECURITY"}</span>
        <h2>{mode === "signup" ? "Create your account" : mode === "login" ? "Welcome back" : mode === "forgot" ? "Recover your account" : "Set a new password"}</h2>
        <p>{mode === "signup" ? "No card required. Verify your email to activate your private workspace." : mode === "login" ? "Enter your details to continue to your dashboard." : mode === "forgot" ? "We will email you a secure password-reset link." : "Choose a secure password you do not use elsewhere."}</p>
      </div>
      {!authConfigured ? <SetupNotice /> : <form onSubmit={submit} aria-busy={status.loading}>
        {mode !== "reset" && <label>Email address<div className="auth-control"><Mail /><input type="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} /></div></label>}
        {mode !== "forgot" && <label>{mode === "reset" ? "New password" : "Password"}<div className="auth-control"><KeyRound /><input type={showPassword ? "text" : "password"} minLength="8" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 8 characters" required value={password} onChange={e => setPassword(e.target.value)} /><button className="password-toggle" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>{showPassword ? <EyeOff /> : <Eye />}</button></div>{mode !== "login" && <small className="password-hint"><ShieldCheck /> Use 8 or more characters.</small>}</label>}
        {(mode === "signup" || mode === "reset") && <label>Confirm password<div className="auth-control"><KeyRound /><input type={showConfirmPassword ? "text" : "password"} minLength="8" autoComplete="new-password" placeholder="Enter the same password again" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /><button className="password-toggle" type="button" onClick={() => setShowConfirmPassword(value => !value)} aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"} aria-pressed={showConfirmPassword}>{showConfirmPassword ? <EyeOff /> : <Eye />}</button></div></label>}
        {status.error && <p className="auth-error" role="alert">{status.error}</p>}
        {status.message && <p className="auth-success" role="status">{status.message}</p>}
        <button className="page-button" disabled={status.loading || !resetReady}>{status.loading ? "Please wait…" : mode === "signup" ? "Create free account" : mode === "forgot" ? "Send reset link" : mode === "reset" ? resetReady ? "Update password" : "Validating secure link…" : "Log in"}</button>
      </form>}
      {mode === "login" && <p className="auth-switch"><a href="/forgot-password/">Forgot password?</a><br />New to MyBreakeven? <a href="/signup/">Create an optional account</a></p>}
      {mode === "signup" && <p className="auth-switch">Already have an account? <a href="/login/">Log in</a></p>}
      {(mode === "forgot" || mode === "reset") && <p className="auth-switch"><a href="/login/">Return to login</a></p>}
    </div>
  </section>;
}

export function DashboardPage() {
  usePrivatePageMeta("/dashboard");
  const [state, setState] = useState({ loading: true, user: null, scenarios: [], plan: "free", displayName: "", error: "" });
  const [selected, setSelected] = useState([]);
  const [actionId, setActionId] = useState("");
  const [filters, setFilters] = useState({ query: "", industry: "all", currency: "all", sort: "updated" });
  const loadScenarios = async (user) => {
    const queryScenarios = () => supabase.from("saved_scenarios").select("id,name,industry_key,currency,inputs,engine_version,created_at,updated_at").eq("user_id", user.id).order("updated_at", { ascending: false });
    let [{ data, error }, { data: profile }] = await Promise.all([
      queryScenarios(),
      supabase.from("profiles").select("display_name,plan,subscription_status,current_period_end").eq("id", user.id).maybeSingle(),
    ]);
    if (error) {
      await new Promise(resolve => setTimeout(resolve, 500));
      ({ data, error } = await queryScenarios());
    }
    setState({ loading: false, user, scenarios: data || [], plan: normalizePlan(profile?.plan), displayName: profile?.display_name || "", subscriptionStatus: profile?.subscription_status || "inactive", currentPeriodEnd: profile?.current_period_end || null, error: error ? friendlyAuthError(error, "Your saved scenarios could not be loaded. Please refresh and try again.") : "" });
  };
  useEffect(() => {
    if (!supabase) return setState({ loading: false, user: null });
    let active = true;
    withTimeout(supabase.auth.getSession()).then(({ data, error }) => {
      if (!active) return;
      if (error) throw error;
      return data.session?.user ? loadScenarios(data.session.user) : setState({ loading: false, user: null, scenarios: [], plan: "free", error: "" });
    }).catch(error => active && setState({ loading: false, user: null, scenarios: [], plan: "free", error: friendlyAuthError(error) }));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) setState({ loading: false, user: null, scenarios: [], plan: "free", error: "" });
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  const calculated = useMemo(() => state.scenarios.map(item => ({ ...item, result: calculate(item.inputs) })), [state.scenarios]);
  const filteredScenarios = useMemo(() => filterScenarioPortfolio(calculated, filters), [calculated, filters]);
  const portfolio = useMemo(() => summarizeScenarioPortfolio(filteredScenarios), [filteredScenarios]);
  const compared = calculated.filter(item => selected.includes(item.id));
  const driftComparison = useMemo(() => compareScenarioCostDrift(compared), [compared]);
  const availableIndustries = [...new Set(calculated.map(item => item.industry_key))];
  const availableCurrencies = [...new Set(calculated.map(item => item.currency))];
  const portfolioCurrency = filters.currency !== "all" ? filters.currency : availableCurrencies.length === 1 ? availableCurrencies[0] : null;
  const limits = limitsFor(state.plan);
  const isPro = state.plan === "pro";
  if (!authConfigured) return <section className="dashboard-page"><SetupNotice /></section>;
  if (state.loading) return <section className="dashboard-page"><p>Loading your secure workspace…</p></section>;
  if (!state.user) return <section className="dashboard-page"><div className="auth-card"><UserRound /><h1>Log in to access your workspace</h1><p>Your private saved scenarios will appear here.</p><a className="page-button" href="/login/">Log in</a></div></section>;
  const logout = async () => { setActionId("logout"); const { error } = await supabase.auth.signOut(); if (error) { setActionId(""); setState(current => ({ ...current, error: friendlyAuthError(error, "We could not log you out. Please try again.") })); } else window.location.assign("/"); };
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
  const toggle = (id) => {
    if (!isPro) return;
    setSelected(current => current.includes(id) ? current.filter(value => value !== id) : current.length < limits.comparisons ? [...current, id] : current);
  };
  const updateFilter = (key, value) => setFilters(current => ({ ...current, [key]: value }));
  const delta = value => value === null ? "n/a" : `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
  const exportSaved = () => {
    const rows = [["Scenario","Business","Currency","Break-even revenue","Exact units","Whole units","Capacity","Inquiries","Score","Engine"], ...calculated.map(item => [item.name, industries[item.industry_key]?.name, item.currency, item.result.revenue, item.result.jobs, item.result.wholeJobs, item.result.capacity, item.result.leads, item.result.score, item.engine_version])];
    const blob = new Blob([rows.map(row => row.map(value => `"${String(value ?? "").replaceAll('"','""')}"`).join(",")).join("\n")], { type: "text/csv" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "mybreakeven-saved-scenarios.csv"; link.click(); URL.revokeObjectURL(link.href);
  };
  return <section className="dashboard-page">
    <div className="dashboard-heading"><div><span>PRIVATE WORKSPACE</span><h1>Your MyBreakeven dashboard</h1>{state.displayName && <p className="dashboard-welcome">Welcome, <strong>{state.displayName}</strong></p>}<p>Signed in as {state.user.email}</p><div className="dashboard-plan-row"><div className={`plan-badge ${state.plan}`}>{state.plan === "pro" ? "PRO PLAN" : `FREE PLAN · ${calculated.length}/${limits.savedScenarios} SAVES`}</div>{isPro && <a className="manage-subscription" href={POLAR_CUSTOMER_PORTAL_URL}><CreditCard /> Manage subscription</a>}</div></div><button className="page-button secondary" onClick={logout} disabled={actionId === "logout"}><LogOut /> {actionId === "logout" ? "Logging out…" : "Log out"}</button></div>
    {isPro && <section className="dashboard-pro-entry" aria-label="Pro advanced break-even analysis"><div><span>PRO ADVANCED ANALYSIS</span><h2>Test the numbers behind your break-even plan</h2><p>Explore margin of safety, price and volume changes, capacity, and a 12-month profit outlook using your own assumptions.</p></div><div className="dashboard-pro-actions"><a className="page-button" href="/#pro-analysis">Open advanced analysis</a><a href="/pro-user-guide/">Read the step-by-step Pro guide</a></div></section>}
    {state.error && <p className="auth-error" role="alert">{state.error}</p>}
    {!calculated.length ? <div className="dashboard-empty"><ShieldCheck /><h2>No saved scenarios yet</h2><p>Open the calculator, enter your assumptions and choose Save scenario. Only your authenticated account can access saved records.</p><a className="page-button" href="/#calculator">Create your first scenario</a></div> : <>
      {isPro && <section className="portfolio-command" aria-label="Saved scenario portfolio summary">
        <div className="portfolio-title"><div><span>PRO COMMAND CENTER</span><h2>Your planning portfolio at a glance</h2></div><Activity /></div>
        <div className="portfolio-kpis">
          <article><small>Saved plans</small><strong>{portfolio.count}</strong><span>{portfolio.viable} currently viable</span></article>
          <article><small>Average target revenue</small><strong>{portfolioCurrency ? new Intl.NumberFormat("en-US",{style:"currency",currency:portfolioCurrency,maximumFractionDigits:0}).format(portfolio.averageRevenue) : "Mixed currencies"}</strong><span>{portfolioCurrency || "filter one currency for a valid average"}</span></article>
          <article><small>Average feasibility</small><strong>{portfolio.averageScore.toFixed(1)}/100</strong><span>across viable plans</span></article>
          <article className={portfolio.capacityRisks ? "risk" : "safe"}><small>Capacity risks</small><strong>{portfolio.capacityRisks}</strong><span>{portfolio.capacityRisks ? "plans exceed delivery capacity" : "no selected plan exceeds capacity"}</span></article>
        </div>
      </section>}
      <div className="saved-toolbar"><p><strong>{calculated.length}</strong> saved scenario{calculated.length === 1 ? "" : "s"}{isPro ? " · Select up to 3 to compare" : " · Comparison and exports unlock with Pro"}</p>{isPro ? <button onClick={exportSaved}><Download /> Export all CSV</button> : <a className="tool-upgrade" href="/pricing/">View Pro features</a>}</div>
      {isPro && <div className="portfolio-filters"><label className="scenario-search"><Search /><input type="search" value={filters.query} placeholder="Search saved plans" onChange={event => updateFilter("query", event.target.value)} /></label><label><SlidersHorizontal /><select value={filters.industry} onChange={event => updateFilter("industry", event.target.value)}><option value="all">All businesses</option>{availableIndustries.map(key => <option value={key} key={key}>{industries[key]?.name || key}</option>)}</select></label><label><select value={filters.currency} onChange={event => updateFilter("currency", event.target.value)}><option value="all">All currencies</option>{availableCurrencies.map(value => <option value={value} key={value}>{value}</option>)}</select></label><label><select value={filters.sort} onChange={event => updateFilter("sort", event.target.value)}><option value="updated">Recently updated</option><option value="revenue-high">Highest revenue</option><option value="score-high">Highest feasibility</option><option value="name">Name A–Z</option></select></label></div>}
      <div className="saved-grid">{filteredScenarios.map(item => <article className={selected.includes(item.id) ? "selected" : ""} key={item.id}>{isPro && <label className="compare-check"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} disabled={!selected.includes(item.id) && selected.length >= limits.comparisons} /> Compare</label>}<small>{industries[item.industry_key]?.name} · {item.currency}</small><h2>{item.name}</h2><strong>{item.result.valid ? new Intl.NumberFormat("en-US",{style:"currency",currency:item.currency}).format(item.result.revenue) : "Review inputs"}</strong><p>{item.result.valid ? `${item.result.jobs.toFixed(2)} ${industries[item.industry_key]?.unit} · ${item.result.score}/100 feasibility` : item.result.message}</p><time dateTime={item.updated_at}>Updated {new Date(item.updated_at).toLocaleDateString("en-US")}</time><div><a href={`/?scenario=${item.id}#calculator`}><ExternalLink /> Open</a><button onClick={() => rename(item)}><Pencil /> Rename</button><button className="danger" onClick={() => remove(item.id)}><Trash2 /> Delete</button></div></article>)}</div>
      {!filteredScenarios.length && <div className="portfolio-empty"><Search /><strong>No saved plan matches these filters.</strong><button onClick={() => setFilters({ query: "", industry: "all", currency: "all", sort: "updated" })}>Clear filters</button></div>}
      {compared.length >= 2 && <div className="saved-comparison"><h2>Scenario comparison</h2><div className="scenario-table"><div className="scenario-row heading"><span>Scenario</span><span>Revenue</span><span>Exact units</span><span>Capacity</span><span>Score</span></div>{compared.map(item => <div className="scenario-row" key={item.id}><strong>{item.name}</strong><span>{new Intl.NumberFormat("en-US",{style:"currency",currency:item.currency}).format(item.result.revenue)}</span><span>{item.result.jobs.toFixed(2)}</span><span>{item.result.capacity.toFixed(2)}</span><span>{item.result.score}/100</span></div>)}</div></div>}
      {isPro && driftComparison.valid && <section className="cost-drift-comparison"><div><span>PRO COST DRIFT</span><h2>What changed from {driftComparison.baselineName}?</h2><p>The first selected plan is the baseline. Deltas use saved inputs and current formula-engine results.</p></div><div className="drift-table"><div><span>Scenario</span><span>Price</span><span>Variable cost</span><span>Contribution</span><span>Fixed need</span><span>Revenue target</span></div>{driftComparison.rows.map((row,index) => <div key={row.id} className={index === 0 ? "baseline" : ""}><strong>{row.name}{index === 0 && <small>Baseline</small>}</strong><span className={(row.priceChangePct || 0) >= 0 ? "up" : "down"}>{delta(row.priceChangePct)}</span><span className={(row.variableCostChangePct || 0) <= 0 ? "down" : "up"}>{delta(row.variableCostChangePct)}</span><span className={(row.contributionChangePct || 0) >= 0 ? "down" : "up"}>{delta(row.contributionChangePct)}</span><span className={(row.fixedNeedChangePct || 0) <= 0 ? "down" : "up"}>{delta(row.fixedNeedChangePct)}</span><span className={(row.revenueChangePct || 0) <= 0 ? "down" : "up"}>{delta(row.revenueChangePct)}</span></div>)}</div></section>}
      <p className="dashboard-version">Results recalculate with formula engine {FORMULA_ENGINE_VERSION}; original save version is retained for auditability.</p>
    </>}
    <AccountControls user={state.user} scenarios={state.scenarios} displayName={state.displayName} onProfileUpdated={displayName => setState(current => ({ ...current, displayName }))} onScenariosDeleted={() => { setSelected([]); setState(current => ({ ...current, scenarios: [] })); }} />
  </section>;
}
