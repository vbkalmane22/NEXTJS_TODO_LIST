'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import AddTodoForm from './AddTodo'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

// Define the Todo item type
type Todo = {
  id: number
  text: string
  done: boolean
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'New list item', done: false },
    { id: 2, text: 'New list item', done: false },
    { id: 3, text: 'New list item', done: true }
  ])

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
    <Card className="w-full max-w-4xl bg-white rounded-3xl shadow-lg h-screen max-h-[85vh] flex flex-col p-8">
      <div className="w-4/5 mx-auto flex flex-col h-full">
        <h1 className="text-5xl font-bold text-[#1a237e] mb-8">Daily To Do List</h1>
        
        <AddTodoForm onAdd={addTodo} />

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
          <TodoFooter itemCount={todos.length} onClearAll={clearAll} />
        </div>
      </div>
    </Card>
  </div>
  )
}

export default TodoList