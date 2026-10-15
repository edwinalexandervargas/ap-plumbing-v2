import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faCircleArrowRight, faPhone, faXmark } from "@fortawesome/free-solid-svg-icons";
import { business, services } from "../lib/business";

const tones = {
  brand: "bg-brand-900/60 border-brand-500/30 text-brand-400 group-hover:bg-brand-600",
  amber: "bg-amber-500/15 border-amber-500/30 text-amber-400 group-hover:bg-amber-600",
  red: "bg-red-500/15 border-red-500/30 text-red-400 group-hover:bg-red-600",
};

function IconTile({ service, size = "h-14 w-14 text-2xl" }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-2xl border transition-colors group-hover:text-white ${size} ${tones[service.tone]}`}>
      <FontAwesomeIcon icon={service.icon} />
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState(null);
  const regular = services.filter((s) => !s.featured);
  const featured = services.find((s) => s.featured);

  return (
    <section id="services" className="border-b border-white/[0.08] bg-night py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl space-y-3 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-900/60 px-3 py-1 text-xs font-bold tracking-widest text-brand-400 uppercase">
            <FontAwesomeIcon icon={faWrench} /> What We Do
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">Our Plumbing Services</h2>
          <p className="text-base text-slate-400 sm:text-lg">Tap any service for details, or call for a quick estimate.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regular.map((s) => (
            <button
              key={s.title}
              onClick={() => setSelected(s)}
              className="service-card group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-card p-7 text-left shadow-lg"
            >
              <div>
                <div className="mb-6"><IconTile service={s} /></div>
                <h3 className="mb-2 flex items-center justify-between font-display text-xl font-bold text-white transition-colors group-hover:text-brand-400">
                  {s.title}
                  <FontAwesomeIcon icon={faCircleArrowRight} className="text-sm text-slate-600 transition-colors group-hover:text-brand-400" />
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">{s.description}</p>
              </div>
              <div className="flex w-full items-center justify-between border-t border-white/[0.06] pt-4 text-xs font-semibold text-brand-400">
                <span>{s.tag}</span>
                <span className="underline group-hover:no-underline">Details →</span>
              </div>
            </button>
          ))}

          {featured && (
            <button
              onClick={() => setSelected(featured)}
              className="service-card group rounded-2xl border border-white/[0.08] bg-card p-7 text-left shadow-lg md:col-span-2 lg:col-span-3"
            >
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-5">
                  <IconTile service={featured} />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-brand-400">{featured.title}</h3>
                      <span className="rounded-full border border-red-500/30 bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-300 uppercase">{featured.tag}</span>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{featured.description}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold text-brand-400 underline group-hover:no-underline">Details →</span>
              </div>
            </button>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-card p-6 text-center shadow-lg sm:flex-row sm:p-8 sm:text-left">
          <div>
            <h4 className="font-display text-lg font-bold text-white">Don't see your plumbing problem listed?</h4>
            <p className="text-sm text-slate-400">Give Angel a quick call — he can usually point you in the right direction over the phone.</p>
          </div>
          <a href={business.phoneHref} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-brand-400/30 bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-colors hover:bg-brand-500">
            <FontAwesomeIcon icon={faPhone} /> {business.phoneDisplay}
          </a>
        </div>
      </div>

      {selected && (
        <div onClick={() => setSelected(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selected.title} className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-card p-7 text-slate-200 shadow-2xl sm:p-8">
            <button onClick={() => setSelected(null)} aria-label="Close details" className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-slate-400 hover:text-white">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="mb-5"><IconTile service={selected} size="h-16 w-16 text-3xl" /></div>
            <h3 className="mb-2 font-display text-2xl font-extrabold text-white">{selected.title}</h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-300">{selected.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={business.phoneHref} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-400/30 bg-brand-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500">
                <FontAwesomeIcon icon={faPhone} /> Call for Service
              </a>
              <a href="#contact" onClick={() => setSelected(null)} className="flex-1 rounded-xl border border-white/10 bg-slate-800 px-4 py-3.5 text-center text-sm font-bold text-white hover:bg-slate-700">
                Request Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
