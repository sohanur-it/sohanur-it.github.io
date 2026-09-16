import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaHackerrank, FaYoutube } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { useTypewriter } from '../hooks/useTypewriter'

const SOCIALS = [
  { Icon: FaGithub,     href: 'https://github.com/sohanur-it',                                       label: 'GitHub'     },
  { Icon: FaLinkedin,   href: 'https://www.linkedin.com/in/sohanur-rahman-a7152271/',                label: 'LinkedIn'   },
  { Icon: FaHackerrank, href: 'https://www.hackerrank.com/sohanur',                                  label: 'HackerRank' },
  { Icon: FaYoutube,    href: 'https://www.youtube.com/channel/UCSJiSzDs43uWunBFP6L4tcQ/featured',  label: 'YouTube'    },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
}

export default function Hero() {
  const role = useTypewriter(['Senior Software Engineer', 'AI & Graph RAG Specialist', 'Full Stack Developer'])

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-900"
    >
      {/* Photo pinned to the right side, not stretched full-bleed — Tasmia-style split hero */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] pointer-events-none">
        <img
          src="/assets/img/sohanur.jpeg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top opacity-40 lg:opacity-100"
        />
        {/* Fade the photo into the background on its left/bottom edges so it blends with the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/60 to-transparent lg:to-dark-900/0" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 sm:px-12 lg:px-20 max-w-3xl w-full"
      >
        <motion.div variants={item} className="text-lg sm:text-xl text-slate-300 mb-1">
          Hello, my name is
        </motion.div>

        <motion.h1
          variants={item}
          className="mb-2 text-6xl sm:text-7xl lg:text-8xl text-white"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Sohanur Rahman
        </motion.h1>

        <motion.div variants={item} className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-200 mb-8 min-h-[1.4em]">
          & I am a{' '}
          <span className="text-emerald-400">
            {role}
            <span className="animate-pulse ml-0.5">|</span>
          </span>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-4 mb-8">
          {SOCIALS.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              whileHover={{ y: -5, scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300
                         bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm
                         hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10
                         transition-colors"
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA — solid-fill pill button that inverts on hover, matching Tasmia's "Know More" treatment */}
        <motion.div variants={item} className="flex gap-4 flex-wrap">
          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3 rounded-md border-2 border-emerald-400
                       bg-emerald-400 text-dark-900 font-bold text-base
                       hover:bg-transparent hover:text-emerald-400 transition-all"
          >
            Hire Me <FiArrowRight />
          </motion.button>
          <motion.button
            onClick={() => scrollTo('#projects')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center px-7 py-3 rounded-md border-2 border-white/20 text-slate-200
                       hover:border-emerald-400/50 hover:text-emerald-400 font-semibold text-base transition-all"
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
