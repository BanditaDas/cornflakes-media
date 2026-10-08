import { motion } from 'framer-motion'
import { ease } from '../lib/motion'

export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </M>
  )
}

// Masked line-by-line heading reveal. The visibility trigger lives on the
// heading itself — the masked spans start fully clipped and would never intersect.
export function SplitLines({ lines, className, as = 'h2', delay = 0 }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <motion.span
            variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
