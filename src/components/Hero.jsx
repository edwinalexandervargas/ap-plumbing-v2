import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneFlip, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import angel from "../assets/angel.jpg";
import Stars from "./Stars";
import { business } from "../lib/business";

const checkTones = [
  "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
  "bg-accent-500/20 border-accent-500/40 text-accent-400",
  "bg-brand-500/20 border-brand-500/40 text-brand-400",
];

export default function Hero({ average, count }) {
  return (
    <section
      id="hero"
      className="hero-mesh relative overflow-hidden border-b border-white/[0.08] pt-10 pb-16 lg:pt-16 lg:pb-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: headline + CTAs */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-card px-3.5 py-1.5 text-xs font-semibold text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>Serving {business.serviceArea}</span>
              <span className="text-slate-600">•</span>
              <span className="font-bold text-brand-400">
                CA Lic. No. {business.license}
              </span>
            </div>

            <h1 className="font-display text-4xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Fast &amp; Reliable <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                Plumbing Services
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl lg:mx-0">
              Honest, prompt work straight from owner-operator{" "}
              <strong className="font-bold text-white">{business.owner}</strong>
              . From emergency leaks and drain clearing to water heaters and gas
              lines — done right at fair rates.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row lg:justify-start">
              <a
                href={business.phoneHref}
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-brand-400/30 bg-brand-600 px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-brand-600/35 transition-all hover:-translate-y-0.5 hover:bg-brand-500 sm:w-auto"
              >
                <FontAwesomeIcon
                  icon={faPhoneFlip}
                  className="text-accent-400"
                />
                Call Now: {business.phoneDisplay}
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-accent-400/40 bg-accent-500 px-7 py-4 text-lg font-extrabold text-white shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600 sm:w-auto"
              >
                Get a Free Quote <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              {business.badges.map((b, i) => (
                <div
                  key={b}
                  className="flex items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-card/90 p-2 text-sm lg:justify-start"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${checkTones[i]}`}
                  >
                    ✓
                  </span>
                  <span className="font-semibold text-white">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Angel's photo */}
          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-600/30 via-sky-500/20 to-accent-500/25 opacity-75 blur-2xl" />
              <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-brand-400/30 bg-card shadow-2xl">
                <img
                  src={angel}
                  alt={`${business.owner}, owner of AP Plumbing`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 via-night/60 to-transparent p-5 text-white">
                  <p className="font-display text-xl leading-tight font-bold">
                    {business.owner}
                  </p>
                </div>
              </div>

              {count > 0 && (
                <div className="absolute -top-4 -right-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-card px-3.5 py-2 shadow-2xl sm:-right-4">
                  <Stars rating={Math.round(average)} className="text-xs" />
                  <span className="text-xs font-bold text-slate-200">
                    {average} Star Rated
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
