import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'
import Button from './Button'

const statement =
  'We believe great brands aren’t decorated, they’re designed from the inside out. Cornflakes Media is a small, senior team of strategists, designers and storytellers who turn sharp thinking into work that moves people — and moves the needle.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <span className="word">
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = statement.split(' ')

  return (
    <section className="about section" id="about">
      <div className="container about__grid">
        <Reveal className="label">(About the studio)</Reveal>
        <div>
          <p className="about__statement" ref={ref}>
            {words.map((w, i) => {
              const start = i / words.length
              return (
                <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                  {w}
                </Word>
              )
            })}
          </p>
          <div className="about__cols">
            <Reveal as="p">
              Founded in 2019, we’ve partnered with startups, scale-ups and household names across food, tech,
              hospitality and culture.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Every project is led by the people you meet on day one — no hand-offs, no junior bait-and-switch.
              Just honest collaboration.
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Button href="#contact" variant="ghost">
              About us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
