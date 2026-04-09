import { Card } from 'react-bootstrap'
import TaskCard from './TaskCard'

function TaskList({ tasks, markComplete, deleteTask, updatePriority }) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Task List</Card.Title>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            category={task.category}
            dueDate={task.dueDate}
            status={task.status}
            priority={task.priority}
            markComplete={markComplete}
            deleteTask={deleteTask}
            updatePriority={updatePriority}
          />
        ))}
      </Card.Body>
    </Card>
  )
}

export default TaskList