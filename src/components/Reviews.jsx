import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Stars from "./Stars";

const avatarTones = [
  "bg-brand-900/80 border-brand-500/40 text-brand-300",
  "bg-sky-900/80 border-sky-500/40 text-sky-300",
  "bg-emerald-900/80 border-emerald-500/40 text-emerald-300",
  "bg-purple-900/80 border-purple-500/40 text-purple-300",
  "bg-amber-900/80 border-amber-500/40 text-amber-300",
];

const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return isNaN(d) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Reviews({ reviewsApi, isAdmin }) {
  const { reviews, filtered, loading, filter, setFilter, average, count, addReview, deleteReview } = reviewsApi;
  const [form, setForm] = useState({ name: "", city: "", comment: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState("idle");

  const countFor = (stars) => reviews.filter((r) => r.rating === stars).length;
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!rating) return setStatus("needRating");
    setStatus("loading");
    try {
      await addReview({ ...form, rating });
      setForm({ name: "", city: "", comment: "" });
      setRating(0);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const chip = (active) =>
    `rounded-full border px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
      active ? "border-brand-500 bg-brand-600 text-white shadow-md" : "border-white/10 bg-card text-slate-300 hover:border-brand-400"
    }`;

  return (
    <section id="reviews" className="border-b border-white/[0.08] bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-widest text-amber-400 uppercase">
            <FontAwesomeIcon icon={faStar} /> Customer Reviews
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">What Our Neighbors Say</h2>
          <p className="text-base text-slate-400 sm:text-lg">Real reviews from homeowners across Los Angeles and the San Gabriel Valley.</p>
        </div>

        {count > 0 && (
          <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center justify-between gap-8 rounded-3xl border border-white/[0.08] bg-card p-6 shadow-xl sm:flex-row sm:p-8">
            <div className="flex items-center gap-5 text-center sm:text-left">
              <div className="flex min-w-[90px] flex-col items-center rounded-2xl border border-white/10 bg-raised p-4">
                <span className="font-display text-4xl leading-none font-extrabold text-white">{average}</span>
                <Stars rating={Math.round(average)} className="mt-1 text-xs" />
                <span className="mt-1 text-[10px] font-medium text-slate-400">Overall Score</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Rated {average} out of 5</h4>
                <p className="text-sm text-slate-400">Based on {count} customer review{count === 1 ? "" : "s"}.</p>
              </div>
            </div>
            <a href="#review-form" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-raised px-5 py-3 text-sm font-bold text-slate-200 shadow-md transition-all hover:bg-slate-700/60">
              <FontAwesomeIcon icon={faPenToSquare} className="text-accent-400" /> Leave a Review
            </a>
          </div>
        )}

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button onClick={() => setFilter(0)} className={chip(filter === 0)}>All Reviews ({count})</button>
          {[5, 4, 3, 2, 1].filter((s) => countFor(s) > 0).map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`${chip(filter === s)} flex items-center gap-1.5`}>
              {s} Stars <span className="text-amber-400">{"★".repeat(s)}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-slate-400">Loading reviews…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-400">No reviews yet — be the first!</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <article key={r.id} className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-card p-6 shadow-lg">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <Stars rating={r.rating} className="text-sm" />
                    <span className="text-xs font-medium text-slate-500">{formatDate(r.date)}</span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300 italic">"{r.comment}"</p>
                </div>
                <div className="flex items-center gap-3 border-t border-white/[0.06] pt-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-extrabold ${avatarTones[i % avatarTones.length]}`}>
                    {initials(r.name)}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{r.name}</p>
                    {r.city && <p className="text-[11px] text-slate-400">{r.city}</p>}
                  </div>
                  {isAdmin && (
                    <button onClick={() => deleteReview(r.id)} aria-label={`Delete review by ${r.name}`} className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/20">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div id="review-form" className="mx-auto mt-14 max-w-2xl scroll-mt-24 rounded-3xl border border-white/[0.08] bg-card p-6 shadow-2xl sm:p-8">
          <h3 className="mb-1 text-center font-display text-xl font-bold text-white">Leave a Review</h3>
          <p className="mb-6 text-center text-xs text-slate-400">Helps your neighbors find honest, reliable plumbing.</p>
          <form onSubmit={submit} className="space-y-4">
            <div className="text-center">
              <span className="mb-1 block text-xs font-semibold text-slate-300">Your Rating</span>
              <div className="flex justify-center gap-1.5 text-3xl" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    className={`transition-transform hover:scale-110 ${n <= (hover || rating) ? "text-amber-400" : "text-slate-600"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label>
                <span className="field-label">Your Name *</span>
                <input name="name" value={form.name} onChange={update} required placeholder="e.g. Maria Gonzalez" className="field" />
              </label>
              <label>
                <span className="field-label">City</span>
                <input name="city" value={form.city} onChange={update} placeholder="e.g. Pasadena, CA" className="field" />
              </label>
            </div>
            <label className="block">
              <span className="field-label">Your Experience *</span>
              <textarea name="comment" value={form.comment} onChange={update} required rows={3} placeholder="Tell us about the service you received…" className="field resize-none" />
            </label>
            <button type="submit" disabled={status === "loading"} className="w-full rounded-xl border border-brand-400/30 bg-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-500 disabled:opacity-60">
              {status === "loading" ? "Submitting…" : "Submit Review"}
            </button>
            {status === "needRating" && <p className="text-center text-xs font-semibold text-amber-400">Please pick a star rating.</p>}
            {status === "success" && <p className="rounded-lg border border-emerald-500/40 bg-emerald-950/60 py-2 text-center text-xs font-semibold text-emerald-400">Thank you! Your review is posted.</p>}
            {status === "error" && <p className="text-center text-xs font-semibold text-red-400">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
