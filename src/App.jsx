import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CustomNavbar from './components/CustomNavbar'
import HomePage from './pages/HomePage'
import WeeklyPage from './pages/WeeklyPage'
import CompletedPage from './pages/CompletedPage'

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

  function getUpcomingWeekday(targetDay) {
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

  function getNextWeekday(targetDay) {
    const now = new Date()
    const todayDay = now.getDay()
    let diff = targetDay - todayDay

    if (diff <= 0) {
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

  function getDayAfterTomorrow() {
    const now = new Date()
    const target = new Date(now)
    target.setDate(now.getDate() + 2)
    return formatLocalDate(target)
  }

  function parseExplicitDate(text) {
    const now = new Date()
    const match = text.match(/\b(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?\b/)

    if (!match) return null

    let month = Number(match[1])
    let day = Number(match[2])
    let year = match[3] ? Number(match[3]) : now.getFullYear()

    if (match[3] && match[3].length === 2) {
      year = 2000 + Number(match[3])
    }

    if (
      Number.isNaN(month) ||
      Number.isNaN(day) ||
      Number.isNaN(year) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return null
    }

    return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function extractDateFromQuickAdd(text) {
    const lowerText = text.toLowerCase()

    const explicitDate = parseExplicitDate(text)
    if (explicitDate) return explicitDate

    if (/\bday after tomorrow\b/.test(lowerText)) {
      return getDayAfterTomorrow()
    }

    if (/\b(by|on|at)?\s*tomorrow\b/.test(lowerText)) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return formatLocalDate(tomorrow)
    }

    if (/\b(by|on|at)?\s*(today|tonight)\b/.test(lowerText)) {
      return formatLocalDate(new Date())
    }

    if (
      /\b(by\s+the\s+end\s+of\s+this\s+week)\b/.test(lowerText) ||
      /\b(by\s+end\s+of\s+this\s+week)\b/.test(lowerText) ||
      /\b(end\s+of\s+this\s+week)\b/.test(lowerText) ||
      /\b(end\s+of\s+week)\b/.test(lowerText) ||
      /\b(this\s+weekend)\b/.test(lowerText) ||
      /\b(this\s+week)\b/.test(lowerText)
    ) {
      return getEndOfWeek()
    }

    if (/\bnext monday\b/.test(lowerText)) return getNextWeekday(1)
    if (/\bnext tuesday\b/.test(lowerText)) return getNextWeekday(2)
    if (/\bnext wednesday\b/.test(lowerText)) return getNextWeekday(3)
    if (/\bnext thursday\b/.test(lowerText)) return getNextWeekday(4)
    if (/\bnext friday\b/.test(lowerText)) return getNextWeekday(5)
    if (/\bnext saturday\b/.test(lowerText)) return getNextWeekday(6)
    if (/\bnext sunday\b/.test(lowerText)) return getNextWeekday(0)

    if (/\b(this|on|by|at)?\s*monday\b/.test(lowerText)) return getUpcomingWeekday(1)
    if (/\b(this|on|by|at)?\s*tuesday\b/.test(lowerText)) return getUpcomingWeekday(2)
    if (/\b(this|on|by|at)?\s*wednesday\b/.test(lowerText)) return getUpcomingWeekday(3)
    if (/\b(this|on|by|at)?\s*thursday\b/.test(lowerText)) return getUpcomingWeekday(4)
    if (/\b(this|on|by|at)?\s*friday\b/.test(lowerText)) return getUpcomingWeekday(5)
    if (/\b(this|on|by|at)?\s*saturday\b/.test(lowerText)) return getUpcomingWeekday(6)
    if (/\b(this|on|by|at)?\s*sunday\b/.test(lowerText)) return getUpcomingWeekday(0)

    return formatLocalDate(new Date())
  }

  function cleanQuickAddTitle(text) {
    let cleaned = text

    const patternsToRemove = [
      /\bby the end of this week\b/gi,
      /\bby end of this week\b/gi,
      /\bend of this week\b/gi,
      /\bend of week\b/gi,
      /\bthis weekend\b/gi,
      /\bthis week\b/gi,
      /\bday after tomorrow\b/gi,
      /\bby tomorrow\b/gi,
      /\bon tomorrow\b/gi,
      /\bat tomorrow\b/gi,
      /\btomorrow\b/gi,
      /\bby tonight\b/gi,
      /\bon tonight\b/gi,
      /\bat tonight\b/gi,
      /\btonight\b/gi,
      /\bby today\b/gi,
      /\bon today\b/gi,
      /\bat today\b/gi,
      /\btoday\b/gi,
      /\bnext monday\b/gi,
      /\bnext tuesday\b/gi,
      /\bnext wednesday\b/gi,
      /\bnext thursday\b/gi,
      /\bnext friday\b/gi,
      /\bnext saturday\b/gi,
      /\bnext sunday\b/gi,
      /\bthis monday\b/gi,
      /\bthis tuesday\b/gi,
      /\bthis wednesday\b/gi,
      /\bthis thursday\b/gi,
      /\bthis friday\b/gi,
      /\bthis saturday\b/gi,
      /\bthis sunday\b/gi,
      /\bby monday\b/gi,
      /\bby tuesday\b/gi,
      /\bby wednesday\b/gi,
      /\bby thursday\b/gi,
      /\bby friday\b/gi,
      /\bby saturday\b/gi,
      /\bby sunday\b/gi,
      /\bon monday\b/gi,
      /\bon tuesday\b/gi,
      /\bon wednesday\b/gi,
      /\bon thursday\b/gi,
      /\bon friday\b/gi,
      /\bon saturday\b/gi,
      /\bon sunday\b/gi,
      /\bat monday\b/gi,
      /\bat tuesday\b/gi,
      /\bat wednesday\b/gi,
      /\bat thursday\b/gi,
      /\bat friday\b/gi,
      /\bat saturday\b/gi,
      /\bat sunday\b/gi,
      /\bmonday\b/gi,
      /\btuesday\b/gi,
      /\bwednesday\b/gi,
      /\bthursday\b/gi,
      /\bfriday\b/gi,
      /\bsaturday\b/gi,
      /\bsunday\b/gi,
      /\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/gi,
    ]

    patternsToRemove.forEach((pattern) => {
      cleaned = cleaned.replace(pattern, '')
    })

    cleaned = cleaned.replace(/\b(by|on|at)\b\s*$/gi, '')
    cleaned = cleaned.replace(/\s+/g, ' ').trim()
    cleaned = cleaned.replace(/\s+([,.:!?])/g, '$1')

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
    if (lowerText.includes('homework') || lowerText.includes('study') || lowerText.includes('quiz') || lowerText.includes('exam')) {
      category = 'Homework'
    } else if (lowerText.includes('gym') || lowerText.includes('doctor') || lowerText.includes('exercise')) {
      category = 'Health'
    } else if (lowerText.includes('meeting') || lowerText.includes('call') || lowerText.includes('interview')) {
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
        <Route path="/completed" element={<CompletedPage tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App