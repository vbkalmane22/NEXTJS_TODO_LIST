import React, { useState } from 'react'
import '../app/globals.css'
import { Pencil, Trash2, Check, Briefcase, User, AlertTriangle} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Todo {
  id: number
  text: string
  done: boolean
  category: string
}

interface TodoItemProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string, newCategory: string) => void
  isDark: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ todos, onToggle, onDelete, onEdit, isDark }) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [editCategory, setEditCategory] = useState('')

  const startEdit = (todo: Todo) => {
    if (!todo.done) {
      setEditingId(todo.id)
      setEditText(todo.text)
      setEditCategory(todo.category)
    }
  }

  const saveEdit = () => {
    if (editingId !== null) {
      onEdit(editingId, editText, editCategory)
      setEditingId(null)
    }
  }

  const renderCategoryBadge = (category: string) => {
    let categoryStyle = ""
    let IconComponent = null

    if (category === "Work") {
      categoryStyle = "bg-blue-100 text-blue-600 font-regular"
      IconComponent = Briefcase
    } else if (category === "Personal") {
      categoryStyle = "bg-green-100 text-green-600 font-regular"
      IconComponent = User
    } else if (category === "Urgent") {
      categoryStyle = "bg-red-100 text-red-600 font-regular"
      IconComponent = AlertTriangle
    }

    return (
      <div className={` w-fit flex justify-center items-center gap-1 px-2 py-1 rounded-full ${categoryStyle}`}>
        {IconComponent && <IconComponent className="w-4 h-4" />}
        <span className="text-sm font-medium">{category}</span>
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        No tasks
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        {/* <thead>
          <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <th className="px-4 py-2 text-left">Done</th>
            <th className="px-4 py-2 text-left">Task</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead> */}
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} ${todo.done ? 'line-through text-gray-500' : ''}`}>
              <td className="px-4 py-2">
                <div
                  onClick={() => onToggle(todo.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
                    ${todo.done ? 'border-emerald-400 bg-emerald-400' : isDark ? 'border-gray-600' : 'border-gray-300'}`}
                >
                  {todo.done && <Check className="w-3 h-3 text-white" />}
                </div>
              </td>
              <td className="px-4 py-2">
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={`w-full p-1 ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'} border rounded`}
                  />
                ) : (
                  <span className={`text-lg ${isDark ? 'text-gray-300' : 'text-[#1a237e]'}`}>
                    {todo.text}
                  </span>
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === todo.id ? (
                  <Select value={editCategory} onValueChange={setEditCategory}>
                    <SelectTrigger className={`w-full ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  renderCategoryBadge(todo.category)
                )}
              </td>
              <td className="px-4 py-2 flex justify-center">
                {editingId === todo.id ? (
                  <Button onClick={saveEdit} variant="outline" size="sm" className='text-lg font-bold flex'>
                    <Check/>
                  </Button>
                ) : (
                  <div className="flex space-x-2 justify-end">
                   <Button 
                      onClick={() => startEdit(todo)} 
                      variant="outline" 
                      size="sm"
                      disabled={todo.done}
                      className={todo.done ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={() => onDelete(todo.id)} 
                      variant="outline" 
                      size="sm"
                      disabled={todo.done}
                      className={todo.done ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoItem