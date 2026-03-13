import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdCheck, MdClose, MdPending } from 'react-icons/md'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'
import { useLeave } from '../context/LeaveContext'

function LeaveRequests() {
  const { leaves, updateStatus } = useLeave()
  const pending = leaves.filter(l => l.status === 'Pending')

  const handle = (id, status) => {
    updateStatus(id, status)
    toast.success(`Leave ${status.toLowerCase()} successfully`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-1">Leave Requests</h2>
      <p className="text-slate-500 text-sm mb-8">{pending.length} pending approval</p>
      <div className="space-y-3">
        {leaves.map(l => (
          <div key={l.id} className="glass rounded-2xl p-5 border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {l.employeeName?.charAt(0)}
              </div>
              <div>
                <p className="text-white font-medium">{l.employeeName}</p>
                <p className="text-slate-400 text-sm">{l.type} Leave · {l.days} day{l.days !== 1 ? 's' : ''}</p>
                <p className="text-slate-500 text-xs font-mono mt-0.5">{l.from} → {l.to}</p>
                <p className="text-slate-500 text-xs mt-1 italic">"{l.reason}"</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <StatusBadge status={l.status} />
              {l.status === 'Pending' && (
                <div className="flex gap-2">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handle(l.id, 'Approved')}
                    className="w-8 h-8 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/20 text-green-400 flex items-center justify-center transition-all">
                    <MdCheck size={16} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handle(l.id, 'Rejected')}
                    className="w-8 h-8 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-400 flex items-center justify-center transition-all">
                    <MdClose size={16} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        ))}
        {leaves.length === 0 && <div className="text-center py-20 text-slate-600">No leave requests</div>}
      </div>
    </motion.div>
  )
}

function ManagerOverview() {
  const { user } = useAuth()
  const { leaves, getPendingLeaves } = useLeave()
  const pending = getPendingLeaves()

  const stats = [
    { label: 'Total Requests', value: leaves.length, color: 'brand' },
    { label: 'Pending Review', value: pending.length, color: 'amber' },
    { label: 'Approved', value: leaves.filter(l => l.status === 'Approved').length, color: 'green' },
    { label: 'Rejected', value: leaves.filter(l => l.status === 'Rejected').length, color: 'red' },
  ]
  const colorMap = { brand: 'text-brand-400', amber: 'text-amber-400', green: 'text-green-400', red: 'text-red-400' }
  const navigate = useNavigate()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-white">Manager Dashboard</h2>
        <p className="text-slate-500 text-sm mt-1">Welcome back, {user?.name?.split(' ')[0]}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="glass rounded-2xl p-5 border border-white/8">
            <p className={`text-3xl font-display font-bold ${colorMap[s.color]}`}>{s.value}</p>
            <p className="text-slate-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h3 className="font-display font-semibold text-white">Pending Approvals</h3>
          <button onClick={() => navigate('/dashboard/requests')} className="text-sm text-brand-400 hover:text-brand-300 transition-colors">View all</button>
        </div>
        {pending.slice(0, 4).map(l => (
          <div key={l.id} className="flex items-center justify-between px-6 py-4 border-b border-white/3 last:border-0">
            <div>
              <p className="text-sm text-white">{l.employeeName}</p>
              <p className="text-xs text-slate-500 mt-0.5">{l.type} · {l.days} day{l.days !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { useLeave.updateStatus?.(l.id, 'Approved'); navigate('/dashboard/requests') }} className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-lg transition-all">Review</button>
            </div>
          </div>
        ))}
        {pending.length === 0 && <div className="text-center py-10 text-slate-600 text-sm">All caught up! No pending requests.</div>}
      </div>
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
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-display font-bold text-2xl">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-display font-semibold text-xl text-white">{user?.name}</h3>
            <p className="text-slate-500 text-sm">{user?.role} · {user?.department}</p>
          </div>
        </div>
        <div className="space-y-4">
          {[['Email', user?.email], ['Department', user?.department], ['Role', user?.role]].map(([l, v]) => (
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

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto p-6 lg:p-10 pt-16 lg:pt-10">
          <Routes>
            <Route index element={<ManagerOverview />} />
            <Route path="requests" element={<LeaveRequests />} />
            <Route path="team" element={<LeaveRequests />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
