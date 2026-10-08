import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ease } from '../lib/motion'

// A subtle follower that only appears over elements marked with data-cursor
export default function Cursor() {
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor]')
      setActive(!!t)
      if (t) setLabel(t.dataset.cursor)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [x, y])

  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden="true">
      <motion.span className="cursor__inner" animate={{ scale: active ? 1 : 0 }} transition={{ duration: 0.45, ease }}>
        {label}
      </motion.span>
    </motion.div>
  )
}
