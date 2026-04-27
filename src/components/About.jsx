import { motion } from 'framer-motion'
import { FiCode, FiServer, FiCpu, FiZap } from 'react-icons/fi'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

/* ── Shared variants ── */
const VP = { once: false, margin: '-90px' }

const fadeUp = {
  hidden:  { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}
const fadeLeft = {
  hidden:  { opacity: 0, x: -36, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}
const fadeRight = {
  hidden:  { opacity: 0, x: 36,  filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0,   filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}
const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1,    filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const wordVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

const HIGHLIGHTS = [
  { Icon: FiCode,   label: 'Full Stack Development' },
  { Icon: FiServer, label: 'System Administration'  },
  { Icon: FiZap,    label: 'AI & ML Enthusiast'     },
  { Icon: FiCpu,    label: 'IoT & Embedded Systems' },
]

const STATS = [
  { raw: '7+', label: 'Years Experience' },
  { raw: '50+', label: 'Projects Built'  },
  { raw: '∞',  label: 'Things to Learn'  },
]

function AnimatedStat({ raw, label }) {
  const isInfinity = raw === '∞'
  const { display, ref } = useAnimatedCounter(isInfinity ? '∞' : raw)

  return (
    <div ref={ref} className="py-5">
      <motion.span
        variants={scaleIn}
        className="block text-4xl font-extrabold text-emerald-400 tracking-tight leading-none mb-1"
      >
        {isInfinity ? '∞' : display}
      </motion.span>
      <span className="text-[0.7rem] uppercase tracking-[0.14em] text-slate-500 font-semibold">
        {label}
      </span>
    </div>
  )
}

export default function About() {
  const words = 'About Me'.split(' ')

  return (
    <section id="about" className="py-28 bg-dark-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.16em] uppercase
                             text-emerald-400 bg-emerald-500/10 border border-emerald-500/30
                             px-3 py-1 rounded-full mb-3">
              Who I Am
            </span>
          </motion.div>
          <h2 className="text-4xl font-extrabold text-slate-50 tracking-tight overflow-hidden">
            <motion.span variants={stagger} initial="hidden" whileInView="visible" viewport={VP} className="inline-flex gap-3">
              {words.map((w, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block">{w}</motion.span>
              ))}
            </motion.span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-[1fr_260px] gap-12 items-start">

          {/* Left: text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <motion.p variants={fadeLeft} className="text-slate-400 text-[1.035rem] leading-relaxed mb-5">
              I am a{' '}
              <strong className="text-slate-200 font-semibold">full stack developer</strong> with
              extensive experience in system administration. Passionate and enthusiastic, with
              exceptional strength in handling critical problem-solving activities.
            </motion.p>
            <motion.p variants={fadeLeft} className="text-slate-400 text-[1.035rem] leading-relaxed mb-8">
              My primary stack is{' '}
              <strong className="text-slate-200 font-semibold">Python</strong> (Django, Django REST
              Framework, Celery + Redis),{' '}
              <strong className="text-slate-200 font-semibold">JavaScript / React</strong>, and
              databases such as{' '}
              <strong className="text-slate-200 font-semibold">PostgreSQL &amp; MongoDB</strong>.
              Comfortable with Docker, Kubernetes, CI/CD, and cloud deployments on AWS and Azure.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HIGHLIGHTS.map(({ Icon, label }, i) => (
                <motion.div
                  key={label}
                  variants={{
                    hidden:  { opacity: 0, x: i % 2 === 0 ? -24 : 24, filter: 'blur(4px)' },
                    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
                  }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.07]
                             rounded-lg text-slate-400 text-sm font-medium
                             hover:border-emerald-500/30 hover:text-slate-200 hover:bg-emerald-500/[0.04]
                             transition-colors cursor-default"
                >
                  <Icon className="text-emerald-400 shrink-0" size={16} />
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: stats card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 text-center
                       backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)] lg:sticky lg:top-24
                       hover:border-emerald-500/25 transition-colors"
          >
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={VP}>
              {STATS.map((s, i) => (
                <div key={s.label}>
                  <AnimatedStat raw={s.raw} label={s.label} />
                  {i < STATS.length - 1 && <div className="h-px bg-white/[0.06]" />}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
