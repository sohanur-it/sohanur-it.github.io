import { FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/[0.06] py-6 text-center">
      <p className="text-slate-500 text-sm flex items-center justify-center gap-1.5">
        Crafted with <FiHeart className="text-red-400" size={13} /> by{' '}
        <span className="text-slate-300 font-medium">Sohanur Rahman</span>
      </p>
    </footer>
  )
}
