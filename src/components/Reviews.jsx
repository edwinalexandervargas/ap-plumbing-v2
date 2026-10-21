import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPenToSquare,
  faTrash,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Stars from "./Stars";

const avatarTones = [
  "bg-brand-900/80 border-brand-500/40 text-brand-300",
  "bg-sky-900/80 border-sky-500/40 text-sky-300",
  "bg-emerald-900/80 border-emerald-500/40 text-emerald-300",
  "bg-purple-900/80 border-purple-500/40 text-purple-300",
  "bg-amber-900/80 border-amber-500/40 text-amber-300",
];
const REVIEWS_PER_BATCH = 3;

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function GoogleBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold text-slate-300">
      <span className="font-extrabold">
        <span className="text-[#4285F4]">G</span>
      </span>
      Google
    </span>
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  return isNaN(d)
    ? iso
    : d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

export default function Reviews({ reviewsApi, googleApi, isAdmin }) {
  const {
    reviews,
    filtered,
    loading,
    filter,
    setFilter,
    average,
    count,
    addReview,
    deleteReview,
  } = reviewsApi;
  const [form, setForm] = useState({ name: "", city: "", comment: "" });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState("idle");
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deletingReview, setDeletingReview] = useState(false);
  const [visibleReviewCount, setVisibleReviewCount] =
    useState(REVIEWS_PER_BATCH);
  const [source, setSource] = useState("all"); // all | google | site
  const google = googleApi ?? { enabled: false, reviews: [] };

  // In-house (Firestore) reviews + Google reviews, tagged by source
  const siteItems = filtered.map((r) => ({ ...r, source: "site" }));
  const googleItems = google.reviews.filter(
    (r) => filter === 0 || r.rating === filter,
  );
  const combined =
    source === "google"
      ? googleItems
      : source === "site"
        ? siteItems
        : [...siteItems, ...googleItems].sort((a, b) =>
            String(b.date ?? "").localeCompare(String(a.date ?? "")),
          );
  const visibleReviews = combined.slice(0, visibleReviewCount);

  const countFor = (stars) =>
    [...reviews, ...google.reviews].filter((r) => r.rating === stars).length;
  const pickSource = (value) => {
    setSource(value);
    setVisibleReviewCount(REVIEWS_PER_BATCH);
  };
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

  const confirmDelete = async () => {
    if (!reviewToDelete || deletingReview) return;
    setDeletingReview(true);
    setDeleteError("");
    try {
      await deleteReview(reviewToDelete.id);
      setReviewToDelete(null);
    } catch {
      setDeleteError("Could not delete this review. Please try again.");
    } finally {
      setDeletingReview(false);
    }
  };

  const chip = (active) =>
    `rounded-full border px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
      active
        ? "border-brand-500 bg-brand-600 text-white shadow-md"
        : "border-white/10 bg-card text-slate-300 hover:border-brand-400"
    }`;

  return (
    <section
      id="reviews"
      className="border-b border-white/[0.08] bg-surface py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-bold tracking-widest text-amber-400 uppercase">
            <FontAwesomeIcon icon={faStar} /> Customer Reviews
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            What Our Neighbors Say
          </h2>
          <p className="text-base text-slate-400 sm:text-lg">
            Real reviews from homeowners across Los Angeles and the San Gabriel
            Valley.
          </p>
        </div>

        {(count > 0 || google.enabled) && (
          <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center justify-between gap-8 rounded-3xl border border-white/[0.08] bg-card p-6 shadow-xl sm:flex-row sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-5 text-center sm:justify-start sm:text-left">
              {google.enabled && google.count > 0 && (
                <a
                  href={google.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-[90px] flex-col items-center rounded-2xl border border-white/10 bg-raised p-4 transition-colors hover:border-brand-400"
                >
                  <span className="font-display text-4xl leading-none font-extrabold text-white">
                    {google.rating?.toFixed(1)}
                  </span>
                  <Stars
                    rating={Math.round(google.rating)}
                    className="mt-1 text-xs"
                  />
                  <span className="mt-1 text-[10px] font-medium text-slate-400">
                    {google.count} on Google
                  </span>
                </a>
              )}
              {count > 0 && (
                <div className="flex min-w-[90px] flex-col items-center rounded-2xl border border-white/10 bg-raised p-4">
                  <span className="font-display text-4xl leading-none font-extrabold text-white">
                    {average}
                  </span>
                  <Stars
                    rating={Math.round(average)}
                    className="mt-1 text-xs"
                  />
                  <span className="mt-1 text-[10px] font-medium text-slate-400">
                    {count} on our site
                  </span>
                </div>
              )}
              <div>
                <h4 className="text-lg font-bold text-white">
                  Trusted by local homeowners
                </h4>
                <p className="text-sm text-slate-400">
                  {count + (google.count ?? 0)} customer review
                  {count + (google.count ?? 0) === 1 ? "" : "s"} on Google and
                  our site.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              {google.enabled && (
                <a
                  href={google.writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-400/30 bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-500"
                >
                  Review us on Google{" "}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-xs"
                  />
                </a>
              )}
              <a
                href="#review-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-raised px-5 py-3 text-sm font-bold text-slate-200 shadow-md transition-all hover:bg-slate-700/60"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-accent-400"
                />{" "}
                Leave a Review Here
              </a>
            </div>
          </div>
        )}

        {google.enabled && (
          <div className="mb-4 flex justify-center gap-2">
            {[
              ["all", "All"],
              ["google", "Google"],
              ["site", "Our Website"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => pickSource(value)}
                className={chip(source === value)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              setFilter(0);
              setVisibleReviewCount(REVIEWS_PER_BATCH);
            }}
            className={chip(filter === 0)}
          >
            All Reviews ({count + google.reviews.length})
          </button>
          {[5, 4, 3, 2, 1]
            .filter((s) => countFor(s) > 0)
            .map((s) => (
              <button
                key={s}
                onClick={() => {
                  setFilter(s);
                  setVisibleReviewCount(REVIEWS_PER_BATCH);
                }}
                className={`${chip(filter === s)} flex items-center gap-1.5`}
              >
                {s} Stars{" "}
                <span className="text-amber-400">{"★".repeat(s)}</span>
              </button>
            ))}
        </div>

        {loading ? (
          <p className="text-center text-slate-400">Loading reviews…</p>
        ) : combined.length === 0 ? (
          <p className="text-center text-slate-400">
            No reviews yet — be the first!
          </p>
        ) : (
          <div className="review-scrollbar-hidden -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {visibleReviews.map((r, i) => (
              <article
                key={r.id}
                className="flex w-[88%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-white/[0.08] bg-card p-6 shadow-lg md:w-auto md:shrink"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <Stars rating={r.rating} className="text-sm" />
                    <span className="text-xs font-medium text-slate-500">
                      {r.source === "google"
                        ? r.relativeDate
                        : formatDate(r.date)}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300 italic">
                    "{r.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-white/[0.06] pt-3">
                  {r.photo ? (
                    <img
                      src={r.photo}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-full border border-white/10"
                    />
                  ) : (
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-extrabold ${avatarTones[i % avatarTones.length]}`}
                    >
                      {initials(r.name)}
                    </div>
                  )}
                  <div className="flex-1">
                    {r.source === "google" && r.authorUrl ? (
                      <a
                        href={r.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-white hover:text-brand-400"
                      >
                        {r.name}
                      </a>
                    ) : (
                      <p className="text-xs font-bold text-white">{r.name}</p>
                    )}
                    {r.city && (
                      <p className="text-[11px] text-slate-400">{r.city}</p>
                    )}
                  </div>
                  {r.source === "google" && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on Google"
                    >
                      <GoogleBadge />
                    </a>
                  )}
                  {isAdmin && r.source === "site" && (
                    <button
                      onClick={() => {
                        setDeleteError("");
                        setReviewToDelete(r);
                      }}
                      aria-label={`Delete review by ${r.name}`}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/20"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && visibleReviews.length < combined.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() =>
                setVisibleReviewCount((current) => current + REVIEWS_PER_BATCH)
              }
              className="rounded-xl border border-white/10 bg-card px-5 py-3 text-sm font-bold text-slate-200 transition-colors hover:border-brand-400 hover:text-white"
            >
              View more reviews
            </button>
          </div>
        )}

        <div
          id="review-form"
          className="mx-auto mt-14 max-w-2xl scroll-mt-24 rounded-3xl border border-white/[0.08] bg-card p-6 shadow-2xl sm:p-8"
        >
          <h3 className="mb-1 text-center font-display text-xl font-bold text-white">
            Leave a Review
          </h3>
          <p className="mb-6 text-center text-xs text-slate-400">
            Helps your neighbors find honest, reliable plumbing.
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div className="text-center">
              <span className="mb-1 block text-xs font-semibold text-slate-300">
                Your Rating
              </span>
              <div
                className="flex justify-center gap-1.5 text-3xl"
                onMouseLeave={() => setHover(0)}
              >
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
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  placeholder="e.g. Maria Gonzalez"
                  className="field"
                />
              </label>
              <label>
                <span className="field-label">City</span>
                <input
                  name="city"
                  value={form.city}
                  onChange={update}
                  placeholder="e.g. Pasadena, CA"
                  className="field"
                />
              </label>
            </div>
            <label className="block">
              <span className="field-label">Your Experience *</span>
              <textarea
                name="comment"
                value={form.comment}
                onChange={update}
                required
                rows={3}
                placeholder="Tell us about the service you received…"
                className="field resize-none"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl border border-brand-400/30 bg-brand-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-500 disabled:opacity-60"
            >
              {status === "loading" ? "Submitting…" : "Submit Review"}
            </button>
            {status === "needRating" && (
              <p className="text-center text-xs font-semibold text-amber-400">
                Please pick a star rating.
              </p>
            )}
            {status === "success" && (
              <p className="rounded-lg border border-emerald-500/40 bg-emerald-950/60 py-2 text-center text-xs font-semibold text-emerald-400">
                Thank you! Your review is posted.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-xs font-semibold text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>

      {reviewToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletingReview) {
              setReviewToDelete(null);
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-review-title"
            aria-describedby="delete-review-description"
            className="w-full max-w-sm space-y-5 rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
          >
            <div>
              <h3
                id="delete-review-title"
                className="font-display text-lg font-bold text-white"
              >
                Delete this review?
              </h3>
              <p
                id="delete-review-description"
                className="mt-2 text-sm leading-relaxed text-slate-300"
              >
                This will permanently remove the review by {reviewToDelete.name}
                .
              </p>
            </div>
            {deleteError && (
              <p role="alert" className="text-sm font-medium text-red-400">
                {deleteError}
              </p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={deletingReview}
                onClick={() => setReviewToDelete(null)}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingReview}
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-500 disabled:cursor-wait disabled:opacity-60"
              >
                <FontAwesomeIcon icon={faTrash} />
                {deletingReview ? "Deleting…" : "Delete review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
