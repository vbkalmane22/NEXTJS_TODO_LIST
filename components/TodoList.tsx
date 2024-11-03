"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import AddTodoForm from "./AddTodo";

import TodoFooter from "./TodoFooter";
import { Sun, Moon } from "lucide-react";
import { SortType } from "@/lib/types";
import { Todo } from "@/lib/types";

import '../app/globals.css'
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortType>("alphabetical");
  const [isDarkMode, setIsDarkMode] = useState(false);

    // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // Update localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const addTodo = (text: string, category: string) => {
    setTodos([...todos, { id: Date.now(), text, done: false, category }]);
  };

  //function to toggle between "done" and "pending" state
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  //function to delete the todos
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  //function to edit the todos
  const editTodo = (id: number, newText: string, newCategory: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, category: newCategory } : todo
    ))
  }

  //Clears all the todos
  const clearAll = () => {
    setTodos([]);
  };

  //Sorting based on alphabetical and status of the task
  const sortTodos = (type: SortType) => {
    setSortType(type);
    const sortedTodos = [...todos];
    if (type === "alphabetical") {
      sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
    } else if (type === "status") {
      sortedTodos.sort((a, b) => {
        if (a.done === b.done) return 0;
        return a.done ? 1 : -1;
      });
    }
    setTodos(sortedTodos);
  };

  //function to toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div
      className={`min-h-screen flex items-center justify-center py-8 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Card
        className={`w-full max-w-5xl ${
          isDarkMode ? "bg-gray-800 border border-gray-800" : "bg-white"
        } rounded-3xl shadow-lg h-screen max-h-[90vh] flex flex-col p-8`}
      >
        <div className="w-4/5 mx-auto flex flex-col h-full mt-8 max-h-[95%]">
          <div className="flex justify-between items-center mb-12">
            <h1
              className={`text-5xl font-bold ${
                isDarkMode ? "text-[#ffffff]" : "text-[#151c66]"
              }`}
            >
              Daily To Do List
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              } transition-colors duration-200`}
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-yellow-400 bg-gray-700" />
              ) : (
                <Moon className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
          <AddTodoForm onAdd={addTodo} isDark={isDarkMode} />

          <div className="flex-grow overflow-hidden flex flex-col mt-3 mb-2 max-h-[55%]">
            <div className="flex-grow overflow-y-auto space-y-5 pr-4">
              <TodoItem
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                isDark={isDarkMode}
              />
            </div>
          </div>

          <div className="pt-4">
            <TodoFooter
              itemCount={todos.length}
              onClearAll={clearAll}
              onSort={sortTodos}
              isDark={isDarkMode}
              currentSortType={sortType}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TodoList;
