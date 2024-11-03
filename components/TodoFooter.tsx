import React from "react";

type SortType = "alphabetical" | "status";

interface TodoFooterProps {
  itemCount: number;
  onClearAll: () => void;
  onSort: (type: SortType) => void;
  currentSortType: SortType;
}
const TodoFooter: React.FC<TodoFooterProps> = ({
  itemCount,
  onClearAll,
  onSort,
  currentSortType,
}) => {
  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center text-base">
        <span className="text-gray-400">{itemCount} items</span>
        <div className="space-x-4">
          <button
            onClick={() => onSort("alphabetical")}
            className={`text-gray-400 hover:text-gray-600 ${
              currentSortType === "alphabetical" ? "font-bold" : ""
            }`}
          >
            Sort A-Z
          </button>
          <button
            onClick={() => onSort("status")}
            className={`text-gray-400 hover:text-gray-600 ${
              currentSortType === "status" ? "font-bold" : ""
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
