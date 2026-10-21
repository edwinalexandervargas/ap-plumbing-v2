import { useEffect, useState } from "react";

// Loads Google rating + reviews from our own /api/google-reviews function.
// If it's not set up yet (or running under plain `npm run dev`), `enabled` stays false
// and the site just shows the in-house reviews like before.
export function useGoogleReviews() {
  const [data, setData] = useState({ enabled: false, reviews: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/google-reviews");
        const isJson = res.headers.get("content-type")?.includes("application/json");
        if (res.ok && isJson) setData(await res.json());
      } catch {
        // network error → keep Google section hidden
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { ...data, reviews: data.reviews ?? [], loading };
}
