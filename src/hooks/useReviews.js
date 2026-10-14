import { useEffect, useMemo, useState } from "react";
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Same Firestore "reviews" collection as the old site, so every existing review carries over.
export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(0); // 0 = all

  useEffect(() => {
    (async () => {
      const snap = await getDocs(query(collection(db, "reviews"), orderBy("date", "desc")));
      setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(
    () => (filter === 0 ? reviews : reviews.filter((r) => r.rating === filter)),
    [reviews, filter]
  );

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const addReview = async ({ name, rating, comment }) => {
    if (!name || !comment || !rating) return false;
    const review = { name, rating, comment, date: new Date().toISOString().split("T")[0] };
    const ref = await addDoc(collection(db, "reviews"), review);
    setReviews((prev) => [{ id: ref.id, ...review }, ...prev]); // keeps id so it can be deleted right away
    return true;
  };

  const deleteReview = async (id) => {
    await deleteDoc(doc(db, "reviews", id));
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return { reviews, filtered, loading, filter, setFilter, average, count: reviews.length, addReview, deleteReview };
}
