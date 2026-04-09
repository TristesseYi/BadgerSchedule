import { Badge, Button, Card, Form } from 'react-bootstrap'

function TaskCard({
  id,
  title,
  category,
  dueDate,
  status,
  priority,
  markComplete,
  deleteTask,
  updatePriority,
}) {
  const normalizedPriority = (priority || 'Medium').toLowerCase()

  let priorityColor = '#198754'
  if (normalizedPriority === 'high') {
    priorityColor = '#dc3545'
  } else if (normalizedPriority === 'medium') {
    priorityColor = '#ffc107'
  } else if (normalizedPriority === 'low') {
    priorityColor = '#198754'
  }

  const displayPriority =
    normalizedPriority === 'high'
      ? 'High'
      : normalizedPriority === 'medium'
      ? 'Medium'
      : 'Low'

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div
          style={{
            height: '8px',
            backgroundColor: priorityColor,
            borderRadius: '6px',
            marginBottom: '14px',
          }}
        ></div>

        <div className="d-flex justify-content-between align-items-start">
          <div style={{ flex: 1, marginRight: '20px' }}>
            <Card.Title>{title}</Card.Title>
            <Card.Text className="mb-1">
              Category: <Badge bg="secondary">{category}</Badge>
            </Card.Text>
            <Card.Text className="mb-1">Due: {dueDate}</Card.Text>

            <div className="mb-2">
              <strong>Priority:</strong>
              <Form.Select
                size="sm"
                value={displayPriority}
                onChange={(e) => updatePriority(id, e.target.value)}
                style={{ maxWidth: '160px', marginTop: '6px' }}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </div>

            <Badge bg={status === 'Complete' ? 'success' : 'warning'}>
              {status}
            </Badge>
          </div>

          <div className="d-flex flex-column gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => markComplete(id)}
            >
              {status === 'Complete' ? 'Undo' : 'Mark Complete'}
            </Button>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => deleteTask(id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TaskCard