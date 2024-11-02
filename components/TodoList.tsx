'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import AddTodoForm from './AddTodo'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
import {Sun,Moon} from 'lucide-react'
// Define the Todo item type
type Todo = {
  id: number
  text: string
  done: boolean
}
type SortType = 'alphabetical' | 'status'
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [sortType, setSortType] = useState<SortType>('alphabetical')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const addTodo = (text: string) => {  
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  const clearAll = () => {
    setTodos([])
  }
  const sortTodos = (type: SortType) => {
    setSortType(type)
    const sortedTodos = [...todos]
    if (type === 'alphabetical') {
      sortedTodos.sort((a, b) => a.text.localeCompare(b.text))
    } else if (type === 'status') {
      sortedTodos.sort((a, b) => {
        if (a.done === b.done) return 0
        return a.done ? 1 : -1
      })
    }
    setTodos(sortedTodos)
  }
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
    <Card className={`w-full max-w-4xl ${isDarkMode ?'bg-gray-800':'bg-white'} rounded-3xl shadow-lg h-screen max-h-[85vh] flex flex-col p-8`}>
      <div className="w-4/5 mx-auto flex flex-col h-full mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-5xl font-bold ${isDarkMode ?'text-[#ffffff]':'text-[#151c66]'} mb-8`}>Daily To Do List</h1>
        <button onClick={toggleDarkMode} className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors duration-200`}>
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400 bg-gray-700" /> : <Moon className="w-6 h-6 text-gray-800" />}
              </button>
     </div>
        <AddTodoForm onAdd={addTodo} isDark={isDarkMode}/>

        <div className="flex-grow overflow-hidden flex flex-col mt-6">
          <div className="flex-grow overflow-y-auto space-y-6 pr-4">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 mt-auto">
        <TodoFooter 
              itemCount={todos.length} 
              onClearAll={clearAll} 
              onSort={sortTodos}
              currentSortType={sortType}
            />
        </div>
      </div>
    </Card>
  </div>
  )
}

export default TodoList