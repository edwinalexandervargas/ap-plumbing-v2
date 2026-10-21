import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { business } from "../lib/business";

export default function TopBanner() {
  return (
    <div className="relative z-50 border-b border-brand-500/20 bg-gradient-to-r from-[#031926] via-[#082f49] to-[#0c4a6e] px-4 py-2 text-xs text-white shadow-md sm:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden font-medium whitespace-nowrap">
          <span className="relative mr-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="rounded border border-accent-400/40 bg-accent-500/15 px-2 py-0.5 text-[11px] font-bold tracking-wider text-accent-400 uppercase sm:text-xs">
            24/7 Emergency
          </span>
          <span className="hidden text-slate-200 sm:inline">
            Plumbing issue right now? Call the owner directly:
          </span>
        </div>
        <a
          href={business.phoneHref}
          className="inline-flex shrink-0 items-center gap-1.5 font-bold tracking-tight transition-colors hover:text-accent-400"
        >
          <FontAwesomeIcon icon={faPhone} className="text-xs text-accent-400" />
          <span>{business.phoneDisplay}</span>
          <span className="hidden text-[11px] font-normal text-slate-300 md:inline">
            · CA Lic. No. {business.license}
          </span>
        </a>
      </div>
    </div>
  );
}
