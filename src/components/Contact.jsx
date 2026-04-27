import { motion } from 'framer-motion'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { FaLinkedin, FaFacebookF, FaTwitter } from 'react-icons/fa'

const VP = { once: false, margin: '-80px' }

const SOCIAL = [
  { Icon: FaLinkedin,  href: 'https://www.linkedin.com/in/sohanur-rahman-a7152271/', label: 'LinkedIn' },
  { Icon: FaFacebookF, href: 'https://www.facebook.com/sohan.ru.phy',               label: 'Facebook' },
  { Icon: FaTwitter,   href: 'https://twitter.com/Sohanurit',                       label: 'Twitter'  },
]

/* Each card has its own entrance */
const cardEntrances = [
  { x: -40, y:  0  },
  { x:   0, y:  40 },
  { x:  40, y:  0  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-dark-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="text-center mb-16"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.85, filter: 'blur(4px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.5 } } }}
          >
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.16em] uppercase
                             text-emerald-400 bg-emerald-500/10 border border-emerald-500/30
                             px-3 py-1 rounded-full mb-3">
              Get In Touch
            </span>
          </motion.div>

          <h2 className="text-4xl font-extrabold text-slate-50 tracking-tight overflow-hidden">
            <motion.span
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              className="inline-flex flex-wrap justify-center gap-x-3"
            >
              {['Contact', 'Me'].map((w, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 28, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } } }}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </motion.span>
          </h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: 0.3 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="text-slate-500 text-sm mt-3"
          >
            Open to opportunities, collaborations, and interesting conversations.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              entrance: cardEntrances[0],
              delay: 0,
              href: 'mailto:sohanur.it@gmail.com',
              icon: <FiMail className="text-emerald-400" size={22} />,
              title: 'Email',
              sub: 'sohanur.it@gmail.com',
              iconBg: 'bg-emerald-500/10 border-emerald-500/25',
              hoverBorder: 'hover:border-emerald-500/40 hover:shadow-[0_12px_32px_rgba(16,185,129,0.1)]',
            },
            {
              entrance: cardEntrances[1],
              delay: 0.1,
              href: null,
              icon: <FiMapPin className="text-sky-400" size={22} />,
              title: 'Location',
              sub: 'Dhaka, Bangladesh',
              iconBg: 'bg-sky-500/10 border-sky-500/25',
              hoverBorder: 'hover:border-sky-500/35 hover:shadow-[0_12px_32px_rgba(14,165,233,0.1)]',
            },
            {
              entrance: cardEntrances[2],
              delay: 0.2,
              href: null,
              title: 'Social',
              sub: 'Let\'s connect',
              iconBg: 'bg-violet-500/10 border-violet-500/25',
              hoverBorder: 'hover:border-violet-500/35 hover:shadow-[0_12px_32px_rgba(139,92,246,0.1)]',
              social: true,
            },
          ].map((card, ci) => {
            const Wrapper = card.href ? motion.a : motion.div
            return (
              <Wrapper
                key={ci}
                {...(card.href ? { href: card.href } : {})}
                initial={{ opacity: 0, x: card.entrance.x, y: card.entrance.y, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={VP}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: card.delay }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`flex flex-col items-center text-center p-8 bg-white/[0.03] border border-white/[0.07]
                            rounded-2xl transition-all duration-300 cursor-default ${card.hoverBorder}`}
              >
                {card.social ? (
                  <div className="flex gap-3 mb-4">
                    {SOCIAL.map(({ Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={label}
                        whileHover={{ y: -4, scale: 1.18 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08]
                                   flex items-center justify-center text-slate-400
                                   hover:text-violet-400 hover:border-violet-500/40 transition-colors"
                      >
                        <Icon size={15} />
                      </motion.a>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className={`w-14 h-14 rounded-full border flex items-center justify-center mb-4 ${card.iconBg}`}
                  >
                    {card.icon}
                  </motion.div>
                )}
                <h3 className="text-sm font-bold text-slate-100 mb-1">{card.title}</h3>
                <p className="text-xs text-slate-400 break-all">{card.sub}</p>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
