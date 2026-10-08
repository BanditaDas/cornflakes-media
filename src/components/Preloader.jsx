import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import { heroImage, projects } from '../lib/data'
import { ease } from '../lib/motion'

// Work shots that flick through the frame between the two words
const shots = [...projects.map((p) => p.img), heroImage]
// each shot gets its own frame width (in em), so the words shift as it changes
const widths = [1.1, 0.75, 1.55, 0.95, 1.35, 0.7, 1.2]

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let timer
    const controls = animate(0, 100, {
      duration: 2.6,
      delay: 0.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        timer = setTimeout(onDone, 350)
      },
    })
    return () => {
      controls.stop()
      clearTimeout(timer)
    }
  }, [onDone])

  // step through the shots as the counter climbs, landing on the last one at 100
  const shot = Math.min(shots.length - 1, Math.floor((count / 100) * shots.length))

  const word = (text, delay) => (
    <span className="preloader__mask">
      <motion.span
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        exit={{ y: '-105%', transition: { duration: 0.6, ease } }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.6 } }}
      role="progressbar"
      aria-label="Loading Cornflakes Media"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="preloader__row">
        {word('Corn', 0.1)}

        <motion.span
          className="preloader__frame"
          initial={{ width: '0em' }}
          animate={{ width: `${widths[shot]}em` }}
          exit={{ width: '0em', transition: { duration: 0.6, ease } }}
          transition={count === 0 ? { duration: 1, ease, delay: 0.45 } : { duration: 0.5, ease }}
        >
          {shots.map((src, i) => (
            <img key={src} src={src} alt="" style={{ opacity: i === shot ? 1 : 0 }} />
          ))}
          <motion.span className="preloader__count" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
            {String(count).padStart(3, '0')}
          </motion.span>
        </motion.span>

        {word('Flakes', 0.18)}
      </div>
    </motion.div>
  )
}
