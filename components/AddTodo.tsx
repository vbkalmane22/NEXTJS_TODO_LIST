"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import '../app/globals.css'
interface AddTodoFormProps {
  isDark: boolean;
  onAdd: (text: string, category: string) => void;
}

const AddTodo: React.FC<AddTodoFormProps> = ({ onAdd, isDark }) => {
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Personal");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() === "") {
      setError("Please enter a task !!!");
      return;
    }
    if (newItem.trim()) {
      onAdd(newItem.trim(), category);
      const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      const updatedTodos = [...existingTodos, { text: newItem.trim(), category }];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setNewItem("");
      setError("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <div
          className={`flex flex-1 border ${
            isDark ? "border-gray-600" : "border-gray-300"
          } rounded-lg overflow-hidden justify-center items-center pr-1`}
        >
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new list item"
            className={`flex-1 p-4 text-lg ${isDark ?'text-gray-200':'text-gray-600'} placeholder-gray-400 bg-transparent border-none focus:outline-none rounded-l-md`}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              className={`w-fit px-4 py-6 text-lg ${
                isDark
                  ? "bg-gray-700 text-gray-200 border-gray-600"
                  : "bg-gray-100 text-black border-gray-300"
              } border border-none rounded-md focus:outline-none mx-2 text-center`}
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent
              className={`${
                isDark ? "bg-gray-700 text-gray-200" : "bg-white text-black"
              }`}
            >
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
         
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
  );
};

export default AddTodo;
