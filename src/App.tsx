import { useEffect, useState } from 'react'
import InsightsPage from './pages/InsightsPage'
import Navbar from './components/Navbar'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ReviewsSection from './sections/ReviewsSection'
import ContactSection from './sections/ContactSection'
import { usePageTracking } from './hooks/usePageTracking'

// ── Minimal client-side router (no external dependency) ───────
function useRoute() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const handler = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])
  return path
}

// ── Landing page wrapper (tracks visits) ─────────────────────
function LandingPage() {
  usePageTracking('/')
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

// ── App router ───────────────────────────────────────────────
export default function App() {
  const path = useRoute()
  const parts = path.split('/').filter(Boolean) // ['insights', '<key>']

  if (parts[0] === 'insights') {
    return <InsightsPage secretKey={parts[1] ?? ''} />
  }

  return <LandingPage />
}
