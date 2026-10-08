import { clients } from '../lib/data'

export default function Marquee() {
  const row = (
    <div className="marquee__group" aria-hidden="true">
      {clients.map((c) => (
        <span key={c} className="marquee__item">
          {c}
          <svg className="marquee__star" viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  )
  return (
    <section className="marquee" aria-label="Clients">
      <p className="marquee__label container">Trusted by teams at</p>
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </section>
  )
}
