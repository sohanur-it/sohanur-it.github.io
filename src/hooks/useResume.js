/**
 * Lightweight module-level pub/sub so any component can open/close
 * the resume preview without prop drilling or Context.
 */
let listeners = []
let _open = false

export function openResume() {
  _open = true
  listeners.forEach(fn => fn(true))
}

export function closeResume() {
  _open = false
  listeners.forEach(fn => fn(false))
}

export { _open as resumeOpen }
