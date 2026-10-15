import { useState } from "react";

export default function AdminModal({ onClose, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl border border-white/10 bg-card p-7 shadow-2xl">
        <h3 className="text-center font-display text-xl font-bold text-white">Admin Login</h3>
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
        {error && <p className="text-center text-xs font-semibold text-red-400">{error}</p>}
        <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white hover:bg-brand-500">Login</button>
        <button type="button" onClick={onClose} className="w-full py-2 text-xs text-slate-400 hover:text-white">Cancel</button>
      </form>
    </div>
  );
}
