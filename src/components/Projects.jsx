import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMaximize2, FiTag } from 'react-icons/fi'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'

const VP = { once: false, margin: '-80px' }

/* Each card enters from a different direction for visual variety */
const directions = [
  { x: -40, y: 0  },
  { x:   0, y: 40 },
  { x:  40, y: 0  },
  { x: -40, y: 0  },
  { x:   0, y: 40 },
  { x:  40, y: 0  },
]

const wordVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const dir = directions[i % directions.length]
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: dir.x, y: dir.y, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={VP}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                onClick={() => setSelected(project)}
                className="group bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden
                           cursor-pointer hover:border-emerald-500/35
                           hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(16,185,129,0.1)]
                           transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-44 bg-dark-900">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50
                                 flex items-center justify-center backdrop-blur-sm"
                    >
                      <FiMaximize2 className="text-emerald-400" size={18} />
                    </motion.div>
                  </div>
                  {/* Index badge */}
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-dark-900/80 border border-white/10
                                  flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[0.6rem] font-bold text-slate-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-100 mb-1.5 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.75 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 + ti * 0.06 }}
                        className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full
                                   bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
