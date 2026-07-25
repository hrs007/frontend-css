import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
// import your components here

const initialData = [
  { 
    id: 'col-1', 
    title: "To Do", 
    tasks: [
      { id: 't-1', content: "Design landing page wireframes" },
      { id: 't-2', content: "Research competitor pricing" }
    ] 
  },
  { 
    id: 'col-2', 
    title: "In Progress", 
    tasks: [
      { id: 't-3', content: "Build Kanban CSS layout" }
    ] 
  },
  { 
    id: 'col-3', 
    title: "Review", 
    tasks: [] 
  },
  { 
    id: 'col-4', 
    title: "Done", 
    tasks: [
      { id: 't-4', content: "Setup project repository" }
    ] 
  }
];

export default function App() {
  const [boardData, setBoardData] = useState(initialData);

  const addTask = (columnId, taskContent) => {
    const newTask = {
      id: `t-${Date.now()}`, 
      content: taskContent
    };

    const newBoardData = boardData.map(column => {
      if (column.id === columnId) {
        return {
           ...column, 
           tasks: [...column.tasks, newTask] 
        };
      }
      return column;
    });

    // 3. Update the state with the new array
    setBoardData(newBoardData);
  };

  return (
    <div className="bg-blue-600 min-h-screen flex flex-col font-sans h-screen overflow-hidden">
      <div className="flex-1 p-4 md:p-6 flex gap-4 md:gap-6 overflow-x-auto items-start snap-x snap-mandatory">
        {boardData.map((data) => (
           <KanbanColumn 
              key={data.id} 
              columnId={data.id} // We need to pass the ID down now!
              title={data.title} 
              tasks={data.tasks}
              addTask={addTask} // Pass the function down!
           />
        ))}
      </div>
    </div>
  );
}