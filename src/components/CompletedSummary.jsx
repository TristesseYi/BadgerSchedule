import { Card, Col, Row } from 'react-bootstrap'

function CompletedSummary({ completedTasks }) {
  const totalCompleted = completedTasks.length
  const highCount = completedTasks.filter((task) => task.priority === 'High').length
  const mediumCount = completedTasks.filter((task) => task.priority === 'Medium').length
  const lowCount = completedTasks.filter((task) => task.priority === 'Low').length

  return (
    <Row className="g-3 mb-4">
      <Col md={3} sm={6}>
        <Card className="shadow-sm text-center h-100">
          <Card.Body>
            <h2 className="h5">Completed</h2>
            <p className="fs-4 mb-0">{totalCompleted}</p>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} sm={6}>
        <Card className="shadow-sm text-center h-100">
          <Card.Body>
            <h2 className="h5">High Priority</h2>
            <p className="fs-4 mb-0 text-danger">{highCount}</p>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} sm={6}>
        <Card className="shadow-sm text-center h-100">
          <Card.Body>
            <h2 className="h5">Medium Priority</h2>
            <p className="fs-4 mb-0 text-warning">{mediumCount}</p>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3} sm={6}>
        <Card className="shadow-sm text-center h-100">
          <Card.Body>
            <h2 className="h5">Low Priority</h2>
            <p className="fs-4 mb-0 text-success">{lowCount}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default CompletedSummary