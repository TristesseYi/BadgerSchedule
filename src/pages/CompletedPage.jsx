import { Container, Card, Badge } from 'react-bootstrap'

function CompletedPage({ tasks }) {
  const completedTasks = tasks.filter((task) => task.status === 'Complete')

  function getPriorityColor(priority) {
    if (priority === 'High') return '#dc3545'
    if (priority === 'Medium') return '#ffc107'
    return '#198754'
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Completed Tasks</h1>

      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        completedTasks.map((task) => (
          <Card key={task.id} className="mb-3 shadow-sm">
            <Card.Body>
              <div
                style={{
                  height: '8px',
                  backgroundColor: getPriorityColor(task.priority),
                  borderRadius: '999px',
                  marginBottom: '16px',
                }}
              ></div>

              <h3>{task.title}</h3>
              <p className="mb-1">
                Category:{' '}
                <Badge bg="secondary">
                  {task.category}
                </Badge>
              </p>
              <p className="mb-1">Due: {task.dueDate}</p>
              <p className="mb-2">Priority: {task.priority}</p>
              <Badge bg="success">{task.status}</Badge>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  )
}

export default CompletedPage