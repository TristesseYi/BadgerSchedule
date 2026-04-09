import { Col, Container, Row } from 'react-bootstrap'
import QuickAdd from '../components/QuickAdd'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'

function HomePage({
  tasks,
  addQuickTask,
  addTask,
  markComplete,
  deleteTask,
  updatePriority,
}) {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Home Dashboard</h1>
          <p>
            BadgerSchedule helps students quickly create, organize, and manage
            tasks in one place.
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <QuickAdd addQuickTask={addQuickTask} />
          <TaskForm addTask={addTask} />
        </Col>
        <Col lg={6}>
          <TaskList
            tasks={tasks}
            markComplete={markComplete}
            deleteTask={deleteTask}
            updatePriority={updatePriority}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage