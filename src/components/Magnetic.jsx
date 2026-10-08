import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const spring = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x, y, display: 'inline-block' }}>
      {children}
    </motion.div>
  )
}
