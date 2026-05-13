const styles = {
  pending:   'bg-yellow-100 text-yellow-800',
  in_review: 'bg-blue-100 text-blue-800',
  approved:  'bg-green-100 text-green-800',
  rejected:  'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-600',
}

const labels = {
  pending:   'Pendiente',
  in_review: 'En revisión',
  approved:  'Aprobada',
  rejected:  'Rechazada',
  cancelled: 'Cancelada',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${styles[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {labels[status] ?? status}
    </span>
  )
}
