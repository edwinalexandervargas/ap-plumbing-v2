import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faPhoneVolume, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { business, navLinks } from "../lib/business";

export default function Header({ average }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="glass-nav sticky top-0 z-40 border-b border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#hero" className="group flex items-center gap-3">
            <img src={logo} alt="AP Plumbing logo" className="h-11 w-auto rounded-lg sm:h-12 bg-white p-1 transition-transform group-hover:scale-105" />
            <div className="hidden flex-col sm:flex">
              <span className="font-display text-xl leading-none font-extrabold tracking-tight text-brand-400 sm:text-2xl">
                AP <span className="text-white">PLUMBING</span>
              </span>
              <span className="mt-1 hidden text-[11px] font-semibold tracking-wider text-slate-400 uppercase sm:block">
                Owner-Operated · {business.serviceAreaShort}
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="flex items-center gap-1.5 py-1 transition-colors hover:text-brand-400">
                {l.label}
                {l.href === "#reviews" && average && (
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    {average} ★
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={business.phoneHref}
              className="group inline-flex items-center gap-2 rounded-xl border border-brand-400/30 bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-500 active:scale-95"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-accent-400 transition-transform group-hover:rotate-12">
                <FontAwesomeIcon icon={faPhoneVolume} className="text-sm" />
              </span>
              <span className="text-left leading-none">
                <span className="hidden text-[10px] font-bold text-sky-200 uppercase sm:block">Call Angel Direct</span>
                <span className="text-xs font-extrabold tracking-tight sm:text-sm">{business.phoneDisplay}</span>
              </span>
            </a>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-xl border border-accent-400/30 bg-accent-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 active:scale-95 lg:inline-flex"
            >
              Free Quote <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="rounded-xl border border-white/10 p-2.5 text-slate-300 hover:bg-slate-800/80 hover:text-brand-400 md:hidden"
            >
              <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-xl" fixedWidth />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="space-y-3 border-t border-white/10 bg-surface/95 px-5 py-4 backdrop-blur-xl md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="block py-1.5 font-semibold text-slate-200 hover:text-brand-400">
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 border-t border-slate-800 pt-2">
            <a href={business.phoneHref} className="flex-1 rounded-xl bg-brand-600 py-2.5 text-center text-sm font-bold text-white">Call Now</a>
            <a href="#contact" onClick={close} className="flex-1 rounded-xl bg-accent-500 py-2.5 text-center text-sm font-bold text-white">Get Quote</a>
          </div>
        </div>
      )}
    </header>
  );
}
