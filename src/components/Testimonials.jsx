import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../lib/data'
import { ease } from '../lib/motion'
import { Reveal } from './Reveal'
import { Arrow } from './Button'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const t = testimonials[index]

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % total), 7000)
    return () => clearTimeout(id)
  }, [index, total])

  const go = (dir) => setIndex((i) => (i + dir + total) % total)

  return (
    <section className="testimonials section">
      <div className="container testimonials__grid">
        <Reveal className="label">(Kind words)</Reveal>

        <div className="testimonials__body">
          <div className="testimonials__quote-wrap" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.7, ease }}
              >
                <blockquote className="testimonials__quote">“{t.quote}”</blockquote>
                <figcaption className="testimonials__author">
                  <span className="avatar">{t.name.split(' ').map((n) => n[0]).join('')}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="testimonials__controls">
            <span className="testimonials__count">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={i === index ? 'is-active' : ''}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="testimonials__arrows">
              <button onClick={() => go(-1)} aria-label="Previous testimonial" className="round-btn round-btn--flip">
                <Arrow size={18} />
              </button>
              <button onClick={() => go(1)} aria-label="Next testimonial" className="round-btn">
                <Arrow size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
