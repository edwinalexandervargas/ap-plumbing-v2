/* global process */
// Vercel serverless function: GET /api/google-reviews
// Fetches AP Plumbing's Google rating + reviews from the Places API (New).
// The API key stays here on the server — it never reaches the browser.
//
// Required Vercel environment variables (NOT prefixed with VITE_):
//   GOOGLE_PLACES_API_KEY  – restricted to "Places API (New)"
//   GOOGLE_PLACE_ID        – Angel's Place ID (starts with "ChIJ...")

const CACHE_HOURS = 6; // ~120 Google calls/month max, well inside the free tier

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Not configured yet → tell the site to simply hide the Google section
  if (!key || !placeId) {
    return res.status(200).json({ enabled: false });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
    });

    if (!response.ok) {
      console.error("Places API error", response.status, await response.text());
      return res.status(200).json({ enabled: false });
    }

    const place = await response.json();

    const reviews = (place.reviews ?? []).map((r) => ({
      id: r.name,
      source: "google",
      name: r.authorAttribution?.displayName ?? "Google user",
      photo: r.authorAttribution?.photoUri ?? null,
      authorUrl: r.authorAttribution?.uri ?? null,
      rating: r.rating,
      comment: r.text?.text ?? r.originalText?.text ?? "",
      date: r.publishTime ?? null,
      relativeDate: r.relativePublishTimeDescription ?? "",
      url: r.googleMapsUri ?? place.googleMapsUri ?? null,
    }));

    // Vercel's CDN caches this response, so Google is only called every few hours
    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${CACHE_HOURS * 3600}, stale-while-revalidate=86400`
    );

    return res.status(200).json({
      enabled: true,
      rating: place.rating ?? null,
      count: place.userRatingCount ?? 0,
      mapsUrl: place.googleMapsUri ?? null,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
      reviews,
    });
  } catch (err) {
    console.error("google-reviews failed", err);
    return res.status(200).json({ enabled: false });
  }
}
