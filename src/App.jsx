import TopBanner from "./components/TopBanner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useReviews } from "./hooks/useReviews";
import { useAuth } from "./hooks/useAuth";
import { useGoogleReviews } from "./hooks/useGoogleReviews";

export default function App() {
  // Loaded once here so the header badge, hero rating and review list all share the same data
  const reviewsApi = useReviews();
  const auth = useAuth();
  const googleApi = useGoogleReviews();

  return (
    <div className="min-h-screen bg-night font-sans text-slate-300 antialiased selection:bg-brand-500 selection:text-white">
      <TopBanner />
      <Header average={reviewsApi.average} />
      <main>
        <Hero average={reviewsApi.average} count={reviewsApi.count} />
        <About />
        <Services />
        <Reviews reviewsApi={reviewsApi} googleApi={googleApi} isAdmin={auth.isAdmin} />
        <Contact />
      </main>
      <Footer auth={auth} />
    </div>
  );
}
