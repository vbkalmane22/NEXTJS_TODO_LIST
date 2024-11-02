"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface AddTodoFormProps {
  isDark:boolean,
  onAdd: (text: string,category:string) => void
}

const AddTodo: React.FC<AddTodoFormProps> = ({ onAdd,isDark }) => {
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('Work')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.trim() === '') {
      setError(" !!! Please enter a task");
      return;
    }
    if (newItem.trim()) {
      onAdd(newItem.trim(),category)
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
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`px-2 py-3 text-lg ${isDark ? 'bg-gray-800 text-gray-200 border-gray-600' : 'bg-gray-100 text-black border-gray-300'} border border-none rounded-md focus:outline-none mx-2 text-center`}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
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