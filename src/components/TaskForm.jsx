import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Homework')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Medium')

  function convertDateToISO(dateString) {
    const parts = dateString.split('/')

    if (parts.length !== 3) return ''

    const month = parts[0].padStart(2, '0')
    const day = parts[1].padStart(2, '0')
    const year = parts[2]

    if (!month || !day || !year || year.length !== 4) return ''

    return `${year}-${month}-${day}`
  }

  function handleSubmit(e) {
    e.preventDefault()

    const formattedDate = convertDateToISO(dueDate)
    if (!title.trim() || !category || !formattedDate || !priority) return

    addTask(title, category, formattedDate, priority)

    setTitle('')
    setCategory('Homework')
    setDueDate('')
    setPriority('Medium')
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Add a Task</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Control
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>

            <Col md={4} sm={12}>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Homework</option>
                <option>Meeting</option>
                <option>Health</option>
                <option>Personal</option>
              </Form.Select>
            </Col>

            <Col md={4} sm={12}>
              <Form.Control
                type="text"
                placeholder="MM/DD/YYYY"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Col>

            <Col md={4} sm={12}>
              <Form.Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </Col>
          </Row>

          <Button className="mt-3" variant="success" type="submit">
            Create Task
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TaskForm