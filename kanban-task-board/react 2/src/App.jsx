import  { useState } from 'react';
import { Plus, MoreVertical, Trash2, GripVertical } from 'lucide-react';

const INITIAL_TASKS = [
  { id: '1', title: 'Design Landing Page', status: 'todo', priority: 'High' },
  { id: '2', title: 'Set up React Router', status: 'todo', priority: 'Medium' },
  { id: '3', title: 'Fix Navigation Bug', status: 'in-progress', priority: 'High' },
  { id: '4', title: 'Write API Documentation', status: 'in-progress', priority: 'Low' },
  { id: '5', title: 'Deploy to Vercel', status: 'done', priority: 'High' },
];

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-200 text-slate-700' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  { id: 'done', title: 'Done', color: 'bg-green-100 text-green-700' },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTo, setIsAddingTo] = useState(null); // Tracks which column is adding a task

  // Drag and Drop Handlers
  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    // Required for Firefox drag and drop to work
    e.dataTransfer.setData('text/plain', id); 
    // Make the dragging image slightly transparent
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === draggedTaskId ? { ...task, status } : task
      )
    );
    setDraggedTaskId(null);
  };

  // Task Actions
  const handleAddTask = (e, status) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: status,
      priority: 'Medium'
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsAddingTo(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Low': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans flex flex-col">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Project Alpha Kanban</h1>
        <p className="text-slate-400">Drag and drop tasks to update their status.</p>
      </div>

      {/* Board */}
      <div className="flex gap-6 flex-1 overflow-x-auto pb-4">
        {COLUMNS.map(column => (
          <div 
            key={column.id}
            className="flex flex-col bg-slate-800/50 rounded-2xl p-4 min-w-[320px] max-w-[320px] border border-slate-700/50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${column.color}`}>
                  {column.title}
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  {tasks.filter(t => t.status === column.id).length}
                </span>
              </div>
              <button className="text-slate-500 hover:text-slate-300 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Task List */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-[150px]">
              {tasks.filter(t => t.status === column.id).map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                  className="bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-700 cursor-grab active:cursor-grabbing hover:border-blue-500/50 transition-colors group relative"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="text-sm font-medium text-slate-200 leading-snug">
                      {task.title}
                    </p>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <GripVertical size={16} className="text-slate-600 opacity-50 group-hover:opacity-100" />
                  </div>
                </div>
              ))}

              {/* Add Task Input/Button */}
              {isAddingTo === column.id ? (
                <form 
                  onSubmit={(e) => handleAddTask(e, column.id)}
                  className="mt-2"
                >
                  <textarea
                    autoFocus
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none h-20"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddTask(e, column.id);
                      }
                    }}
                  />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                      Add
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setIsAddingTo(null); setNewTaskTitle(''); }}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsAddingTo(column.id)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 p-2 rounded-lg transition-colors w-full mt-1"
                >
                  <Plus size={16} />
                  Add a card
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}