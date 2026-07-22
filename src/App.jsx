import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

// Code-split secondary routes so the homepage bundle stays lean
const Menu = lazy(() => import('./pages/Menu.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title =
      pathname === '/menu'
        ? 'Full Menu — Kypriaki Taverna, Paphos'
        : 'Kypriaki Taverna — Authentic Cypriot Dining in Paphos'
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.href = `https://kypriaki-taverna.vercel.app${pathname === '/' ? '/' : pathname}`
    }
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main id="content">
        <Suspense fallback={<div className="min-h-screen bg-cream" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
