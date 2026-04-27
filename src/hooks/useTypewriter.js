import { useState, useEffect } from 'react'

export function useTypewriter(
  strings,
  { typeSpeed = 55, backSpeed = 30, backDelay = 1400, startDelay = 700 } = {},
) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let strIdx = 0
    let charIdx = 0
    let deleting = false
    let timer

    const tick = () => {
      const current = strings[strIdx]

      if (deleting) {
        charIdx--
        setDisplay(current.slice(0, charIdx))
        if (charIdx === 0) {
          deleting = false
          strIdx = (strIdx + 1) % strings.length
          timer = setTimeout(tick, typeSpeed)
        } else {
          timer = setTimeout(tick, backSpeed)
        }
      } else {
        charIdx++
        setDisplay(current.slice(0, charIdx))
        if (charIdx === current.length) {
          timer = setTimeout(() => {
            deleting = true
            tick()
          }, backDelay)
        } else {
          timer = setTimeout(tick, typeSpeed)
        }
      }
    }

    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return display
}
