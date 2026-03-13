import { createContext, useContext, useState, useEffect } from 'react'

const LeaveContext = createContext(null)

const SAMPLE_LEAVES = [
  { id: 1, employeeId: 2, employeeName: 'Alice Johnson', type: 'Annual', from: '2024-03-10', to: '2024-03-12', days: 3, reason: 'Family vacation', status: 'Pending', appliedAt: '2024-03-05' },
  { id: 2, employeeId: 2, employeeName: 'Alice Johnson', type: 'Sick', from: '2024-02-15', to: '2024-02-15', days: 1, reason: 'Fever', status: 'Approved', appliedAt: '2024-02-15' },
  { id: 3, employeeId: 3, employeeName: 'Bob Smith', type: 'Casual', from: '2024-03-18', to: '2024-03-19', days: 2, reason: 'Personal work', status: 'Pending', appliedAt: '2024-03-10' },
  { id: 4, employeeId: 3, employeeName: 'Bob Smith', type: 'Annual', from: '2024-01-22', to: '2024-01-26', days: 5, reason: 'Holiday trip', status: 'Rejected', appliedAt: '2024-01-15' },
]

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState(() => {
    const stored = localStorage.getItem('lf_leaves')
    return stored ? JSON.parse(stored) : SAMPLE_LEAVES
  })

  useEffect(() => {
    localStorage.setItem('lf_leaves', JSON.stringify(leaves))
  }, [leaves])

  const applyLeave = (leaveData, user) => {
    const newLeave = {
      id: Date.now(),
      employeeId: user.id,
      employeeName: user.name,
      ...leaveData,
      status: 'Pending',
      appliedAt: new Date().toISOString().split('T')[0],
    }
    setLeaves(prev => [newLeave, ...prev])
    return newLeave
  }

  const updateStatus = (id, status) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const getMyLeaves = (userId) => leaves.filter(l => l.employeeId === userId)

  const getPendingLeaves = () => leaves.filter(l => l.status === 'Pending')

  return (
    <LeaveContext.Provider value={{ leaves, applyLeave, updateStatus, getMyLeaves, getPendingLeaves }}>
      {children}
    </LeaveContext.Provider>
  )
}

export const useLeave = () => useContext(LeaveContext)
