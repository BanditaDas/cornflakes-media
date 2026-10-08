import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { process } from '../lib/data'
import { ease } from '../lib/motion'

// Pinned horizontal scroll on desktop, simple vertical stack on smaller screens
export default function Process() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [pinned, setPinned] = useState(false)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    const measure = () => {
      setPinned(mq.matches)
      if (!mq.matches || !trackRef.current) return setDistance(0)
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    mq.addEventListener('change', measure)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  // the reveal trigger sits on the heading; the masked words alone never intersect
  const word = (text, delay) => (
    <span className="line">
      <motion.span
        variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <section
      className={`process ${pinned ? 'process--pinned' : ''}`}
      id="process"
      ref={sectionRef}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="process__sticky">
        <motion.h2
          className="h2 process__title container"
          aria-label="Our process"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {word('Our', 0)}
          {word(<em className="serif">process</em>, 0.08)}
        </motion.h2>

        <div className="process__stage-area">
          <motion.div className="process__track" ref={trackRef} style={pinned ? { x } : undefined}>
            {process.map((s) => (
              <article
                key={s.no}
                className="stage"
              >
                <header className="stage__head">
                  <span className="stage__no">{s.no}</span>
                  <h3 className="stage__title">
                    {s.title}
                    <br />
                    {s.duration}
                  </h3>
                </header>
                <div className="stage__body">
                  <div className="stage__media">
                    <img src={s.img} alt="" loading="lazy" />
                  </div>
                  <div className="stage__copy">
                    <p className="stage__text">{s.text}</p>
                    <ul className="stage__tags">
                      {s.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
