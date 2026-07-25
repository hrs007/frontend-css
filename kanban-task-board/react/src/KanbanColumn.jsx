import { useState } from 'react';
import TaskCard from "./TaskCard";

export default function KanbanColumn({ columnId, title, tasks, addTask }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const handleAddSubmit = () => {
    if (newTaskText.trim() === "") return; // Don't add empty tasks

    addTask(columnId, newTaskText); // Call the function passed from App.jsx
    setNewTaskText(""); // Clear the input
    setIsAdding(false); // Hide the input box
  };

  return (
    <div className="bg-slate-100 rounded-xl w-72 sm:w-80 shrink-0 flex flex-col max-h-full snap-center shadow-lg">

      <div className="p-3 shrink-0 flex justify-between items-center border-b border-transparent pb-2">
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
        <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">{tasks.length}</span>
      </div>

      <div className="px-2 pb-2 flex-1 overflow-y-auto flex flex-col gap-2 min-h-[150px]">
        {tasks.map((task) => <TaskCard key={task.id} content={task.content} />)}

        {/* NEW INPUT UI */}
        {isAdding && (
          <div className="p-2 bg-white rounded-lg shadow-sm border border-blue-400">
            <textarea
              autoFocus
              className="w-full text-sm text-slate-700 outline-none resize-none"
              placeholder="Enter a title for this card..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddSubmit}
                className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 font-medium"
              >
                Add card
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 shrink-0 border-t border-transparent pt-1">
        {/* Only show this button if we are NOT currently adding */}
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-slate-500 text-sm font-medium hover:text-slate-800 hover:bg-slate-200 w-full p-2 rounded-lg transition-colors text-left"
          >
            <span className="text-lg leading-none">+</span> Add a card
          </button>
        )}
      </div>
    </div>
  );
}