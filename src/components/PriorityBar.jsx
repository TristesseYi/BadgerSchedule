function PriorityBar({ priority }) {
  const normalizedPriority = (priority || 'Medium').toString().toLowerCase()

  let priorityColor = '#198754'
  if (normalizedPriority === 'high') {
    priorityColor = '#dc3545'
  } else if (normalizedPriority === 'medium') {
    priorityColor = '#ffc107'
  }

  return (
    <div
      style={{
        height: '8px',
        backgroundColor: priorityColor,
        borderRadius: '999px',
        marginBottom: '14px',
      }}
      aria-label={`${priority || 'Medium'} priority`}
    ></div>
  )
}

export default PriorityBar