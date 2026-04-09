import { Badge, Card, Col, Container, Row } from 'react-bootstrap'

function WeeklyPage({ tasks }) {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const tasksByDay = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  }

  const priorityOrder = {
    High: 0,
    Medium: 1,
    Low: 2,
  }

  function normalizePriority(priority) {
    const value = (priority || 'Medium').toString().toLowerCase()

    if (value === 'high') return 'High'
    if (value === 'low') return 'Low'
    return 'Medium'
  }

  function getPriorityColor(priority) {
    const normalized = normalizePriority(priority)

    if (normalized === 'High') return '#dc3545'
    if (normalized === 'Medium') return '#ffc107'
    return '#198754'
  }

  function getStartOfWeek(date) {
    const result = new Date(date)
    const day = result.getDay()
    const diff = day === 0 ? -6 : 1 - day
    result.setDate(result.getDate() + diff)
    result.setHours(0, 0, 0, 0)
    return result
  }

  function getEndOfWeek(date) {
    const result = getStartOfWeek(date)
    result.setDate(result.getDate() + 6)
    result.setHours(23, 59, 59, 999)
    return result
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startOfWeek = getStartOfWeek(today)
  const endOfWeek = getEndOfWeek(today)

  tasks.forEach((task) => {
    const taskDate = new Date(`${task.dueDate}T00:00:00`)

    if (taskDate < today) return
    if (taskDate < startOfWeek || taskDate > endOfWeek) return

    const dayName = weekDays[taskDate.getDay()]
    tasksByDay[dayName].push({
      ...task,
      priority: normalizePriority(task.priority),
    })
  })

  Object.keys(tasksByDay).forEach((day) => {
    tasksByDay[day].sort((a, b) => {
      const aPriority = priorityOrder[a.priority] ?? 1
      const bPriority = priorityOrder[b.priority] ?? 1
      return aPriority - bPriority
    })
  })

  const displayOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  return (
    <Container className="py-4">
      <h1 className="mb-4">Weekly Calendar</h1>

      <Row className="g-3">
        {displayOrder.map((day) => (
          <Col key={day}>
            <Card className="shadow-sm h-100" style={{ minHeight: '280px' }}>
              <Card.Body>
                <Card.Title
                  style={{
                    borderBottom: '1px solid #ddd',
                    paddingBottom: '8px',
                    marginBottom: '12px',
                  }}
                >
                  {day}
                </Card.Title>

                {tasksByDay[day].length > 0 ? (
                  tasksByDay[day].map((task) => (
                    <div
                      key={task.id}
                      style={{
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        padding: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{
                          height: '8px',
                          backgroundColor: getPriorityColor(task.priority),
                          borderRadius: '6px',
                          marginBottom: '10px',
                        }}
                      ></div>

                      <div style={{ fontWeight: '600' }}>{task.title}</div>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                        {task.category}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                        Due: {task.dueDate}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                        Priority: {task.priority}
                      </div>

                      <div style={{ marginTop: '8px' }}>
                        <Badge bg={task.status === 'Complete' ? 'success' : 'warning'}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#6c757d' }}>No task scheduled.</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default WeeklyPage