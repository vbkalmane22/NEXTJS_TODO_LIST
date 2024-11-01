import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface AddTodoFormProps {
  onAdd: (text: string) => void
}

const AddTodo: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [newItem, setNewItem] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.trim() === '') {
      setError("Empty strings are not allowed");
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
    <div className="flex flex-1 border border-gray-300 rounded-md justify-center items-center pr-1">
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new list item"
        className="flex-1 px-6 py-4 text-lg text-gray-600 placeholder-gray-400 bg-transparent border-none focus:outline-none rounded-xl"
      />
      
      <Button 
        type="submit"
        className="px-10 py-6 bg-[#4361ee] hover:bg-[#3851e4] text-white text-lg font-medium md:rounded-md"
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