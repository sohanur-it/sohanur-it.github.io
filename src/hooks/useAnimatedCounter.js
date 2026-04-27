import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export function useAnimatedCounter(target, duration = 1600) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const raw = String(target).replace(/\D/g, '')
    const suffix = String(target).replace(/[0-9]/g, '')
    const num = parseInt(raw, 10)

    if (!inView || isNaN(num)) {
      setDisplay(inView ? target : '0' + suffix)
      return
    }

    let startTime = null
    let rafId

    const ease = (t) => 1 - Math.pow(1 - t, 3) // ease-out cubic

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setDisplay(Math.floor(ease(progress) * num) + suffix)
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration])

  return { display, ref }
}
