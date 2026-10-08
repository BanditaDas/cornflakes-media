import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { services } from '../lib/data'
import { ease } from '../lib/motion'
import { SplitLines, Reveal } from './Reveal'
import { Arrow } from './Button'

export default function Services() {
  const ref = useRef(null)
  const [active, setActive] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 })
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section className="services section" id="services" ref={ref} onPointerMove={onMove}>
      <div className="container">
        <div className="section-head">
          <SplitLines
            className="h2"
            lines={[
              <>
                What we <em className="serif">do</em>
              </>,
            ]}
          />
          <Reveal className="section-head__meta">
            <span className="label">(Capabilities)</span>
            <p>End-to-end creative, or exactly the piece you need. We plug in wherever we add the most value.</p>
          </Reveal>
        </div>

        <ul className="services__list" onPointerLeave={() => setActive(null)}>
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              className={`service ${active !== null && active !== i ? 'service--dim' : ''}`}
              onPointerEnter={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.05 }}
            >
              <span className="service__no">0{i + 1}</span>
              <div className="service__main">
                <h3 className="service__title">{s.title}</h3>
                <p className="service__text">{s.text}</p>
              </div>
              <ul className="service__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="service__arrow">
                <Arrow size={22} />
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        className="services__preview"
        style={{ x, y }}
        animate={{ scale: active !== null ? 1 : 0, opacity: active !== null ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
        aria-hidden="true"
      >
        <div className="services__preview-inner" style={{ transform: `translateY(${-(active ?? 0) * 100}%)` }}>
          {services.map((s) => (
            <img key={s.title} src={s.img} alt="" loading="lazy" />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
