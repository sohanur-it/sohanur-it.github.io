import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999]
                 bg-gradient-to-r from-emerald-500 via-emerald-300 to-teal-400
                 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
    />
  )
}
