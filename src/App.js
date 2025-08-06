import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetch('https://backend-todo-sj1x.onrender.com/api/tasks/')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleTaskSubmit = (savedTask) => {
    setTasks(prevTasks => {
      const existing = prevTasks.find(task => task.id === savedTask.id);
      if (existing) {
        return prevTasks.map(task =>
          task.id === savedTask.id ? savedTask : task
        );
      } else {
        return [...prevTasks, savedTask];
      }
    });
    setTaskToEdit(null);
  };

  const handleDelete = (id) => {
    fetch(`https://backend-todo-sj1x.onrender.com/api/tasks/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">To-do app</h1>
      <div className="p-4">
        <TaskForm onSubmit={handleTaskSubmit} editingTask={taskToEdit} />
      </div>
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} setTasks={setTasks} />
    </div>
  );
}

export default App;
