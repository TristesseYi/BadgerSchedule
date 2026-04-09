import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CustomNavbar from './components/CustomNavbar'
import HomePage from './pages/HomePage'
import WeeklyPage from './pages/WeeklyPage'

function App() {
  const defaultTasks = [
    {
      id: 1,
      title: 'Finish CS571 homework',
      category: 'Homework',
      dueDate: '2026-03-20',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Gym session',
      category: 'Health',
      dueDate: '2026-03-21',
      status: 'In Progress',
      priority: 'Low',
    },
    {
      id: 3,
      title: 'Team meeting',
      category: 'Meeting',
      dueDate: '2026-03-22',
      status: 'Complete',
      priority: 'Medium',
    },
  ]

  function normalizePriority(priority) {
    const value = (priority || 'Medium').toString().toLowerCase()

    if (value === 'high') return 'High'
    if (value === 'low') return 'Low'
    return 'Medium'
  }

  function normalizeTasks(taskList) {
    return taskList.map((task) => ({
      ...task,
      priority: normalizePriority(task.priority),
    }))
  }

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('badgerTasks')

    if (savedTasks) {
      return normalizeTasks(JSON.parse(savedTasks))
    }

    return defaultTasks
  })

  useEffect(() => {
    localStorage.setItem('badgerTasks', JSON.stringify(tasks))
  }, [tasks])

  function formatLocalDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  function getNextWeekday(targetDay) {
    const now = new Date()
    const todayDay = now.getDay()
    let diff = targetDay - todayDay

    if (diff < 0) {
      diff += 7
    }

    const targetDate = new Date(now)
    targetDate.setDate(now.getDate() + diff)
    return formatLocalDate(targetDate)
  }

  function getEndOfWeek() {
    const now = new Date()
    const todayDay = now.getDay()
    const diffToSunday = todayDay === 0 ? 0 : 7 - todayDay

    const sunday = new Date(now)
    sunday.setDate(now.getDate() + diffToSunday)
    return formatLocalDate(sunday)
  }

  function extractDateFromQuickAdd(text) {
    const lowerText = text.toLowerCase()
    const now = new Date()

    if (lowerText.includes('today')) {
      return formatLocalDate(now)
    }

    if (lowerText.includes('tomorrow')) {
      const tomorrow = new Date(now)
      tomorrow.setDate(now.getDate() + 1)
      return formatLocalDate(tomorrow)
    }

    if (
      lowerText.includes('end of this week') ||
      lowerText.includes('this weekend') ||
      lowerText.includes('this week')
    ) {
      return getEndOfWeek()
    }

    if (lowerText.includes('monday')) return getNextWeekday(1)
    if (lowerText.includes('tuesday')) return getNextWeekday(2)
    if (lowerText.includes('wednesday')) return getNextWeekday(3)
    if (lowerText.includes('thursday')) return getNextWeekday(4)
    if (lowerText.includes('friday')) return getNextWeekday(5)
    if (lowerText.includes('saturday')) return getNextWeekday(6)
    if (lowerText.includes('sunday')) return getNextWeekday(0)

    return formatLocalDate(now)
  }

  function cleanQuickAddTitle(text) {
    let cleaned = text

    cleaned = cleaned.replace(/\bend of this week\b/gi, '')
    cleaned = cleaned.replace(/\bthis weekend\b/gi, '')
    cleaned = cleaned.replace(/\bthis week\b/gi, '')
    cleaned = cleaned.replace(/\btomorrow\b/gi, '')
    cleaned = cleaned.replace(/\btoday\b/gi, '')

    cleaned = cleaned.replace(/\bon monday\b/gi, '')
    cleaned = cleaned.replace(/\bon tuesday\b/gi, '')
    cleaned = cleaned.replace(/\bon wednesday\b/gi, '')
    cleaned = cleaned.replace(/\bon thursday\b/gi, '')
    cleaned = cleaned.replace(/\bon friday\b/gi, '')
    cleaned = cleaned.replace(/\bon saturday\b/gi, '')
    cleaned = cleaned.replace(/\bon sunday\b/gi, '')

    cleaned = cleaned.replace(/\bat monday\b/gi, '')
    cleaned = cleaned.replace(/\bat tuesday\b/gi, '')
    cleaned = cleaned.replace(/\bat wednesday\b/gi, '')
    cleaned = cleaned.replace(/\bat thursday\b/gi, '')
    cleaned = cleaned.replace(/\bat friday\b/gi, '')
    cleaned = cleaned.replace(/\bat saturday\b/gi, '')
    cleaned = cleaned.replace(/\bat sunday\b/gi, '')

    cleaned = cleaned.replace(/\bmonday\b/gi, '')
    cleaned = cleaned.replace(/\btuesday\b/gi, '')
    cleaned = cleaned.replace(/\bwednesday\b/gi, '')
    cleaned = cleaned.replace(/\bthursday\b/gi, '')
    cleaned = cleaned.replace(/\bfriday\b/gi, '')
    cleaned = cleaned.replace(/\bsaturday\b/gi, '')
    cleaned = cleaned.replace(/\bsunday\b/gi, '')

    cleaned = cleaned.replace(/\bat\b/gi, '')
    cleaned = cleaned.replace(/\bon\b/gi, '')
    cleaned = cleaned.replace(/\s+/g, ' ').trim()

    return cleaned || text
  }

  function extractPriorityFromQuickAdd(text) {
    const lowerText = text.toLowerCase()

    if (
      lowerText.includes('urgent') ||
      lowerText.includes('asap') ||
      lowerText.includes('important') ||
      lowerText.includes('high priority')
    ) {
      return 'High'
    }

    if (
      lowerText.includes('low priority') ||
      lowerText.includes('later') ||
      lowerText.includes('whenever')
    ) {
      return 'Low'
    }

    return 'Medium'
  }

  function addQuickTask(text) {
    if (!text.trim()) return

    const lowerText = text.toLowerCase()
    const dueDate = extractDateFromQuickAdd(text)
    const cleanedTitle = cleanQuickAddTitle(text)
    const priority = extractPriorityFromQuickAdd(text)

    let category = 'Personal'
    if (lowerText.includes('homework') || lowerText.includes('study')) {
      category = 'Homework'
    } else if (lowerText.includes('gym') || lowerText.includes('doctor')) {
      category = 'Health'
    } else if (lowerText.includes('meeting') || lowerText.includes('call')) {
      category = 'Meeting'
    }

    const newTask = {
      id: Date.now(),
      title: cleanedTitle,
      category,
      dueDate,
      status: 'In Progress',
      priority,
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  function addTask(title, category, dueDate, priority) {
    if (!title.trim() || !category || !dueDate || !priority) return

    const newTask = {
      id: Date.now(),
      title,
      category,
      dueDate,
      status: 'In Progress',
      priority: normalizePriority(priority),
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  function markComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'Complete' ? 'In Progress' : 'Complete',
            }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  function updatePriority(id, newPriority) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              priority: normalizePriority(newPriority),
            }
          : task
      )
    )
  }

  return (
    <BrowserRouter basename="/BadgerSchedule">
      <CustomNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              tasks={tasks}
              addQuickTask={addQuickTask}
              addTask={addTask}
              markComplete={markComplete}
              deleteTask={deleteTask}
              updatePriority={updatePriority}
            />
          }
        />
        <Route path="/weekly" element={<WeeklyPage tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App