import Magnetic from './Magnetic'
import { scrollTo } from '../lib/scroll'

export function Arrow({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M6 18L18 6M18 6H8M18 6v10" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export default function Button({ children, href = '#contact', variant = 'dark', magnetic = true }) {
  const onClick = (e) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      scrollTo(href)
    }
  }
  const btn = (
    <a href={href} onClick={onClick} className={`btn btn--${variant}`}>
      <span className="btn__label" data-text={children}>
        <span>{children}</span>
      </span>
      <span className="btn__arrow">
        <Arrow />
      </span>
    </a>
  )
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn
}
