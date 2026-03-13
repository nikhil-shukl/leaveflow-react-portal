export default function StatusBadge({ status }) {
  const styles = {
    Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    Approved: 'bg-green-500/15 text-green-400 border-green-500/20',
    Rejected: 'bg-red-500/15 text-red-400 border-red-500/20',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.Pending}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Pending' ? 'bg-amber-400' : status === 'Approved' ? 'bg-green-400' : 'bg-red-400'}`} />
      {status}
    </span>
  )
}
