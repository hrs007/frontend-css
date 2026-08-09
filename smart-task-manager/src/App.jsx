import { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, ListTodo } from 'lucide-react';

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Master React Fundamentals', completed: true },
    { id: 2, text: 'Build a Portfolio Website', completed: false },
    { id: 3, text: 'Learn Tailwind CSS Grids', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <ListTodo size={28} />
            <h1 className="text-2xl font-bold">Task Manager</h1>
          </div>
          <p className="text-blue-100 text-sm">Stay organized, stay productive.</p>
        </div>

        {/* Input Form */}
        <div className="p-6 pb-2">
          <form onSubmit={addTask} className="relative">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="flex px-6 py-2 gap-2">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === f 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="p-6 pt-4 h-75 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
              <CheckCircle2 size={48} className="opacity-20" />
              <p>No tasks found.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map(task => (
                <li 
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-all group"
                >
                  <div 
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                    onClick={() => toggleTask(task.id)}
                  >
                    <button className={`${task.completed ? 'text-green-500' : 'text-slate-400 hover:text-blue-500'} transition-colors`}>
                      {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    <span className={`text-slate-700 font-medium ${task.completed ? 'line-through opacity-50' : ''}`}>
                      {task.text}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer Stats */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
          <span>{tasks.filter(t => !t.completed).length} tasks remaining</span>
          <button 
            onClick={() => setTasks(tasks.filter(t => !t.completed))}
            className="hover:text-slate-800 transition-colors"
          >
            Clear completed
          </button>
        </div>

      </div>
    </div>
  );
}