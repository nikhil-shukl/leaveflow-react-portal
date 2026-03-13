import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'

const NavLink = ({ href, children }) => (
  <a
    href={href}
    onClick={e => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }}
    className="text-slate-400 hover:text-white transition-colors text-sm font-medium cursor-pointer"
  >
    {children}
  </a>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M9 3v12M5 5l8 8M13 5l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-display font-700 text-white text-lg">LeaveFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#developers">Developers</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <button onClick={() => navigate('/dashboard')} className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2">Dashboard</button>
              <button onClick={() => { logout(); navigate('/') }} className="text-sm px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2">Login</Link>
              <Link to="/signup" className="text-sm px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-all glow-green">Sign Up</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
          {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          >
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#developers">Developers</NavLink>
            <div className="flex gap-3 pt-2 border-t border-white/5">
              <Link to="/login" className="flex-1 text-center text-sm py-2 border border-white/10 rounded-lg text-slate-300">Login</Link>
              <Link to="/signup" className="flex-1 text-center text-sm py-2 bg-brand-500 rounded-lg text-white font-medium">Sign Up</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
