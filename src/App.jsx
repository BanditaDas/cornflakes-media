import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { setLenis, startScroll, stopScroll } from './lib/scroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Services from './components/Services'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  // Smooth scrolling (skipped for users who prefer reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    setLenis(lenis)
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', loading)
    if (loading) {
      window.scrollTo(0, 0)
      stopScroll()
    } else startScroll()
  }, [loading])

  const done = useCallback(() => setLoading(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={done} />}</AnimatePresence>
      <Cursor />
      <Nav ready={!loading} />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Process />
        <Testimonials />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
