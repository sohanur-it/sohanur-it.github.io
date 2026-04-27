import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBriefcase, FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { experiences } from '../data/experience'

const VP = { once: false, margin: '-80px' }

const wordVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function TimelineLine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <div ref={ref} className="absolute left-[7px] top-3 bottom-3 w-px bg-dark-800 overflow-hidden">
      <motion.div
        className="w-full bg-gradient-to-b from-emerald-400 via-emerald-500/60 to-transparent"
        initial={{ height: '0%' }}
        animate={{ height: inView ? '100%' : '0%' }}
        transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      />
    </div>
  )
}

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(index === 0)
  const PREVIEW = 2

  const cardVariant = {
    hidden:  {
      opacity: 0,
      x: -40,
      filter: 'blur(5px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 },
    },
  }

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={VP}
      className="relative pl-10 md:pl-14"
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={VP}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.2, type: 'spring', stiffness: 300 }}
        className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center
          ${exp.current
            ? 'border-emerald-400 bg-emerald-400/20 shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-glow-ring'
            : 'border-slate-600 bg-dark-900'
          }`}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${exp.current ? 'bg-emerald-400' : 'bg-slate-500'}`} />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className={`group rounded-2xl border transition-all duration-300 overflow-hidden
          ${exp.current
            ? 'bg-emerald-500/[0.04] border-emerald-500/20 hover:border-emerald-500/45 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]'
            : 'bg-white/[0.03] border-white/[0.07] hover:border-white/[0.16] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
          }`}
      >
        <div className="p-5 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {exp.current && (
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-emerald-400
                                   bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full
                                   animate-pulse">
                    Current
                  </span>
                )}
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500
                                 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
                  {exp.type}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{exp.role}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <FiBriefcase size={12} className="text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">{exp.company}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-mono font-semibold text-slate-400 whitespace-nowrap">{exp.period}</p>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <FiMapPin size={11} className="text-slate-500" />
                <span className="text-xs text-slate-500">{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Bullets */}
          <ul className="space-y-2 mb-4">
            {(expanded ? exp.bullets : exp.bullets.slice(0, PREVIEW)).map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-2.5 text-sm text-slate-400 leading-relaxed"
              >
                <span className="text-emerald-400 mt-1 shrink-0 text-xs">▹</span>
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Toggle */}
          {exp.bullets.length > PREVIEW && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500
                         hover:text-emerald-400 transition-colors mb-4"
            >
              {expanded
                ? <><FiChevronUp size={13} /> Show less</>
                : <><FiChevronDown size={13} /> {exp.bullets.length - PREVIEW} more</>
              }
            </button>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + i * 0.04 }}
                whileHover={{ y: -2, scale: 1.05 }}
                className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-md
                           bg-white/[0.04] border border-white/[0.07] text-slate-400
                           hover:border-emerald-500/30 hover:text-emerald-400 transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const words = 'Experience'.split('')

  return (
    <section id="experience" className="py-28 bg-dark-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="text-center mb-16"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.16em] uppercase
                             text-emerald-400 bg-emerald-500/10 border border-emerald-500/30
                             px-3 py-1 rounded-full mb-3">
              Work History
            </span>
          </motion.div>

          {/* Letter-by-letter title */}
          <h2 className="text-4xl font-extrabold text-slate-50 tracking-tight overflow-hidden">
            <motion.span
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="inline-flex"
            >
              {words.map((ch, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                  className="inline-block"
                  style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </motion.span>
          </h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5 } } }}
            className="text-slate-400 text-sm mt-3"
          >
            Nearly 7 years building backend systems, AI-native products, and cloud infrastructure.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <TimelineLine />
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
