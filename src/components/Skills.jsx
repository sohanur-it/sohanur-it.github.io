import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillBars, techCategories } from '../data/skills'

const VP = { once: false, margin: '-80px' }

const COLOR_MAP = {
  emerald: {
    tag:   'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-500/15',
    label: 'text-emerald-400',
    dot:   'bg-emerald-400',
    glow:  'hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    border: 'hover:border-emerald-500/40',
  },
  violet: {
    tag:   'bg-violet-500/10 border-violet-500/20 text-violet-400 hover:border-violet-400/50 hover:bg-violet-500/15',
    label: 'text-violet-400',
    dot:   'bg-violet-400',
    glow:  'hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
    border: 'hover:border-violet-500/40',
  },
  sky: {
    tag:   'bg-sky-500/10 border-sky-500/20 text-sky-400 hover:border-sky-400/50 hover:bg-sky-500/15',
    label: 'text-sky-400',
    dot:   'bg-sky-400',
    glow:  'hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]',
    border: 'hover:border-sky-500/40',
  },
  amber: {
    tag:   'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/15',
    label: 'text-amber-400',
    dot:   'bg-amber-400',
    glow:  'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    border: 'hover:border-amber-500/40',
  },
  rose: {
    tag:   'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:border-rose-400/50 hover:bg-rose-500/15',
    label: 'text-rose-400',
    dot:   'bg-rose-400',
    glow:  'hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]',
    border: 'hover:border-rose-500/40',
  },
  slate: {
    tag:   'bg-white/[0.04] border-white/[0.09] text-slate-400 hover:border-white/20 hover:bg-white/[0.07]',
    label: 'text-slate-400',
    dot:   'bg-slate-400',
    glow:  'hover:shadow-[0_0_20px_rgba(148,163,184,0.1)]',
    border: 'hover:border-white/20',
  },
}

function SkillBar({ name, level, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="mb-5 last:mb-0"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-200">{name}</span>
        <motion.span
          className="text-xs font-bold font-mono text-emerald-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.4 + index * 0.08 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full
                     shadow-[0_0_8px_rgba(16,185,129,0.45)]"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.08 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const words = ['Skills']

  return (
    <section id="skills" className="py-28 bg-dark-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="text-center mb-16"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: -20, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
          >
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.16em] uppercase
                             text-emerald-400 bg-emerald-500/10 border border-emerald-500/30
                             px-3 py-1 rounded-full mb-3">
              What I Work With
            </span>
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
            className="text-4xl font-extrabold text-slate-50 tracking-tight"
          >
            Skills
          </motion.h2>
        </motion.div>

        {/* Layout */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 mb-12">

          {/* Skill bars panel */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={VP}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6
                       hover:border-white/[0.1] transition-colors"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Proficiency
            </p>
            {skillBars.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} index={i} />
            ))}
          </motion.div>

          {/* Category cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {techCategories.map((cat, ci) => {
              const c = COLOR_MAP[cat.color]
              /* Alternate entrance direction per row */
              const xDir = ci % 2 === 0 ? 40 : -40

              return (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, x: xDir, y: 20, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                  viewport={VP}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: ci * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`bg-white/[0.02] border border-white/[0.06] rounded-xl p-4
                              transition-all duration-300 ${c.border} ${c.glow}`}
                >
                  {/* Label */}
                  <div className="flex items-center gap-2 mb-3">
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: ci * 0.4 }}
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`}
                    />
                    <span className={`text-[0.68rem] font-bold uppercase tracking-widest ${c.label}`}>
                      {cat.label}
                    </span>
                  </div>

                  {/* Tags */}
                  <motion.div
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="flex flex-wrap gap-1.5"
                  >
                    {cat.tags.map(tag => (
                      <motion.span
                        key={tag}
                        variants={{
                          hidden:  { opacity: 0, scale: 0.7, y: 6 },
                          visible: { opacity: 1, scale: 1,   y: 0, transition: { duration: 0.3 } },
                        }}
                        whileHover={{ y: -2, scale: 1.07 }}
                        className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-md border
                                    transition-all cursor-default ${c.tag}`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
