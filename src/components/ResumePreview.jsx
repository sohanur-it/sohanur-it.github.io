import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiExternalLink, FiFileText } from 'react-icons/fi'

const DRIVE_LINK = 'https://drive.google.com/file/d/15RFUzjoZ72UxuOoKPKy20DyhMnnbx3hr/view?usp=sharing'
const LOCAL_PDF  = '/resume.pdf'

/* Any component calls these to open/close the preview */
export function openResumePreview()  { window.dispatchEvent(new CustomEvent('resume-toggle', { detail: true  })) }
export function closeResumePreview() { window.dispatchEvent(new CustomEvent('resume-toggle', { detail: false })) }

export default function ResumePreview() {
  const [open,   setOpen]   = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handler = (e) => { setOpen(e.detail); if (!e.detail) setLoaded(false) }
    window.addEventListener('resume-toggle', handler)
    return () => window.removeEventListener('resume-toggle', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') closeResumePreview() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-dark-900/98 backdrop-blur-2xl flex flex-col"
        >
          {/* ── Top bar ── */}
          <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="shrink-0 flex items-center justify-between px-5 sm:px-8 h-16
                       border-b border-white/[0.07] bg-dark-800/70 backdrop-blur-xl"
          >
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30
                              flex items-center justify-center shrink-0">
                <FiFileText className="text-emerald-400" size={15} />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-slate-100">Sohanur Rahman</p>
                <p className="text-[0.65rem] text-slate-500">Resume · 2025</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={LOCAL_PDF}
                download="Sohanur_Rahman_Resume.pdf"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                           text-slate-300 bg-white/[0.05] border border-white/[0.09]
                           hover:bg-white/[0.1] hover:text-white transition-all"
              >
                <FiDownload size={13} /> Download
              </a>
              <a
                href={DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                           text-emerald-400 bg-emerald-500/10 border border-emerald-500/30
                           hover:bg-emerald-500/20 transition-all"
              >
                <FiExternalLink size={13} /> Open in Drive
              </a>

              {/* Mobile icon-only buttons */}
              <a href={LOCAL_PDF} download="Sohanur_Rahman_Resume.pdf"
                 className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg
                            bg-white/[0.05] border border-white/[0.09] text-slate-400 hover:text-white transition-colors">
                <FiDownload size={14} />
              </a>
              <a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer"
                 className="sm:hidden w-8 h-8 flex items-center justify-center rounded-lg
                            bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <FiExternalLink size={14} />
              </a>

              <button
                onClick={closeResumePreview}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center rounded-lg ml-1
                           bg-white/[0.04] border border-white/[0.08] text-slate-400
                           hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
              >
                <FiX size={15} />
              </button>
            </div>
          </motion.header>

          {/* ── PDF area ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{ opacity: 0, y: 16    }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 overflow-hidden relative bg-[#1a1a2e]"
          >
            {/* Spinner while PDF loads */}
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500/25 border-t-emerald-400 animate-spin" />
                <p className="text-slate-500 text-sm">Loading preview…</p>
              </div>
            )}

            <iframe
              src={`${LOCAL_PDF}#toolbar=0&view=FitH&navpanes=0&scrollbar=1`}
              title="Sohanur Rahman Resume"
              className="w-full h-full border-0 transition-opacity duration-500"
              style={{ opacity: loaded ? 1 : 0 }}
              onLoad={() => setLoaded(true)}
            />
          </motion.div>

          {/* ── Bottom hint bar ── */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{ y: 40, opacity: 0    }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="shrink-0 flex items-center justify-center gap-5 py-2.5
                       border-t border-white/[0.05] bg-dark-800/50"
          >
            <span className="text-[0.65rem] text-slate-600">Press Esc to close</span>
            <span className="w-px h-3 bg-white/[0.08]" />
            <a
              href={LOCAL_PDF}
              download="Sohanur_Rahman_Resume.pdf"
              className="flex items-center gap-1 text-[0.65rem] text-emerald-500 hover:text-emerald-300 transition-colors"
            >
              <FiDownload size={11} /> Download PDF
            </a>
            <span className="w-px h-3 bg-white/[0.08]" />
            <a
              href={DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[0.65rem] text-slate-600 hover:text-slate-400 transition-colors"
            >
              <FiExternalLink size={11} /> Google Drive
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
