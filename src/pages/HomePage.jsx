import { useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import QuickAdd from '../components/QuickAdd'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import SearchFilterSort from '../components/SearchFilterSort'
import PageHeader from '../components/PageHeader'

function HomePage({
  tasks,
  addQuickTask,
  addTask,
  markComplete,
  deleteTask,
  updatePriority,
}) {
  const [searchText, setSearchText] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortOption, setSortOption] = useState('Default')

  const visibleTasks = useMemo(() => {
    let filteredTasks = [...tasks]

    if (searchText.trim()) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    if (categoryFilter !== 'All') {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === categoryFilter
      )
    }

    if (statusFilter !== 'All') {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === statusFilter
      )
    }

    if (sortOption === 'DueDate') {
      filteredTasks.sort(
        (a, b) =>
          new Date(`${a.dueDate}T00:00:00`) - new Date(`${b.dueDate}T00:00:00`)
      )
    } else if (sortOption === 'Priority') {
      const priorityOrder = {
        High: 0,
        Medium: 1,
        Low: 2,
      }

      filteredTasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority] ?? 1
        const bPriority = priorityOrder[b.priority] ?? 1
        return aPriority - bPriority
      })
    } else if (sortOption === 'TitleAZ') {
      filteredTasks.sort((a, b) => a.title.localeCompare(b.title))
    }

    return filteredTasks
  }, [tasks, searchText, categoryFilter, statusFilter, sortOption])

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <PageHeader
            title="Home Dashboard"
            subtitle="BadgerSchedule helps students quickly create, organize, and manage tasks in one place."
          />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <QuickAdd addQuickTask={addQuickTask} />
          <TaskForm addTask={addTask} />
          <SearchFilterSort
            searchText={searchText}
            setSearchText={setSearchText}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </Col>

        <Col lg={6}>
          <TaskList
            tasks={visibleTasks}
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