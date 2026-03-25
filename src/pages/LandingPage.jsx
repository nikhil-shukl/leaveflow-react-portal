import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { MdCalendarToday, MdDashboard, MdVerifiedUser, MdHistory, MdArrowForward, MdCheck } from 'react-icons/md'
import { HiCode, HiChip, HiLightningBolt } from 'react-icons/hi'
import Navbar from '../components/Navbar'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const features = [
  { icon: <MdCalendarToday size={24} />, title: 'Easy Leave Application', desc: 'Apply for any type of leave in seconds. Annual, sick, casual — all from one clean interface.', color: 'from-brand-500/20 to-brand-600/5', accent: '#22c55e' },
  { icon: <MdDashboard size={24} />, title: 'Leave Tracking Dashboard', desc: 'Real-time visibility into your leave balance, pending requests, and history at a glance.', color: 'from-blue-500/20 to-blue-600/5', accent: '#3b82f6' },
  { icon: <MdVerifiedUser size={24} />, title: 'Manager Approval System', desc: 'Managers get instant notifications and one-click approve/reject with full context.', color: 'from-purple-500/20 to-purple-600/5', accent: '#a855f7' },
  { icon: <MdHistory size={24} />, title: 'Leave History Monitoring', desc: 'Complete audit trail of all leave requests. Filter, search, and export records easily.', color: 'from-amber-500/20 to-amber-600/5', accent: '#f59e0b' },
]

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your account and choose your role — Employee, Manager, or Admin.', icon: <HiCode size={28} /> },
  { step: '02', title: 'Apply Leave', desc: 'Select leave type, dates, and reason. Submit with one click. Your manager gets notified instantly.', icon: <HiLightningBolt size={28} /> },
  { step: '03', title: 'Track Status', desc: 'Monitor approval status in real-time. Get notified when your leave is approved or rejected.', icon: <HiChip size={28} /> },
]

const developers = [
  { name: 'Nikhil Shukla', role: 'Full Stack Developer', skills: ['React', 'Node.js', 'MongoDB'], color: 'from-brand-500 to-teal-500', initials: 'NS' },
  { name: 'Pavash Singh', role: 'Frontend Engineer & website manager', skills: ['UI/UX', 'Tailwind', 'Framer'], color: 'from-blue-500 to-purple-500', initials: 'PS' },
  { name: 'Harshvardhan Singh', role: 'Backend Developer', skills: ['API Design', 'Auth', 'DevOps'], color: 'from-amber-500 to-orange-500', initials: 'HS' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 noise-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              v1.0 — Now live
            </motion.div>

            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-white mb-6">
              LeaveFlow
              <br />
              <span className="gradient-text">Smart Leave</span>
              <br />
              Management
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              A modern platform to manage employee leave requests efficiently. Built for teams that value clarity, speed, and control.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-all glow-green"
              >
                Get Started <MdArrowForward />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-medium rounded-xl transition-all"
              >
                Sign Up Free
              </motion.button>
            </div>

            <div className="flex items-center gap-6 mt-10 text-sm text-slate-500">
              {['No credit card required', 'Free forever', 'Open source'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <MdCheck className="text-brand-400" /> {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative float"
          >
            <div className="relative glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-600 font-mono">dashboard.leaveflow.app</div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-slate-500 text-xs">Welcome back,</p>
                    <p className="text-white font-display font-semibold">Alex Johnson</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-500/30 flex items-center justify-center text-brand-400 text-sm font-bold">A</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Annual Leave', val: '12/18', color: 'brand' },
                    { label: 'Sick Leave', val: '6/10', color: 'blue' },
                    { label: 'Casual Leave', val: '2/5', color: 'purple' },
                    { label: 'Unpaid Leave', val: 'Available', color: 'amber' },
                  ].map(card => (
                    <div key={card.label} className="bg-white/3 rounded-xl p-3 border border-white/5">
                      <p className="text-slate-500 text-xs mb-1">{card.label}</p>
                      <p className={`font-semibold text-sm ${card.color === 'brand' ? 'text-brand-400' : card.color === 'blue' ? 'text-blue-400' : card.color === 'purple' ? 'text-purple-400' : 'text-amber-400'}`}>{card.val}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Alice Johnson', type: 'Annual', status: 'Pending', color: 'amber' },
                    { name: 'Bob Smith', type: 'Sick', status: 'Approved', color: 'green' },
                  ].map(row => (
                    <div key={row.name} className="flex items-center justify-between px-3 py-2 bg-white/3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">{row.name[0]}</div>
                        <span className="text-sm text-slate-300">{row.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{row.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute -inset-4 bg-brand-500/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-brand-400 font-mono text-sm mb-3">// features</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Everything you need</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Powerful features designed for modern teams. Simple enough for employees, robust enough for admins.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${f.color} border border-white/8 cursor-default group`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/5 border border-white/10" style={{ color: f.accent }}>
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-28 bg-white/2 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-brand-400 font-mono text-sm mb-3">// how-it-works</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Up and running in minutes</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Three simple steps to transform how your team manages leave.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center p-8"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/5 border border-brand-500/20 flex items-center justify-center text-brand-400">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center font-mono text-xs font-bold text-white">{i + 1}</div>
                </div>
                <h3 className="font-display font-semibold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers */}
      <section id="developers" className="py-28 max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="text-brand-400 font-mono text-sm mb-3">// developers</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Built by the team</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Meet the developers behind LeaveFlow.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {developers.map((dev, i) => (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-8 text-center border border-white/8 group cursor-default"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${dev.color} mx-auto mb-5 flex items-center justify-center text-white font-display font-bold text-2xl group-hover:scale-105 transition-transform`}>
                {dev.initials}
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-1">{dev.name}</h3>
              <p className="text-slate-500 text-sm mb-4">{dev.role}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {dev.skills.map(skill => (
                  <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5">Ready to streamline your leave management?</h2>
            <p className="text-slate-400 text-lg mb-8">Join teams already using LeaveFlow to save hours every week.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => window.location.href = '/signup'}
                className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl glow-green transition-all"
              >
                Get started for free
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M9 3v12M5 5l8 8M13 5l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <span className="font-display font-bold text-white">LeaveFlow</span>
          </div>
          <p className="text-slate-600 text-sm">© 2024 LeaveFlow. Built with React + Vite + Tailwind.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-300 transition-colors">How It Works</a>
            <a href="#developers" className="hover:text-slate-300 transition-colors">Team</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
