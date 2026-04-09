import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

function QuickAdd({ addQuickTask }) {
  const [quickText, setQuickText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    addQuickTask(quickText)
    setQuickText('')
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Quick Add</Card.Title>
        <Card.Text>
          Quickly create a task using one sentence.
        </Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Example: Finish CS571 homework tonight at 11 PM"
              value={quickText}
              onChange={(e) => setQuickText(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Add Quick Task
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default QuickAdd