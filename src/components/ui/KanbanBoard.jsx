import React, { useState, useEffect, useMemo } from 'react';
import { DndContext } from '@dnd-kit/core';
import Column from './Column';
import AddTaskDialog from './AddTaskDialog';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null); // For editing a task
  const columns = ['To Do', 'In Progress', 'Done'];

  // Fetch tasks from the mock API on initial load
  useEffect(() => {
    fetch('http://localhost:4000/tasks')
      .then((response) => response.json())
      .then((data) => {
        const tasksWithStringIds = data.map((task) => ({
          ...task,
          id: String(task.id),  // Ensure ID is a string
        }));
        setTasks(tasksWithStringIds);
      });
  }, []);

  // Memoize the filtered tasks per column to optimize rendering
  const filteredTasks = useMemo(() => {
    return columns.map((status) => ({
      status,
      tasks: tasks.filter((task) => task.status === status),
    }));
  }, [tasks, columns]); // This will only recompute when `tasks` or `columns` change

  // Handle dragging task and updating its status
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Update task status in the API
    fetch(`http://localhost:4000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
  };

  // Handle adding or editing a task
  const handleAddOrEditTask = (task) => {
    if (taskToEdit) {
      // If we're editing, perform a PATCH
      fetch(`http://localhost:4000/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
          );
        });
    } else {
      // If we're adding, perform a POST
      fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((data) => {
          const taskWithStringId = { ...data, id: String(data.id) };
          setTasks((prev) => [...prev, taskWithStringId]);
        });
    }

    // Clear the editing state after submitting
    setTaskToEdit(null);
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    // Optimistically remove from UI
    setTasks((prev) => prev.filter((task) => task.id !== id));

    // Delete from API
    fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete task');
      })
      .catch((err) => {
        console.error('Delete failed:', err);
        // Optionally: rollback UI if needed
      });
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 px-4 py-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🗂️ Task Board</h1>
          <AddTaskDialog
            onSubmit={handleAddOrEditTask}
            taskToEdit={taskToEdit}
            triggerLabel={taskToEdit ? 'Edit Task' : '+ Add New Task'}
          />
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTasks.map(({ status, tasks }) => (
              <Column
                key={status}
                title={status}
                id={status}
                tasks={tasks}
                onDelete={handleDeleteTask} // Pass delete function to Column
                onEdit={setTaskToEdit} // Pass edit function to Column
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
