import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import { MdPeople, MdEventNote, MdCheck, MdClose, MdPending } from 'react-icons/md'
import toast from 'react-hot-toast'
import Sidebar from '../components/Sidebar'
import StatusBadge from '../components/StatusBadge'
import { useAuth } from '../context/AuthContext'
import { useLeave } from '../context/LeaveContext'

const COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6']

function AdminOverview() {
  const { user } = useAuth()
  const { leaves } = useLeave()
  const users = JSON.parse(localStorage.getItem('lf_users') || '[]')

  const stats = [
    { label: 'Total Users', value: users.length, icon: <MdPeople />, color: 'brand' },
    { label: 'Total Requests', value: leaves.length, icon: <MdEventNote />, color: 'blue' },
    { label: 'Pending', value: leaves.filter(l => l.status === 'Pending').length, icon: <MdPending />, color: 'amber' },
    { label: 'Approved', value: leaves.filter(l => l.status === 'Approved').length, icon: <MdCheck />, color: 'green' },
  ]

  const colorMap = {
    brand: 'text-brand-400 bg-brand-500/15',
    blue: 'text-blue-400 bg-blue-500/15',
    amber: 'text-amber-400 bg-amber-500/15',
    green: 'text-green-400 bg-green-500/15',
  }

  const barData = [
    { month: 'Jan', approved: 4, rejected: 1, pending: 2 },
    { month: 'Feb', approved: 6, rejected: 2, pending: 1 },
    { month: 'Mar', approved: 5, rejected: 1, pending: 3 },
    { month: 'Apr', approved: 8, rejected: 2, pending: 2 },
    { month: 'May', approved: 3, rejected: 1, pending: 4 },
    { month: 'Jun', approved: 7, rejected: 0, pending: 1 },
  ]

  const pieData = [
    { name: 'Approved', value: leaves.filter(l => l.status === 'Approved').length || 2 },
    { name: 'Pending', value: leaves.filter(l => l.status === 'Pending').length || 3 },
    { name: 'Rejected', value: leaves.filter(l => l.status === 'Rejected').length || 1 },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-white">Admin Dashboard</h2>
        <p className="text-slate-500 text-sm mt-1">System-wide overview, {user?.name?.split(' ')[0]}</p>
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

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/8">
          <h3 className="font-display font-semibold text-white mb-5">Leave Requests Over Time</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={10} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f8fafc', fontSize: 12 }}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="approved" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3">
            {[['Approved', '#22c55e'], ['Pending', '#f59e0b'], ['Rejected', '#ef4444']].map(([label, color]) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-sm" style={{ background: color }} /> {label}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/8">
          <h3 className="font-display font-semibold text-white mb-5">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f8fafc', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} /> {d.name}
                </span>
                <span className="text-white font-mono">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ManageUsers() {
  const users = JSON.parse(localStorage.getItem('lf_users') || '[]')

  const roleColors = {
    Employee: 'bg-brand-500/15 text-brand-400 border-brand-500/20',
    Manager: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    Admin: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-1">Manage Users</h2>
      <p className="text-slate-500 text-sm mb-8">{users.length} registered user{users.length !== 1 ? 's' : ''}</p>

      {users.length === 0 ? (
        <div className="text-center py-20 text-slate-600">No users registered yet</div>
      ) : (
        <div className="glass rounded-2xl border border-white/8 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['User', 'Email', 'Department', 'Role', 'Joined'].map(h => (
                  <th key={h} className="text-left text-xs text-slate-500 uppercase tracking-wider px-5 py-4 font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={`border-b border-white/3 hover:bg-white/2 transition-colors ${i === users.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-bold">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">{u.email}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{u.department || '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${roleColors[u.role] || roleColors.Employee}`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500 font-mono">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

function AllLeaves() {
  const { leaves, updateStatus } = useLeave()

  const handle = (id, status) => {
    updateStatus(id, status)
    toast.success(`Leave ${status.toLowerCase()}`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-1">All Leave Requests</h2>
      <p className="text-slate-500 text-sm mb-8">{leaves.length} total requests</p>

      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/5">
                {['Employee', 'Type', 'From', 'To', 'Days', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs text-slate-500 uppercase tracking-wider px-5 py-4 font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaves.map((l, i) => (
                <tr key={l.id} className={`border-b border-white/3 hover:bg-white/2 transition-colors ${i === leaves.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs text-white font-bold">{l.employeeName?.charAt(0)}</div>
                      <span className="text-sm text-white">{l.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">{l.type}</td>
                  <td className="px-5 py-4 text-sm text-slate-400 font-mono">{l.from}</td>
                  <td className="px-5 py-4 text-sm text-slate-400 font-mono">{l.to}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{l.days}</td>
                  <td className="px-5 py-4"><StatusBadge status={l.status} /></td>
                  <td className="px-5 py-4">
                    {l.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => handle(l.id, 'Approved')}
                          className="w-7 h-7 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/20 text-green-400 flex items-center justify-center transition-all">
                          <MdCheck size={14} />
                        </button>
                        <button onClick={() => handle(l.id, 'Rejected')}
                          className="w-7 h-7 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-400 flex items-center justify-center transition-all">
                          <MdClose size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

function Statistics() {
  const { leaves } = useLeave()

  const typeData = ['Annual', 'Sick', 'Casual', 'Unpaid', 'Maternity', 'Paternity'].map(type => ({
    type,
    count: leaves.filter(l => l.type === type).length,
  })).filter(d => d.count > 0)

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (5 - i))
    const month = d.toLocaleString('default', { month: 'short' })
    return {
      month,
      count: leaves.filter(l => {
        const ld = new Date(l.from)
        return ld.getMonth() === d.getMonth() && ld.getFullYear() === d.getFullYear()
      }).length,
    }
  })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="font-display font-bold text-2xl text-white mb-8">Statistics</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 border border-white/8">
          <h3 className="font-display font-semibold text-white mb-5">Requests by Month</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f8fafc', fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/8">
          <h3 className="font-display font-semibold text-white mb-5">Requests by Type</h3>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" outerRadius={90} dataKey="count" nameKey="type" paddingAngle={3}>
                  {typeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f8fafc', fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-600 text-sm">No data yet</div>
          )}
        </div>
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
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-display font-bold text-2xl">
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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 lg:p-10 pt-16 lg:pt-10">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="leaves" element={<AllLeaves />} />
            <Route path="stats" element={<Statistics />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
