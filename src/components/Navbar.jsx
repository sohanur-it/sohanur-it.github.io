import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiFileText } from 'react-icons/fi'
import { openResumePreview } from './ResumePreview'

const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResume = () => {
    setOpen(false)
    openResumePreview()
  }

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 px-6 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/[0.07]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="text-emerald-400 font-extrabold text-lg tracking-widest select-none"
        >
          SR
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(label => (
            <button
              key={label}
              onClick={() => scrollTo(`#${label.toLowerCase()}`)}
              className="relative text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-emerald-400 rounded-full transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          {/* Resume button — opens preview overlay */}
          <motion.button
            onClick={handleResume}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-emerald-400
                       border border-emerald-500/35 rounded-md
                       hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]
                       transition-all"
          >
            <FiFileText size={13} /> Resume
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-100 transition-colors p-1"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-dark-900/97 backdrop-blur-xl
                       border-b border-white/[0.07] px-6 py-5 flex flex-col gap-4"
          >
            {NAV_LINKS.map(label => (
              <button
                key={label}
                onClick={() => scrollTo(`#${label.toLowerCase()}`)}
                className="text-left text-slate-400 hover:text-slate-100 text-sm font-medium transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={handleResume}
              className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold"
            >
              <FiFileText size={13} /> Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
