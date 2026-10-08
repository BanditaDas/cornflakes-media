import { forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, workFilters } from '../lib/data'
import { ease } from '../lib/motion'
import { SplitLines, Reveal } from './Reveal'
import Button, { Arrow } from './Button'

const ProjectCard = forwardRef(function ProjectCard({ project, number, delay }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      className="project"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.35 } }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay, layout: { duration: 0.7, ease } }}
    >
      <a href="#" className="project__link" data-cursor="View" onClick={(e) => e.preventDefault()}>
        <div className="project__media">
          <img src={project.img} alt={project.title} loading="lazy" />
          <span className="project__chip">{project.category}</span>
          <span className="project__go" aria-hidden="true">
            <Arrow size={16} />
          </span>
          <div className="project__hover">
            <p>{project.desc}</p>
          </div>
        </div>
        <div className="project__info">
          <span className="project__no">{String(number).padStart(2, '0')}</span>
          <div className="project__meta">
            <h3 className="project__title">{project.title}</h3>
            <p className="project__services">{project.tags.join(' · ')}</p>
          </div>
          <span className="project__year">{project.year}</span>
        </div>
      </a>
    </motion.article>
  )
})

export default function Work() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const count = (f) => (f === 'All' ? projects.length : projects.filter((p) => p.category === f).length)

  return (
    <section className="work section" id="work">
      <div className="container">
        <div className="work__head">
          <div>
            <Reveal className="label">(Selected work)</Reveal>
            <SplitLines
              className="h2 work__title"
              lines={[
                <>
                  Work we’re <em className="serif">proud</em> of
                </>,
              ]}
            />
          </div>

          <Reveal className="work__filters" delay={0.1}>
            {workFilters.map((f) => (
              <button
                key={f}
                className={`work__filter ${filter === f ? 'is-active' : ''}`}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
              >
                {filter === f && (
                  <motion.span
                    className="work__filter-pill"
                    layoutId="work-filter"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {f}
                <sup>{String(count(f)).padStart(2, '0')}</sup>
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="work__grid">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.title} project={p} number={projects.indexOf(p) + 1} delay={(i % 3) * 0.1} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="work__foot">
          <p>
            Every project starts with a conversation. <span>Yours could be next.</span>
          </p>
          <Button href="#contact">View all projects</Button>
        </Reveal>
      </div>
    </section>
  )
}
