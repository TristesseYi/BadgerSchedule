import { Badge } from 'react-bootstrap'

function StatusBadge({ status }) {
  const normalizedStatus = (status || 'In Progress').toString().toLowerCase()

  const badgeColor = normalizedStatus === 'complete' ? 'success' : 'warning'
  const displayStatus = normalizedStatus === 'complete' ? 'Complete' : 'In Progress'

  return <Badge bg={badgeColor}>{displayStatus}</Badge>
}

export default StatusBadge