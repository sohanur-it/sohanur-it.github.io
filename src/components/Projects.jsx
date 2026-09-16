import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { FiPlay, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'

const VP = { once: false, margin: '-80px' }

const wordVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

/* Badge icon inferred from each project's existing link — content/data untouched */
function BadgeIcon({ project }) {
  const href = project.link?.href || ''
  const label = project.link?.label || ''
  if (href.includes('github.com')) return <FaGithub size={16} />
  if (href.includes('youtube.com') || label.toLowerCase().includes('watch') || label.toLowerCase().includes('demo')) return <FiPlay size={16} />
  return <FiExternalLink size={16} />
}

const ITEMS_PER_PAGE = 3
const AUTO_SCROLL_INTERVAL = 5000

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(0)
  const isPaused = useRef(false)
  const autoTimer = useRef(null)

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const start = page * ITEMS_PER_PAGE
  const visible = projects.slice(start, start + ITEMS_PER_PAGE)

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const goNext = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages])

  /* Auto-scroll, paused on hover — same carousel behavior as the reference design */
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      if (isPaused.current) return
      setPage((p) => (p + 1) % totalPages)
    }, AUTO_SCROLL_INTERVAL)
    return () => clearInterval(autoTimer.current)
  }, [totalPages])

  return (
    <section id="projects" className="py-28 bg-dark-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="text-center mb-16"
        >
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}>
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.16em] uppercase
                             text-emerald-400 bg-emerald-500/10 border border-emerald-500/30
                             px-3 py-1 rounded-full mb-3">
              What I've Built
            </span>
          </motion.div>

          <h2 className="text-4xl font-extrabold text-slate-50 tracking-tight overflow-hidden">
            <motion.span
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="inline-flex flex-wrap justify-center gap-x-3"
            >
              {['Selected', 'Projects'].map((w, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block">{w}</motion.span>
              ))}
            </motion.span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="flex items-center gap-4"
          onMouseEnter={() => { isPaused.current = true }}
          onMouseLeave={() => { isPaused.current = false }}
        >
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            disabled={page === 0}
            aria-label="Previous projects"
            className="shrink-0 w-11 h-11 rounded-full border-2 border-emerald-400/40 text-emerald-400
                       flex items-center justify-center transition-all
                       hover:bg-emerald-400 hover:text-dark-900 hover:border-emerald-400
                       disabled:opacity-20 disabled:pointer-events-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Cards track */}
          <div className="flex-1 min-h-[400px] grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {visible.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }}
                  exit={{ opacity: 0, y: 30, transition: { duration: 0.3, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] } }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelected(project)}
                  className="group bg-[#1a1a1a] border border-emerald-500/[0.15] rounded-2xl overflow-hidden
                             cursor-pointer hover:border-emerald-400/40
                             hover:shadow-[0_12px_32px_rgba(16,185,129,0.2)]
                             transition-[border-color,box-shadow] duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-60 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Link-type badge — same circular accent badge as the reference design */}
                    <motion.span
                      whileHover={{ scale: 1.15 }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-emerald-400 text-dark-900
                                 flex items-center justify-center transition-colors
                                 group-hover:bg-white"
                    >
                      <BadgeIcon project={project} />
                    </motion.span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button
            onClick={goNext}
            disabled={page === totalPages - 1}
            aria-label="Next projects"
            className="shrink-0 w-11 h-11 rounded-full border-2 border-emerald-400/40 text-emerald-400
                       flex items-center justify-center transition-all
                       hover:bg-emerald-400 hover:text-dark-900 hover:border-emerald-400
                       disabled:opacity-20 disabled:pointer-events-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full border-2 border-emerald-400 transition-all
                ${i === page ? 'bg-emerald-400 scale-[1.3]' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
