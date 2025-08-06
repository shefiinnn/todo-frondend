import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';

const TaskList = ({ tasks, setTasks, onEdit, onDelete }) => {
  const [priorityFilter, setPriorityFilter] = useState("All");

  const handleDragEnd = result => {
    const { source, destination } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const updatedTasks = tasks.map(task => {
      if (task.id === parseInt(result.draggableId)) {
        const updatedTask = { ...task, status: destination.droppableId };

        fetch(`https://backend-todo-sj1x.onrender.com/api/tasks/${task.id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        }).catch(error => console.error('Error updating task status:', error));

        return updatedTask;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (priorityFilter === "All") return true;
    return task.priority === priorityFilter;
  });

  const groupedTasks = {
    'To-Do': filteredTasks.filter(task => task.status === 'To-Do'),
    'In Progress': filteredTasks.filter(task => task.status === 'In Progress'),
    'Done': filteredTasks.filter(task => task.status === 'Done'),
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Priority:</label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border px-3 py-1 rounded-md shadow-sm"
        >
          <option value="All">All</option>
          <option value="Low Priority">Low</option>
          <option value="High Priority">High</option>
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {['To-Do', 'In Progress', 'Done'].map(status => (
            <TaskColumn
              key={status}
              title={status}
              tasks={groupedTasks[status]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskList;