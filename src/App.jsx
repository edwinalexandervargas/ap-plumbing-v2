import logo from './assets/logo.png'
import { business, services } from './lib/business'
import { useReviews } from './hooks/useReviews'

// Temporary setup check — replaced section by section with the Stitch design.
export default function App() {
  const { count, average, loading } = useReviews()

  return (
    <main className="min-h-screen bg-brand-light flex flex-col items-center justify-center gap-4 p-6 text-center">
      <img src={logo} alt={business.name} className="h-24" />
      <h1 className="text-3xl font-bold text-brand">{business.tagline}</h1>
      <p>{services.length} services loaded · Tailwind working</p>
      <p>{loading ? 'Connecting to Firebase…' : `Firebase connected: ${count} reviews (avg ${average ?? '–'})`}</p>
      <a href={business.phoneHref} className="rounded-lg bg-accent px-6 py-3 font-bold text-white">
        Call {business.phoneDisplay}
      </a>
    </main>
  )
}
