import { useState } from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import AdminModal from "./AdminModal";
import { business } from "../lib/business";

export default function Footer({ auth }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <footer className="border-t border-white/[0.08] bg-ink text-sm text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col items-center gap-6 lg:mb-10 lg:flex-row lg:items-center lg:justify-around lg:gap-10">
          <div className="w-full max-w-[760px] lg:max-w-none lg:w-auto">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <img
                  src={logo}
                  alt="AP Plumbing"
                  className="h-12 w-auto rounded-lg bg-white p-1"
                />
                <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                  AP PLUMBING
                </span>
              </div>
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 font-bold text-white transition-colors hover:text-accent-400 lg:justify-start"
              >
                <FontAwesomeIcon icon={faPhone} className="text-accent-500" />{" "}
                {business.phoneDisplay}
              </a>
              <div className="flex items-center justify-center gap-5 lg:justify-start">
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit AP Plumbing on Instagram"
                  className="inline-flex size-7 items-center justify-center rounded-[8px] bg-[linear-gradient(45deg,#feda75_0%,#fa7e1e_25%,#d62976_55%,#962fbf_78%,#4f5bd5_100%)] text-base text-white transition-transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[760px] lg:max-w-[420px] lg:w-auto">
            <div className="text-center lg:text-left">
              <h4 className="mb-4 text-xs font-bold tracking-wider text-white uppercase">
                Credentials
              </h4>
              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-white/[0.08] bg-[#111822] p-3 text-center lg:text-left">
                  <span className="block font-bold text-slate-200">
                    CA Lic. No. {business.license}
                  </span>
                  <span>Licensed &amp; Insured</span>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#111822] p-3 text-center lg:text-left">
                  <span className="block font-bold text-emerald-400">
                    24/7 Response
                  </span>
                  <span>Emergency service available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row sm:gap-4 sm:pt-7 lg:pt-8">
          <p>© {new Date().getFullYear()} AP Plumbing. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            {/* subtle admin link, same as the old site */}
            {auth.isAdmin ? (
              <button
                onClick={auth.logout}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="opacity-50 transition-opacity hover:opacity-100"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {showLogin && (
        <AdminModal
          onClose={() => setShowLogin(false)}
          login={auth.login}
          resetPassword={auth.resetPassword}
        />
      )}
    </footer>
  );
}
