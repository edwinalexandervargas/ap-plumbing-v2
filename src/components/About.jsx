import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faArrowDown,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import angel from "../assets/angel.jpg";
import { business, aboutParagraphs } from "../lib/business";

export default function About() {
  return (
    <section
      id="about"
      className="border-b border-white/[0.08] bg-surface py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl">
              <img
                src={angel}
                alt={`${business.owner} on the job`}
                className="h-[420px] w-full object-cover object-top"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-night/95 via-transparent to-transparent p-6 text-white">
                <p className="text-xs font-bold tracking-wider text-accent-400 uppercase">
                  Direct Accountability
                </p>
                <h3 className="font-display text-2xl font-bold">
                  When you call AP Plumbing, you get Angel.
                </h3>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-6 lg:order-2 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-lg border border-brand-500/30 bg-brand-900/60 px-3 py-1 text-sm font-bold tracking-wider text-brand-400 uppercase">
              <FontAwesomeIcon icon={faUserShield} /> Meet the Owner
            </div>
            <h2 className="font-display text-3xl leading-tight font-extrabold text-white sm:text-4xl">
              "Plumbing since 18. Built on honest, reliable, and affordable
              service."
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 font-bold text-white transition-colors hover:bg-slate-700"
              >
                View Services{" "}
                <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
              </a>
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-500/40 bg-brand-900/30 px-4 py-3 font-bold text-brand-400 transition-colors hover:bg-brand-900/50 hover:text-brand-300"
              >
                <FontAwesomeIcon icon={faPhone} /> Call Angel:{" "}
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
