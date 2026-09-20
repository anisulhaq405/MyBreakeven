import React, { useState } from "react";
import { Download, Eye, EyeOff, KeyRound, Save, Trash2, UserRound } from "lucide-react";
import { supabase } from "./authClient";
import { friendlyAuthError, withTimeout } from "./authSecurity";
import "./account-controls.css";

const initialStatus = { loading: "", error: "", message: "" };

export default function AccountControls({ user, scenarios, displayName = "", onProfileUpdated, onScenariosDeleted }) {
  const [name, setName] = useState(displayName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState({ current: false, next: false, confirm: false, delete: false });
  const [deletePhrase, setDeletePhrase] = useState("");
  const [status, setStatus] = useState(initialStatus);

  const saveProfile = async (event) => {
    event.preventDefault();
    const cleanName = name.trim();
    if (cleanName.length > 80) return setStatus({ loading: "", error: "Use a display name with 80 characters or fewer.", message: "" });
    setStatus({ loading: "profile", error: "", message: "" });
    const { error } = await supabase.from("profiles").update({ display_name: cleanName, updated_at: new Date().toISOString() }).eq("id", user.id);
    if (error) setStatus({ loading: "", error: friendlyAuthError(error, "Your profile could not be updated. Please try again."), message: "" });
    else { onProfileUpdated(cleanName); setStatus({ loading: "", error: "", message: "Profile updated." }); }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    if (newPassword.length < 8) return setStatus({ loading: "", error: "Use at least 8 characters for your new password.", message: "" });
    if (newPassword !== confirmPassword) return setStatus({ loading: "", error: "The new passwords do not match.", message: "" });
    setStatus({ loading: "password", error: "", message: "" });
    try {
      const verified = await withTimeout(supabase.auth.signInWithPassword({ email: user.email, password: currentPassword }));
      if (verified.error) return setStatus({ loading: "", error: "Your current password is incorrect. Please check it and try again.", message: "" });
      const updated = await withTimeout(supabase.auth.updateUser({ password: newPassword }));
      if (updated.error) throw updated.error;
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setStatus({ loading: "", error: "", message: "Password updated securely." });
    } catch (error) {
      setStatus({ loading: "", error: friendlyAuthError(error, "Your password could not be updated. Check your current password and try again."), message: "" });
    }
  };

  const passwordField = (key, value, setValue, autoComplete, minLength) => <div className="account-password-control">
    <input type={visiblePasswords[key] ? "text" : "password"} autoComplete={autoComplete} minLength={minLength} required value={value} onChange={event => setValue(event.target.value)} />
    <button type="button" className="account-password-toggle" onClick={() => setVisiblePasswords(current => ({ ...current, [key]: !current[key] }))} aria-label={visiblePasswords[key] ? "Hide password" : "Show password"} aria-pressed={visiblePasswords[key]}>
      {visiblePasswords[key] ? <EyeOff /> : <Eye />}
    </button>
  </div>;

  const exportData = () => {
    const payload = { exported_at: new Date().toISOString(), account: { email: user.email, display_name: name.trim() }, saved_scenarios: scenarios };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "mybreakeven-personal-data.json"; link.click(); URL.revokeObjectURL(link.href);
    setStatus({ loading: "", error: "", message: "Personal data export downloaded." });
  };

  const deleteScenarios = async () => {
    if (!window.confirm("Delete all saved scenarios? This cannot be undone.")) return;
    setStatus({ loading: "scenarios", error: "", message: "" });
    const { error } = await supabase.from("saved_scenarios").delete().eq("user_id", user.id);
    if (error) return setStatus({ loading: "", error: friendlyAuthError(error, "Your scenarios could not be deleted. Please try again."), message: "" });
    onScenariosDeleted();
    setStatus({ loading: "", error: "", message: "All saved scenarios deleted." });
  };

  const deleteAccount = async (event) => {
    event.preventDefault();
    if (deletePhrase !== "DELETE") return setStatus({ loading: "", error: "Type DELETE exactly to confirm permanent account deletion.", message: "" });
    if (!window.confirm("Permanently delete your MyBreakeven account and all saved data? This cannot be undone.")) return;
    setStatus({ loading: "account", error: "", message: "" });
    try {
      const verified = await withTimeout(supabase.auth.signInWithPassword({ email: user.email, password: deletePassword }));
      if (verified.error) throw verified.error;
      const { error } = await supabase.rpc("delete_my_account");
      if (error) throw error;
      await supabase.auth.signOut();
      window.location.assign("/?account=deleted");
    } catch (error) {
      setStatus({ loading: "", error: friendlyAuthError(error, "Your account could not be deleted. Check your current password and try again."), message: "" });
    }
  };

  return <section className="account-controls" aria-labelledby="account-settings-title">
    <div className="account-controls-heading"><span>ACCOUNT & PRIVACY</span><h2 id="account-settings-title">Manage your account and data</h2><p>Update your account, download your information or permanently remove it.</p></div>
    {status.error && <p className="auth-error" role="alert">{status.error}</p>}
    {status.message && <p className="auth-success" role="status">{status.message}</p>}
    <div className="account-grid">
      <form className="account-card" onSubmit={saveProfile}><UserRound /><h3>Profile</h3><label>Display name<input value={name} maxLength="80" autoComplete="name" onChange={event => setName(event.target.value)} /></label><button disabled={Boolean(status.loading)}><Save /> {status.loading === "profile" ? "Saving…" : "Save profile"}</button></form>
      <form className="account-card" onSubmit={changePassword}><KeyRound /><h3>Change password</h3><label>Current password{passwordField("current", currentPassword, setCurrentPassword, "current-password")}</label><label>New password{passwordField("next", newPassword, setNewPassword, "new-password", 8)}</label><label>Confirm new password{passwordField("confirm", confirmPassword, setConfirmPassword, "new-password", 8)}</label><button disabled={Boolean(status.loading)}><KeyRound /> {status.loading === "password" ? "Updating…" : "Update password"}</button></form>
      <div className="account-card"><Download /><h3>Your data</h3><p>Download your account details and saved planning scenarios as JSON.</p><button type="button" onClick={exportData} disabled={Boolean(status.loading)}><Download /> Export personal data</button><button type="button" className="danger" onClick={deleteScenarios} disabled={Boolean(status.loading) || !scenarios.length}><Trash2 /> {status.loading === "scenarios" ? "Deleting…" : "Delete all scenarios"}</button></div>
      <form className="account-card danger-zone" onSubmit={deleteAccount}><Trash2 /><h3>Delete account</h3><p>This permanently deletes your account and all saved scenarios.</p><label>Current password{passwordField("delete", deletePassword, setDeletePassword, "current-password")}</label><label>Type DELETE to confirm<input value={deletePhrase} autoComplete="off" required onChange={event => setDeletePhrase(event.target.value)} /></label><button className="danger" disabled={Boolean(status.loading) || deletePhrase !== "DELETE"}><Trash2 /> {status.loading === "account" ? "Deleting…" : "Permanently delete account"}</button></form>
    </div>
  </section>;
}
