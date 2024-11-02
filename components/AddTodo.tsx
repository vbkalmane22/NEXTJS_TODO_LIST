"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface AddTodoFormProps {
  isDark:boolean,
  onAdd: (text: string) => void
}

const AddTodo: React.FC<AddTodoFormProps> = ({ onAdd,isDark }) => {
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');
console.log("Dark in addtodo",isDark)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.trim() === '') {
      setError(" !!! Please enter a task");
      return;
    }
    if (newItem.trim()) {
      onAdd(newItem.trim())
      setNewItem('')
      setError('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <div className={`flex flex-1 border ${isDark ?'border-gray-600':'border-gray-300'} rounded-lg overflow-hidden justify-center items-center pr-1`}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new list item"
            className="flex-1 p-4 text-lg text-gray-600 placeholder-gray-400 bg-transparent border-none focus:outline-none rounded-l-md"
          />
          
          <Button 
            type="submit"
            className="px-6 py-6 bg-[#4361ee] hover:bg-[#3851e4] text-white text-lg font-regular rounded-md flex-shrink-0"
          >
          Add
          </Button>
        </div>
      </form>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default AddTodo