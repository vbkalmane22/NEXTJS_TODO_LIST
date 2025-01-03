import React from "react";
import { SortType } from "@/lib/types";


interface TodoFooterProps {
  itemCount: number;
  onClearAll: () => void;
  onSort: (type: SortType) => void;
  currentSortType: SortType;
  isDark:boolean;
}
const TodoFooter: React.FC<TodoFooterProps> = ({
  itemCount,
  onClearAll,
  onSort,
  currentSortType,
  isDark
}) => {
  return (
    <div className={`pt-5 border-t ${isDark ? 'border-gray-600':'border-gray-300'}`}>
      <div className="flex justify-between items-center text-base">
        <span className="text-gray-400">{itemCount} items</span>
        <div className="space-x-4">
          <button
            onClick={() => onSort("alphabetical")}
            className={`text-gray-400 hover:text-gray-600 ${
              currentSortType === "alphabetical" ? "font-bold underline" : ""
            }`}
          >
            Sort A-Z
          </button>
          <button
            onClick={() => onSort("status")}
            className={`text-gray-400 hover:text-gray-600 ${
              currentSortType === "status" ? "font-bold underline" : ""
            }`}
          >
            Sort by Status
          </button>
          <button
            onClick={onClearAll}
            className="text-gray-400 hover:text-gray-600"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoFooter;
