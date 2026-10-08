import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { heroImage } from '../lib/data'
import { ease, easeInOut } from '../lib/motion'
import Button from './Button'

const lines = [
  <>Brands that</>,
  <>
    <em className="serif">refuse</em> to be
  </>,
  <>
    ignored<span className="accent">.</span>
  </>,
]

function SpinningBadge() {
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id="circlePath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#circlePath">Cornflakes Media • Creative Studio • Est. 2019 •</textPath>
        </text>
      </svg>
      <span className="badge__dot" />
    </div>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  const show = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease, delay },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="container hero__intro">
        <motion.h1 className="hero__title" style={{ y: titleY }}>
          {lines.map((line, i) => (
            <span className="line" key={i}>
              <motion.span
                initial={{ y: '110%' }}
                animate={ready ? { y: '0%' } : {}}
                transition={{ duration: 1.3, ease, delay: 0.1 + i * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="hero__meta">
          <motion.p className="hero__lede" {...show(0.7)}>
            We’re a strategy-led design and content agency helping ambitious companies build brands people
            actually remember.
          </motion.p>
          <motion.div className="hero__actions" {...show(0.8)}>
            <Button href="#work">See our work</Button>
            <Button href="#contact" variant="ghost">
              Start a project
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero__media"
        initial={{ clipPath: 'inset(20% 6% 0% 6% round 24px)' }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 0px)' } : {}}
        transition={{ duration: 1.6, ease: easeInOut, delay: 0.3 }}
        data-cursor="Reel"
      >
        <motion.img src={heroImage} alt="Studio team at work" style={{ y: imgY, scale: imgScale }} />
        <div className="hero__media-label">
          <span>Showreel ’26</span>
          <span>(02:14)</span>
        </div>
        <SpinningBadge />
      </motion.div>
    </section>
  )
}
