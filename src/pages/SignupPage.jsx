import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MdPerson, MdSupervisorAccount, MdAdminPanelSettings, MdArrowBack } from 'react-icons/md'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const roles = [
  { id: 'Employee', label: 'Employee', desc: 'Apply and track your leave requests', icon: <MdPerson size={32} />, color: 'border-brand-500/30 hover:border-brand-500' },
  { id: 'Manager', label: 'Manager', desc: 'Manage team leave approvals', icon: <MdSupervisorAccount size={32} />, color: 'border-blue-500/30 hover:border-blue-500' },
  { id: 'Admin', label: 'Admin', desc: 'Full system administration access', icon: <MdAdminPanelSettings size={32} />, color: 'border-purple-500/30 hover:border-purple-500' },
]

export default function SignupPage() {
  const [step, setStep] = useState('role')
  const [role, setRole] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleRoleSelect = (r) => { setRole(r); setStep('form') }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    setLoading(true)
    const result = signup({ ...form, role })
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Account created! Welcome to LeaveFlow.')
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 grid-bg flex items-center justify-center px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-500/8 rounded-full blur-[100px] pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative w-full max-w-md">

        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 3v12M5 5l8 8M13 5l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <span className="font-display font-bold text-white text-xl">LeaveFlow</span>
        </Link>

        <div className="glass rounded-2xl p-8 border border-white/8">
          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div key="role" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="font-display font-bold text-2xl text-white mb-1">Create your account</h1>
                <p className="text-slate-500 text-sm mb-8">Choose how you'll use LeaveFlow</p>
                <div className="space-y-3">
                  {roles.map(r => (
                    <motion.button
                      key={r.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect(r.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border bg-white/3 ${r.color} transition-all text-left group`}
                    >
                      <div className="text-slate-400 group-hover:text-white transition-colors">{r.icon}</div>
                      <div>
                        <p className="text-white font-medium">{r.label}</p>
                        <p className="text-slate-500 text-sm">{r.desc}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <p className="text-center text-sm text-slate-500 mt-6">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brand-400 hover:text-brand-300 transition-colors">Sign in</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep('role')} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm mb-6">
                  <MdArrowBack /> Back
                </button>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400">
                    {roles.find(r => r.id === role)?.icon}
                  </div>
                  <div>
                    <h1 className="font-display font-bold text-xl text-white">Sign up as {role}</h1>
                    <p className="text-slate-500 text-xs">Fill in your details below</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', label: 'Full name', type: 'text', placeholder: 'Alex Johnson' },
                    { key: 'email', label: 'Email address', type: 'email', placeholder: 'alex@company.com' },
                    { key: 'department', label: 'Department', type: 'text', placeholder: 'Engineering' },
                    { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm text-slate-400 mb-2">{f.label}</label>
                      <input
                        type={f.type} required
                        value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-all text-sm"
                      />
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    type="submit" disabled={loading}
                    className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all glow-green mt-2"
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
