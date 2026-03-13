import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('lf_session')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('lf_users') || '[]')
    const existing = users.find(u => u.email === userData.email)
    if (existing) return { error: 'Email already registered' }
    const newUser = { ...userData, id: Date.now(), createdAt: new Date().toISOString() }
    users.push(newUser)
    localStorage.setItem('lf_users', JSON.stringify(users))
    localStorage.setItem('lf_session', JSON.stringify(newUser))
    setUser(newUser)
    return { success: true }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('lf_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { error: 'Invalid credentials' }
    localStorage.setItem('lf_session', JSON.stringify(found))
    setUser(found)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('lf_session')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
