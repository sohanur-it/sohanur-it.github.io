import { motion } from 'framer-motion'
import { FiCode, FiServer, FiCpu, FiZap, FiDownload, FiArrowRight } from 'react-icons/fi'
import { openResumePreview } from './ResumePreview'

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

export default function About() {
  const words = 'About Me'.split(' ')

  return (
    <section id="about" className="py-28 bg-[#fafafa] overflow-hidden">
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
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight overflow-hidden">
            <motion.span variants={stagger} initial="hidden" whileInView="visible" viewport={VP} className="inline-flex gap-3">
              {words.map((w, i) => (
                <motion.span key={i} variants={wordVariant} className="inline-block">{w}</motion.span>
              ))}
            </motion.span>
          </h2>
        </motion.div>

        {/* Split layout — framed photo left, bio + CTAs right (Tasmia-style About section) */}
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: framed image with reveal-panel + offset accent frame */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="relative shrink-0 w-full max-w-[320px] lg:w-[42%] lg:max-w-none"
          >
            <div className="relative rounded-xl overflow-hidden max-h-[450px]">
              <img
                src="/assets/img/about.jpg"
                alt="Sohanur Rahman"
                className="w-full h-[450px] object-cover object-top rounded-xl"
              />
              {/* Reveal panel — slides away on scroll-into-view */}
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={VP}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
                style={{ transformOrigin: 'right center' }}
                className="absolute inset-0 bg-emerald-400 rounded-xl"
              />
            </div>
          </motion.div>

          {/* Right: bio + highlights + CTAs */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="flex-1"
          >
            <motion.p variants={fadeRight} className="text-slate-600 text-[1.035rem] leading-relaxed mb-5">
              I am a{' '}
              <strong className="text-slate-900 font-semibold">full stack developer</strong> with
              extensive experience in system administration. Passionate and enthusiastic, with
              exceptional strength in handling critical problem-solving activities.
            </motion.p>
            <motion.p variants={fadeRight} className="text-slate-600 text-[1.035rem] leading-relaxed mb-8">
              My primary stack is{' '}
              <strong className="text-slate-900 font-semibold">Python</strong> (Django, Django REST
              Framework, Celery + Redis),{' '}
              <strong className="text-slate-900 font-semibold">JavaScript / React</strong>, and
              databases such as{' '}
              <strong className="text-slate-900 font-semibold">PostgreSQL &amp; MongoDB</strong>.
              Comfortable with Docker, Kubernetes, CI/CD, and cloud deployments on AWS and Azure.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {HIGHLIGHTS.map(({ Icon, label }, i) => (
                <motion.div
                  key={label}
                  variants={{
                    hidden:  { opacity: 0, x: i % 2 === 0 ? -24 : 24, filter: 'blur(4px)' },
                    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
                  }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200
                             rounded-lg text-slate-600 text-sm font-medium shadow-sm
                             hover:border-emerald-400/50 hover:text-slate-900 hover:bg-emerald-50
                             transition-colors cursor-default"
                >
                  <Icon className="text-emerald-400 shrink-0" size={16} />
                  {label}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs — solid / outline pair, mirroring Tasmia's "Download CV" / "View Profile" buttons */}
            <motion.div variants={fadeRight} className="flex flex-wrap gap-4">
              <motion.button
                onClick={openResumePreview}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3 rounded-md border-2 border-emerald-400
                           bg-emerald-400 text-dark-900 font-bold text-sm
                           hover:bg-transparent hover:text-emerald-400 transition-all"
              >
                Download CV <FiDownload />
              </motion.button>
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3 rounded-md border-2 border-slate-900 text-slate-900
                           hover:border-emerald-500 hover:text-emerald-600 font-semibold text-sm transition-all"
              >
                View Projects <FiArrowRight />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
