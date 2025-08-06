import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './Taskcard';

const TaskColumn = ({ title, tasks, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md w-full md:w-1/3">
      <h2 className="text-xl font-semibold mb-3 text-center">{title}</h2>

      <Droppable droppableId={title.trim()}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] space-y-3"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
