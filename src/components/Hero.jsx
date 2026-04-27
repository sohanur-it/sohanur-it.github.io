import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaHackerrank, FaYoutube } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { useTypewriter } from '../hooks/useTypewriter'
import ParticleCanvas from './ParticleCanvas'

const SOCIALS = [
  { Icon: FaGithub,     href: 'https://github.com/sohanur-it',                                       label: 'GitHub'     },
  { Icon: FaLinkedin,   href: 'https://www.linkedin.com/in/sohanur-rahman-a7152271/',                label: 'LinkedIn'   },
  { Icon: FaHackerrank, href: 'https://www.hackerrank.com/sohanur',                                  label: 'HackerRank' },
  { Icon: FaYoutube,    href: 'https://www.youtube.com/channel/UCSJiSzDs43uWunBFP6L4tcQ/featured',  label: 'YouTube'    },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

/* Floating ring config */
const RINGS = [
  { size: 340, duration: 28, delay: 0,   opacity: 0.07, borderColor: 'rgba(16,185,129,0.5)' },
  { size: 520, duration: 40, delay: 4,   opacity: 0.05, borderColor: 'rgba(16,185,129,0.35)' },
  { size: 720, duration: 55, delay: 8,   opacity: 0.04, borderColor: 'rgba(99,102,241,0.35)' },
  { size: 940, duration: 70, delay: 12,  opacity: 0.03, borderColor: 'rgba(16,185,129,0.2)' },
]

/* Drifting SVG shapes */
const SHAPES = [
  { type: 'hex',    size: 48, x: '12%',  y: '18%', dur: 14, delay: 0   },
  { type: 'tri',    size: 36, x: '85%',  y: '14%', dur: 18, delay: 2   },
  { type: 'hex',    size: 30, x: '78%',  y: '72%', dur: 22, delay: 5   },
  { type: 'circle', size: 22, x: '8%',   y: '70%', dur: 16, delay: 3   },
  { type: 'tri',    size: 44, x: '55%',  y: '82%', dur: 20, delay: 7   },
  { type: 'circle', size: 16, x: '92%',  y: '45%', dur: 12, delay: 1   },
]

function HexPath({ size }) {
  const r = size / 2
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${r + r * Math.cos(a)},${r + r * Math.sin(a)}`
  }).join(' ')
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <polygon points={pts} stroke="rgba(16,185,129,0.45)" strokeWidth="1" />
    </svg>
  )
}

function TriPath({ size }) {
  const h = size
  return (
    <svg width={h} height={h} viewBox={`0 0 ${h} ${h}`} fill="none">
      <polygon
        points={`${h / 2},4 ${h - 4},${h - 4} 4,${h - 4}`}
        stroke="rgba(99,102,241,0.45)"
        strokeWidth="1"
      />
    </svg>
  )
}

function CirclePath({ size }) {
  const r = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={r} cy={r} r={r - 2} stroke="rgba(16,185,129,0.4)" strokeWidth="1" strokeDasharray="4 3" />
    </svg>
  )
}

export default function Hero() {
  const greeting = useTypewriter(["Hello!", "I'm Sohanur Rahman"])

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">

      {/* ── Layer 1: radial gradient base ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,185,129,0.1)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_80%,rgba(99,102,241,0.07)_0%,transparent_55%)]" />

      {/* ── Layer 2: dot-grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.55) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Layer 3: particle network canvas ── */}
      <ParticleCanvas />

      {/* ── Layer 4: animated concentric rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {RINGS.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  ring.size,
              height: ring.size,
              border: `1px solid ${ring.borderColor}`,
              opacity: ring.opacity,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] }}
            transition={{
              rotate: { duration: ring.duration, repeat: Infinity, ease: 'linear', delay: ring.delay },
              scale:  { duration: ring.duration / 3, repeat: Infinity, ease: 'easeInOut', delay: ring.delay },
            }}
          />
        ))}
      </div>

      {/* ── Layer 5: drifting geometric shapes ── */}
      <div className="absolute inset-0 pointer-events-none">
        {SHAPES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: s.x, top: s.y }}
            animate={{
              y:       [0, -18, 0],
              x:       [0, i % 2 === 0 ? 10 : -10, 0],
              rotate:  [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: s.dur,
              repeat:   Infinity,
              ease:     'easeInOut',
              delay:    s.delay,
            }}
          >
            {s.type === 'hex'    && <HexPath    size={s.size} />}
            {s.type === 'tri'    && <TriPath    size={s.size} />}
            {s.type === 'circle' && <CirclePath size={s.size} />}
          </motion.div>
        ))}
      </div>

      {/* ── Layer 6: vignette edges ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_50%,rgba(10,15,28,0.75)_100%)] pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-2xl w-full"
      >
        {/* Avatar */}
        <motion.div variants={item} className="relative mb-8 inline-block">
          <div className="absolute inset-[-14px] rounded-full border border-dashed border-emerald-500/30 animate-spin-slow" />
          <img
            src="/assets/img/sohanur.jpeg"
            alt="Sohanur Rahman"
            onError={e => { e.currentTarget.src = '/assets/img/profile.jpg' }}
            className="w-36 h-36 rounded-full object-cover border-[3px] border-emerald-400
                       shadow-[0_0_0_10px_rgba(16,185,129,0.08),0_25px_50px_rgba(0,0,0,0.7)]"
          />
          <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
        </motion.div>

        {/* Typed greeting */}
        <motion.p variants={item} className="font-mono text-emerald-400 text-lg mb-2 h-7 tracking-wide">
          {greeting}
          <span className="animate-pulse ml-0.5">|</span>
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="relative mb-4"
        >
          {'Sohanur Rahman'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.04, ease: [0.4, 0, 0.2, 1] }}
              className={`inline-block font-extrabold tracking-tight leading-[1.08] text-5xl sm:text-6xl lg:text-7xl
                ${char === ' ' ? 'mr-4' : ''}
                ${i < 7 ? 'text-slate-50' : 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent animate-gradient-x'}`}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.div variants={item} className="flex items-center gap-0 mb-8 flex-wrap justify-center">
          {['Senior Software Engineer', '·', 'AI & Graph RAG Specalist'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -20 : i === 2 ? 20 : 0, scale: i === 1 ? 0 : 1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className={`
                ${i === 1
                  ? 'mx-3 text-emerald-500 text-base font-bold'
                  : 'text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-slate-400 hover:text-emerald-400 transition-colors duration-300'}
              `}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Social icons */}
        <motion.div variants={item} className="flex gap-3 mb-8">
          {SOCIALS.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              whileHover={{ y: -5, scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400
                         bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm
                         hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10
                         hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-colors"
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex gap-3 flex-wrap justify-center">
          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400
                       text-dark-900 font-bold text-sm rounded-lg
                       transition-all hover:shadow-[0_10px_28px_rgba(16,185,129,0.45)]"
          >
            Hire Me <FiArrowRight />
          </motion.button>
          <motion.button
            onClick={() => scrollTo('#projects')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center px-6 py-3 border border-white/[0.12] text-slate-300
                       hover:text-slate-100 hover:border-emerald-500/35 hover:bg-white/[0.05]
                       font-medium text-sm rounded-lg backdrop-blur-sm transition-all"
          >
            View Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group"
        aria-label="Scroll to about"
      >
        <div className="w-6 h-10 border-2 border-white/15 group-hover:border-emerald-500/50 rounded-full flex justify-center transition-colors">
          <span className="w-1 h-2 bg-emerald-400 rounded-full mt-1.5 animate-scroll-dot" />
        </div>
      </button>
    </section>
  )
}
