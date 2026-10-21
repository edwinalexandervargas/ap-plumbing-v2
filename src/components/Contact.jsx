import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faPaperPlane,
  faPhone,
  faIdCard,
  faEnvelope,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { business, services } from "../lib/business";
import { useContactForm } from "../hooks/useContactForm";

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-raised text-sm text-brand-400">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <span className="block text-xs font-medium text-slate-400">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

export default function Contact() {
  const {
    formRef,
    status,
    nameError,
    phoneError,
    onSubmit,
    onNameChange,
    onPhoneChange,
  } = useContactForm();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-night py-14 text-white sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 [background-size:24px_24px] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] opacity-15" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl space-y-3 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/25 bg-accent-500/10 px-3 py-1 text-xs font-bold tracking-widest text-accent-400 uppercase">
            <FontAwesomeIcon icon={faHeadset} /> Free Estimates
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
            Get in Touch for a Free Quote
          </h2>
          <p className="text-base text-slate-400 sm:text-lg">
            Need an emergency repair or planning an upgrade? Contact Angel
            directly.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Quote form (EmailJS) */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-card p-5 text-slate-200 shadow-2xl sm:p-7 lg:col-span-7">
            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-bold text-white">
                  Request a Free Estimate
                </h3>
                <span className="shrink-0 rounded-lg border border-brand-500/30 bg-brand-900/60 px-2.5 py-1 text-xs font-bold text-brand-400">
                  No Obligation
                </span>
              </div>
              {/* Field names must match the EmailJS template: user_name, user_phone, user_email, service, message */}
              <form ref={formRef} onSubmit={onSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <label>
                    <span className="field-label">Your Name *</span>
                    <input
                      name="user_name"
                      required
                      placeholder="John Doe"
                      aria-invalid={!!nameError}
                      aria-describedby={nameError ? "name-error" : undefined}
                      onChange={onNameChange}
                      className="field"
                    />
                    {nameError && (
                      <span
                        id="name-error"
                        className="mt-1.5 block text-xs font-medium text-red-400"
                      >
                        {nameError}
                      </span>
                    )}
                  </label>
                  <label>
                    <span className="field-label">Phone Number *</span>
                    <input
                      name="user_phone"
                      type="tel"
                      required
                      placeholder="(323) 000-0000"
                      inputMode="tel"
                      autoComplete="tel"
                      aria-invalid={!!phoneError}
                      aria-describedby={phoneError ? "phone-error" : undefined}
                      onChange={onPhoneChange}
                      className="field"
                    />
                    {phoneError && (
                      <span
                        id="phone-error"
                        className="mt-1.5 block text-xs font-medium text-red-400"
                      >
                        {phoneError}
                      </span>
                    )}
                  </label>
                </div>
                <label className="block">
                  <span className="field-label">Email Address</span>
                  <input
                    name="user_email"
                    type="email"
                    placeholder="john@example.com"
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="field-label">Service Needed</span>
                  <select name="service" className="field" defaultValue="">
                    <option value="" disabled>
                      Select a service…
                    </option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Other">Other / Not sure</option>
                  </select>
                </label>
                <label className="block">
                  <span className="field-label">How Can Angel Help? *</span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe the issue and your city…"
                    className="field resize-none"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent-400/40 bg-accent-500 py-3.5 text-base font-extrabold text-white shadow-xl shadow-accent-500/30 transition-all hover:bg-accent-600 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Free Quote Request{" "}
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="text-sm"
                      />
                    </>
                  )}
                </button>
                {status === "success" && (
                  <p className="rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-3 text-center text-sm font-semibold text-emerald-400">
                    Thanks for the message! Angel will reach out as soon as
                    possible.
                  </p>
                )}
                {status === "error" && (
                  <p className="rounded-xl border border-red-500/40 bg-red-950/60 p-3 text-center text-sm font-semibold text-red-400">
                    Something went wrong. Please try again or call directly.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Call card + business info */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-brand-400/30 bg-gradient-to-br from-[#0c4a6e] to-[#041a29] p-7 shadow-2xl sm:p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 animate-pulse items-center justify-center rounded-2xl bg-accent-500 text-2xl text-white shadow-lg">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-sky-200 uppercase">
                    Fastest Way to Reach Us
                  </p>
                  <h4 className="font-display text-2xl font-extrabold text-white">
                    Call Angel Now
                  </h4>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-slate-200">
                Skip the form for active leaks, backed-up drains, or gas
                concerns.
              </p>
              <a
                href={business.phoneHref}
                className="block w-full rounded-xl bg-white py-3.5 text-center text-xl font-extrabold text-slate-900 shadow-xl transition-transform hover:bg-sky-50 active:scale-95"
              >
                {business.phoneDisplay}
              </a>
            </div>

            <div className="flex-1 space-y-5 rounded-3xl border border-white/10 bg-card p-7 shadow-xl sm:p-8">
              <h4 className="border-b border-white/[0.08] pb-3 font-display text-lg font-bold text-white">
                Business Info
              </h4>
              <div className="space-y-4 text-sm text-slate-300">
                <InfoRow icon={faIdCard} label="CA Lic. No.">
                  <span className="text-base font-bold text-white">
                    {business.license}
                  </span>
                </InfoRow>
                <InfoRow icon={faEnvelope} label="Email">
                  <a
                    href={`mailto:${business.email}`}
                    className="font-semibold break-all text-white transition-colors hover:text-accent-400"
                  >
                    {business.email}
                  </a>
                </InfoRow>
                <InfoRow icon={faLocationDot} label="Service Area">
                  <span className="font-semibold text-slate-200">
                    {business.serviceArea}
                  </span>
                </InfoRow>
                <InfoRow icon={faClock} label="Availability">
                  <span className="font-bold text-white">
                    24/7 Emergency Service
                  </span>
                </InfoRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
