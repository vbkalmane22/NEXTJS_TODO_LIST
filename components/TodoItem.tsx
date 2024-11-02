import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface TodoItemProps {
  todo: { id: number; text: string; done: boolean };
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-3 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        onClick={onToggle}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
          ${todo.done ? 'border-emerald-400 bg-emerald-400' : 'border-gray-300'}`}
      >
        {todo.done && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-lg transition-colors duration-200
        ${todo.done ? 'line-through text-gray-400' : 'text-[#1a237e]'}
        ${!todo.done && isHovered ? 'text-[#4361ee] cursor-pointer' : ''}
      `}>
        {todo.text}
       
      </span>
    </div>
  );
}

export default TodoItem;