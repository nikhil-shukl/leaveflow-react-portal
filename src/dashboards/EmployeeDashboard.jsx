import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdEventNote, MdCheck, MdClose, MdPending, MdCalendarToday } from 'react-icons/md'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'
import { useLeave } from '../context/LeaveContext'

const leaveTypes = ['Annual', 'Sick', 'Casual', 'Unpaid', 'Maternity', 'Paternity']

function ApplyLeave() {
  const { user } = useAuth()
  const { applyLeave } = useLeave()
  const [form, setForm] = useState({ type: 'Annual', from: '', to: '', reason: '' })
  const [loading, setLoading] = useState(false)

  const getDays = () => {
    if (!form.from || !form.to) return 0
    const d = (new Date(form.to) - new Date(form.from)) / (1000 * 60 * 60 * 24) + 1
    return Math.max(0, d)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (getDays() <= 0) return toast.error('End date must be after start date')
    setLoading(true)
    setTimeout(() => {
      applyLeave({ ...form, days: getDays() }, user)
      toast.success('Leave application submitted!')
      setForm({ type: 'Annual', from: '', to: '', reason: '' })
      setLoading(false)
    }, 600)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
      <h2 className="font-display font-bold text-2xl text-white mb-1">Apply for Leave</h2>
      <p className="text-slate-500 text-sm mb-8">Submit a new leave request</p>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/8 space-y-5">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Leave Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-brand-500/50 text-sm">
            {leaveTypes.map(t => <option key={t} value={t}>{t} Leave</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">From date</label>
            <input type="date" required value={form.from} onChange={e => setForm({ ...form, from: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-brand-500/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">To date</label>
            <input type="date" required value={form.to} onChange={e => setForm({ ...form, to: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-brand-500/50 text-sm" />
          </div>
        </div>
        {getDays() > 0 && (
          <div className="text-sm text-brand-400 font-mono px-1">{getDays()} working day{getDays() !== 1 ? 's' : ''}</div>
        )}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Reason</label>
          <textarea required rows={3} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}
            placeholder="Brief reason for leave..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 text-sm resize-none" />
        </div>
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-medium rounded-xl transition-all glow-green">
          {loading ? 'Submitting...' : 'Submit Application'}
        </motion.button>
      </form>
    </motion.div>
  )
}

function LeaveHistory() {
  const { user } = useAuth()
  const { getMyLeaves } = useLeave()
  const leaves = getMyLeaves(user.id)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-1">Leave History</h2>
      <p className="text-slate-500 text-sm mb-8">All your leave requests</p>
      {leaves.length === 0 ? (
        <div className="text-center py-20 text-slate-600">No leave requests yet</div>
      ) : (
        <div className="glass rounded-2xl border border-white/8 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['Type', 'From', 'To', 'Days', 'Reason', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs text-slate-500 uppercase tracking-wider px-5 py-4 font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaves.map((l, i) => (
                <tr key={l.id} className={`border-b border-white/3 hover:bg-white/2 transition-colors ${i === leaves.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-5 py-4 text-sm text-white">{l.type}</td>
                  <td className="px-5 py-4 text-sm text-slate-400 font-mono">{l.from}</td>
                  <td className="px-5 py-4 text-sm text-slate-400 font-mono">{l.to}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{l.days}</td>
                  <td className="px-5 py-4 text-sm text-slate-400 max-w-[200px] truncate">{l.reason}</td>
                  <td className="px-5 py-4"><StatusBadge status={l.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

function Profile() {
  const { user } = useAuth()
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
      <h2 className="font-display font-bold text-2xl text-white mb-8">My Profile</h2>
      <div className="glass rounded-2xl p-6 border border-white/8">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/20 flex items-center justify-center text-brand-400 font-display font-bold text-2xl">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl text-white">{user?.name}</h3>
            <p className="text-slate-500 text-sm">{user?.role} · {user?.department}</p>
          </div>
        </div>
        <div className="space-y-4">
          {[['Email', user?.email], ['Department', user?.department], ['Role', user?.role], ['Member since', new Date(user?.createdAt).toLocaleDateString()]].map(([l, v]) => (
            <div key={l} className="flex justify-between text-sm">
              <span className="text-slate-500">{l}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function EmployeeOverview() {
  const { user } = useAuth()
  const { getMyLeaves } = useLeave()
  const leaves = getMyLeaves(user.id)
  const pending = leaves.filter(l => l.status === 'Pending').length
  const approved = leaves.filter(l => l.status === 'Approved').length
  const navigate = useNavigate()

  const stats = [
    { label: 'Total Requests', value: leaves.length, icon: <MdEventNote />, color: 'brand' },
    { label: 'Pending', value: pending, icon: <MdPending />, color: 'amber' },
    { label: 'Approved', value: approved, icon: <MdCheck />, color: 'green' },
    { label: 'Rejected', value: leaves.filter(l => l.status === 'Rejected').length, icon: <MdClose />, color: 'red' },
  ]

  const colorMap = { brand: 'text-brand-400 bg-brand-500/15', amber: 'text-amber-400 bg-amber-500/15', green: 'text-green-400 bg-green-500/15', red: 'text-red-400 bg-red-500/15' }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-white">Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
        <p className="text-slate-500 text-sm mt-1">Here's your leave overview</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="glass rounded-2xl p-5 border border-white/8">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${colorMap[s.color]}`}>{s.icon}</div>
            <p className="text-2xl font-display font-bold text-white">{s.value}</p>
            <p className="text-slate-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h3 className="font-display font-semibold text-white">Recent Requests</h3>
          <button onClick={() => navigate('/dashboard/history')} className="text-sm text-brand-400 hover:text-brand-300 transition-colors">View all</button>
        </div>
        {leaves.slice(0, 4).map(l => (
          <div key={l.id} className="flex items-center justify-between px-6 py-4 border-b border-white/3 last:border-0 hover:bg-white/2 transition-colors">
            <div>
              <p className="text-sm text-white">{l.type} Leave</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{l.from} → {l.to}</p>
            </div>
            <StatusBadge status={l.status} />
          </div>
        ))}
        {leaves.length === 0 && <div className="text-center py-10 text-slate-600 text-sm">No leave requests yet. <button onClick={() => navigate('/dashboard/apply')} className="text-brand-400">Apply now →</button></div>}
      </div>
    </motion.div>
  )
}

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto p-6 lg:p-10 pt-16 lg:pt-10">
          <Routes>
            <Route index element={<EmployeeOverview />} />
            <Route path="apply" element={<ApplyLeave />} />
            <Route path="history" element={<LeaveHistory />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
