import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ title, id, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  // Dynamic background color for the small indicator based on column status
  const columnIndicatorColors = {
    'To Do': 'bg-gray-400',        // Gray for "To Do"
    'In Progress': 'bg-yellow-500', // Yellow for "In Progress"
    'Done': 'bg-green-500',        // Green for "Done"
  };

  const indicatorColor = columnIndicatorColors[title] || 'bg-white'; // Default to white if not recognized

  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded shadow-md flex flex-col h-[75vh] overflow-hidden border-2 transition
        ${isOver ? 'border-blue-500 bg-blue-50' : 'border-transparent'} // Highlight column when dragging over it
      `}
    >
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center">
        {/* Small Circle Indicator */}
        <div className={`w-4 h-4 rounded-full ${indicatorColor} mr-2`} /> {/* Circle */}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {/* Column Body - Task List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {tasks.length ? (
          tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default Column;
