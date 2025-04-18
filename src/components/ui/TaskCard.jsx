import React from 'react';
import { useDraggable } from '@dnd-kit/core';

// TaskCard component
const TaskCard = ({ task, index }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: String(task.id),
    data: { status: task.status, index },
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
    transition: isDragging ? 'none' : 'transform 0.2s ease',
  };

  // Dynamic background color based on task status
  const statusColors = {
    'To Do': 'bg-gray-200',        // Light grey for "To Do"
    'In Progress': 'bg-yellow-200', // Yellow for "In Progress"
    'Done': 'bg-green-200',        // Green for "Done"
  };

  // Get the background color class for the task's status
  const cardBackground = statusColors[task.status] || 'bg-white'; // Fallback to white if no status matches

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative p-4 rounded-md shadow border hover:shadow-md transition max-h-44 overflow-hidden group ${cardBackground}`}
    >
      <h3 className="text-md font-semibold text-gray-800 mb-1 pr-6">{task.title}</h3>

      {task.description && (
        <div className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-3 group-hover:overflow-auto group-hover:line-clamp-none pr-1 max-h-[72px]">
          {task.description}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
