import React, { useState } from 'react';

import { Check, Briefcase, User, AlertTriangle } from 'lucide-react';

interface TodoItemProps {
  todo: { id: number; text: string; done: boolean;category:string };
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const renderCategoryBadge = () => {
    let categoryStyle = '';
    let IconComponent = null;

    if (todo.category === 'Work') {
      categoryStyle = 'bg-blue-100 text-blue-600';
      IconComponent = Briefcase;
    } else if (todo.category === 'Personal') {
      categoryStyle = 'bg-green-100 text-green-600';
      IconComponent = User;
    } else if (todo.category === 'Urgent') {
      categoryStyle = 'bg-red-100 text-red-600';
      IconComponent = AlertTriangle;
    }

    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${categoryStyle}`}>
        {IconComponent && <IconComponent className="w-4 h-4" />}
        <span className="text-sm font-medium">{todo.category}</span>
      </div>
    );
  };
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
       {todo.text} - 
       
      </span>
      {renderCategoryBadge()}
    </div>
  );
}

export default TodoItem;