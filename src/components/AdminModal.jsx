import { useState } from "react";

export default function AdminModal({ onClose, login, resetPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetting, setResetting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch {
      setError("Invalid email or password");
    }
  };

  const sendResetEmail = async () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setError("Enter your admin email first.");
      return;
    }

    setError("");
    setResetMessage("");
    setResetting(true);
    try {
      await resetPassword(normalizedEmail);
      setResetMessage(
        "If an admin account uses that email, a password reset link will arrive shortly.",
      );
    } catch {
      setError(
        "Could not send the reset email. Check the address and try again.",
      );
    } finally {
      setResetting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-3xl border border-white/10 bg-card p-7 shadow-2xl"
      >
        <h3 className="text-center font-display text-xl font-bold text-white">
          Admin Login
        </h3>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-brand-300 hover:text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && (
          <p className="text-center text-xs font-semibold text-red-400">
            {error}
          </p>
        )}
        {resetMessage && (
          <p
            role="status"
            className="text-center text-xs font-medium text-emerald-400"
          >
            {resetMessage}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white hover:bg-brand-500"
        >
          Login
        </button>
        <button
          type="button"
          onClick={sendResetEmail}
          disabled={resetting}
          className="w-full py-2 text-xs font-semibold text-brand-300 hover:text-white disabled:opacity-50"
        >
          {resetting ? "Sending reset link…" : "Forgot password?"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 text-xs text-slate-400 hover:text-white"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
