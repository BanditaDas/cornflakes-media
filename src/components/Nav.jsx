import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { navLinks, socials } from '../lib/data'
import { ease, easeInOut } from '../lib/motion'
import { scrollTo, startScroll, stopScroll } from '../lib/scroll'
import Button from './Button'

const sectionIds = navLinks.map((l) => l.href.slice(1))

// Six-pointed "flake" mark that turns as the page scrolls
function Flake({ rotate }) {
  return (
    <motion.svg className="flake" viewBox="0 0 32 32" style={{ rotate }} aria-hidden="true">
      {[0, 60, 120].map((deg) => (
        <rect key={deg} x="14" y="2" width="4" height="28" rx="2" transform={`rotate(${deg} 16 16)`} />
      ))}
    </motion.svg>
  )
}

export default function Nav({ ready }) {
  const { scrollY, scrollYProgress } = useScroll()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720])
  const [floating, setFloating] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    // shrink into a floating capsule once past the first half screen
    setFloating(y > window.innerHeight * 0.5)

    // the section crossing the middle of the viewport is the active one
    const mid = window.innerHeight / 2
    const current = sectionIds.find((id) => {
      const r = document.getElementById(id)?.getBoundingClientRect()
      return r && r.top <= mid && r.bottom > mid
    })
    setActive(current ?? null)
  })

  useEffect(() => {
    if (open) stopScroll()
    else startScroll()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // wait a tick so scrolling is re-enabled before we move
    setTimeout(() => scrollTo(href), 50)
  }

  return (
    <>
      <motion.header
        className={`nav ${floating && !open ? 'nav--float' : ''} ${open ? 'nav--open' : ''}`}
        initial={{ y: '-120%' }}
        animate={{ y: ready ? '0%' : '-120%' }}
        transition={{ duration: 1, ease, delay: 0.2 }}
      >
        <div className="nav__inner">
          <a href="#top" className="logo" onClick={(e) => go(e, 0)} aria-label="Cornflakes Media home">
            <Flake rotate={rotate} />
            <span className="logo__word">
              cornflakes<span className="logo__media">media</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
            {navLinks.map((l, i) => {
              const id = l.href.slice(1)
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  onPointerEnter={() => setHovered(id)}
                  className={`nav__link ${active === id ? 'is-active' : ''} ${floating && (hovered ?? active) === id ? 'has-pill' : ''}`}
                  aria-current={active === id ? 'location' : undefined}
                >
                  {floating && (hovered ?? active) === id && (
                    <motion.span
                      className="nav__pill"
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="link-roll" data-text={l.label}>
                    <span>{l.label}</span>
                  </span>
                  <sup className="nav__index">0{i + 1}</sup>
                </a>
              )
            })}
          </nav>

          <div className="nav__cta">
            <Button href="#contact" variant="dark" magnetic={false}>
              Let’s talk
            </Button>
          </div>

          <button
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="nav__burger-label link-roll" data-text={open ? 'Close' : 'Menu'}>
              <span>{open ? 'Close' : 'Menu'}</span>
            </span>
            <span className="nav__burger-icon">
              <span />
              <span />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: easeInOut }}
          >
            <div className="menu__inner container">
              <ul className="menu__links">
                {[...navLinks, { label: 'Contact', href: '#contact' }].map((l, i) => (
                  <li key={l.href} className="line">
                    <motion.a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%' }}
                      transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}
                    >
                      <span className="menu__no">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.div
                className="menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a href="mailto:hello@cornflakesmedia.com">hello@cornflakesmedia.com</a>
                <div className="menu__socials">
                  {socials.map((s) => (
                    <a key={s} href="#">{s}</a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
