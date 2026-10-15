import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import AdminModal from "./AdminModal";
import { business, navLinks } from "../lib/business";

export default function Footer({ auth }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <footer className="border-t border-white/[0.08] bg-ink text-sm text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="AP Plumbing" className="h-12 w-auto rounded-lg bg-white p-1" />
              <span className="font-display text-2xl font-extrabold tracking-tight text-white">AP PLUMBING</span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed sm:text-sm">
              Professional, dependable plumbing founded and operated by {business.owner}. Licensed &amp; insured (Lic #{business.license}).
              Serving homeowners throughout {business.serviceArea}.
            </p>
            <a href={business.phoneHref} className="inline-flex items-center gap-2 font-bold text-white transition-colors hover:text-accent-400">
              <FontAwesomeIcon icon={faPhone} className="text-accent-500" /> {business.phoneDisplay}
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold tracking-wider text-white uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#hero" className="transition-colors hover:text-brand-400">Home</a></li>
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="transition-colors hover:text-brand-400">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold tracking-wider text-white uppercase">Credentials</h4>
            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-white/[0.08] bg-[#111822] p-3">
                <span className="block font-bold text-slate-200">CA Lic # {business.license}</span>
                <span>Licensed &amp; Insured</span>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-[#111822] p-3">
                <span className="block font-bold text-emerald-400">24/7 Response</span>
                <span>Emergency service available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} AP Plumbing. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Owner-Operated by {business.owner}</span>
            {/* subtle admin link, same as the old site */}
            {auth.isAdmin ? (
              <button onClick={auth.logout} className="opacity-50 transition-opacity hover:opacity-100">Logout</button>
            ) : (
              <button onClick={() => setShowLogin(true)} className="opacity-50 transition-opacity hover:opacity-100">Admin</button>
            )}
          </div>
        </div>
      </div>

      {showLogin && <AdminModal onClose={() => setShowLogin(false)} login={auth.login} />}
    </footer>
  );
}
