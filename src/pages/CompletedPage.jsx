import { Badge, Card, Container } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import PriorityBar from '../components/PriorityBar'
import StatusBadge from '../components/StatusBadge'
import CompletedSummary from '../components/CompletedSummary'

function CompletedPage({ tasks }) {
  const completedTasks = tasks.filter((task) => task.status === 'Complete')

  return (
    <Container className="py-4">
      <PageHeader
        title="Completed Tasks"
        subtitle="View all tasks that have already been marked as complete."
      />

      <CompletedSummary completedTasks={completedTasks} />

      {completedTasks.length === 0 ? (
        <Card className="p-3 shadow-sm">
          <p className="mb-0">No completed tasks yet.</p>
        </Card>
      ) : (
        completedTasks.map((task) => (
          <Card key={task.id} className="mb-3 shadow-sm">
            <Card.Body>
              <PriorityBar priority={task.priority} />

              <h2 className="h4">{task.title}</h2>

              <p className="mb-1">
                Category: <Badge bg="secondary">{task.category}</Badge>
              </p>

              <p className="mb-1">Due: {task.dueDate}</p>
              <p className="mb-2">Priority: {task.priority}</p>

              <StatusBadge status={task.status} />
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  )
}

export default CompletedPage