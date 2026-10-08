import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { navLinks, socials } from '../lib/data'
import { scrollTo } from '../lib/scroll'
import { SplitLines, Reveal } from './Reveal'
import Magnetic from './Magnetic'

function Clock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular">{time} IST</span>
}

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const wordY = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])

  return (
    <footer className="footer" id="contact" ref={ref}>
      <div className="container">
        <div className="footer__cta">
          <Reveal className="label label--light">(Got a project in mind?)</Reveal>
          <SplitLines
            as="h2"
            className="h2 footer__title"
            lines={[
              <>Let’s make</>,
              <>
                something <em className="serif">great</em>
              </>,
            ]}
          />
          <Magnetic strength={0.4}>
            <a href="mailto:hello@cornflakesmedia.com" className="footer__circle">
              <span>Get in touch</span>
            </a>
          </Magnetic>
        </div>

        <div className="footer__grid">
          <div>
            <span className="footer__label">Say hello</span>
            <a href="mailto:hello@cornflakesmedia.com" className="footer__big-link">
              hello@cornflakesmedia.com
            </a>
            <a href="tel:+910000000000" className="footer__big-link">
              +91 00000 00000
            </a>
          </div>
          <div>
            <span className="footer__label">Studio</span>
            <p>
              12 Placeholder Lane
              <br />
              Mumbai, India
            </p>
            <p className="footer__muted">
              Local time — <Clock />
            </p>
          </div>
          <div>
            <span className="footer__label">Menu</span>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-roll"
                    data-text={l.label}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(l.href)
                    }}
                  >
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="footer__label">Follow</span>
            <ul>
              {socials.map((s) => (
                <li key={s}>
                  <a href="#" className="link-roll" data-text={s}>
                    <span>{s}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        <motion.span style={{ y: wordY }}>cornflakes</motion.span>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Cornflakes Media. All rights reserved.</span>
        <span>Designed & built in-house</span>
        <button className="footer__top" onClick={() => scrollTo(0)}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
