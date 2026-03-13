// Seed demo accounts so the demo login buttons work immediately
export function seedDemoData() {
  const existing = JSON.parse(localStorage.getItem('lf_users') || '[]')
  const demoEmails = ['emp@demo.com', 'mgr@demo.com', 'admin@demo.com']

  const demoUsers = [
    { id: 101, name: 'Alice Johnson', email: 'emp@demo.com', password: 'demo123', role: 'Employee', department: 'Engineering', createdAt: '2024-01-15T00:00:00.000Z' },
    { id: 102, name: 'Mark Reynolds', email: 'mgr@demo.com', password: 'demo123', role: 'Manager', department: 'Product', createdAt: '2024-01-10T00:00:00.000Z' },
    { id: 103, name: 'Sarah Chen', email: 'admin@demo.com', password: 'demo123', role: 'Admin', department: 'HR', createdAt: '2024-01-01T00:00:00.000Z' },
  ]

  const filtered = existing.filter(u => !demoEmails.includes(u.email))
  const merged = [...filtered, ...demoUsers]
  localStorage.setItem('lf_users', JSON.stringify(merged))
}
