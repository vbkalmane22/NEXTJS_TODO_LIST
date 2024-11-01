import React from 'react'

interface TodoFooterProps {
  itemCount: number
  onClearAll: () => void
}

const TodoFooter: React.FC<TodoFooterProps> = ({ itemCount, onClearAll }) => {
  return (
    <div className="pt-6 border-t border-gray-200">
    <div className="flex justify-between text-base">
      <span className="text-gray-400">{itemCount} items</span>
      <button
        onClick={onClearAll}
        className="text-gray-400 hover:text-gray-600"
      >
        Clear All
      </button>
    </div>
  </div>
  )
}

export default TodoFooter