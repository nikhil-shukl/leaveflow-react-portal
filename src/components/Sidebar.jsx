import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiLogout } from 'react-icons/hi'
import { MdDashboard, MdEventNote, MdHistory, MdPerson, MdPeople, MdCheck, MdBarChart, MdSettings } from 'react-icons/md'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const roleLinks = {
  Employee: [
    { to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
    { to: '/dashboard/apply', icon: <MdEventNote />, label: 'Apply Leave' },
    { to: '/dashboard/history', icon: <MdHistory />, label: 'Leave History' },
    { to: '/dashboard/profile', icon: <MdPerson />, label: 'Profile' },
  ],
  Manager: [
    { to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
    { to: '/dashboard/requests', icon: <MdCheck />, label: 'Leave Requests' },
    { to: '/dashboard/team', icon: <MdPeople />, label: 'My Team' },
    { to: '/dashboard/profile', icon: <MdPerson />, label: 'Profile' },
  ],
  Admin: [
    { to: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
    { to: '/dashboard/users', icon: <MdPeople />, label: 'Manage Users' },
    { to: '/dashboard/leaves', icon: <MdEventNote />, label: 'All Leaves' },
    { to: '/dashboard/stats', icon: <MdBarChart />, label: 'Statistics' },
    { to: '/dashboard/profile', icon: <MdPerson />, label: 'Profile' },
  ],
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = roleLinks[user?.role] || roleLinks.Employee

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-6 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M9 3v12M5 5l8 8M13 5l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="font-display font-bold text-white">LeaveFlow</span>
      </div>

      <div className="px-3 py-4 flex-1 flex flex-col gap-1">
        <p className="text-xs text-slate-600 uppercase tracking-widest px-4 mb-2 font-mono">{user?.role}</p>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMobileOpen(false)}
            className={`sidebar-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="px-3 pb-6 border-t border-white/5 pt-4">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-600/30 flex items-center justify-center text-brand-400 text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <HiLogout className="text-lg" /> Log out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-slate-950 border-r border-white/5 fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-slate-950 border-r border-white/5 z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
