import React, { useState, useEffect } from "react";

function TaskForm({ onSubmit, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low Priority");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required");

    const newTask = {
      title,
      description,
      priority,
      dueDate, 
      status: "To-Do",
    };

    try {
      let url = "https://backend-todo-sj1x.onrender.com/api/tasks/";
      let method = "POST";

      if (editingTask) {
        url = `https://backend-todo-sj1x.onrender.com/api/tasks/${editingTask.id}/`;
        method = "PUT";
      }

      console.log("Submitting:", newTask);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const raw = await response.text();
      console.log("Raw response status:", response.status);
      console.log("Raw response body:", raw);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(raw);
          console.error("Backend error parsed:", errorData);
        } catch (err) {
          console.error("Backend error (not JSON):", raw);
        }
        throw new Error("Failed to save task");
      }

      const savedTask = JSON.parse(raw);
      onSubmit(savedTask);

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("Low Priority");
      setDueDate("");
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Failed to save task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingTask ? "Edit Task" : "Create Task"}
      </h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Title *</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Priority</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High Priority">High Priority</option>
          <option value="Low Priority">Low Priority</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Due Date</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        {editingTask ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;
