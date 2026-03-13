import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = login(form.email, form.password)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Welcome back!')
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 grid-bg flex items-center justify-center px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-500/8 rounded-full blur-[100px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 3v12M5 5l8 8M13 5l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <span className="font-display font-bold text-white text-xl">LeaveFlow</span>
        </Link>

        <div className="glass rounded-2xl p-8 border border-white/8">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Email address</label>
              <input
                type="email" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/8 transition-all text-sm"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Password</label>
              <input
                type="password" required
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:bg-white/8 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all glow-green mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-400 hover:text-brand-300 transition-colors">Sign up free</Link>
          </p>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-slate-600 text-center mb-3">Demo accounts</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'Employee', email: 'emp@demo.com', pass: 'demo123' },
                { role: 'Manager', email: 'mgr@demo.com', pass: 'demo123' },
                { role: 'Admin', email: 'admin@demo.com', pass: 'demo123' },
              ].map(d => (
                <button key={d.role} onClick={() => { setForm({ email: d.email, password: d.pass }) }} className="text-xs px-2 py-2 rounded-lg bg-white/3 border border-white/8 text-slate-400 hover:text-white hover:bg-white/8 transition-all">
                  {d.role}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-700 text-center mt-2">Click a role to autofill, then sign in</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
