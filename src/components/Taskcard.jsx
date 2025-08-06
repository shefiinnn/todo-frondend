import jsPDF from "jspdf";
import "./TaskCard.css";

function TaskCard({ task, onEdit, onDelete }) {
  const { title, priority, dueDate, description } = task;

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`Task: ${title}`, 10, 10);
    doc.text(`Priority: ${priority}`, 10, 20);
    doc.text(`Due Date: ${dueDate}`, 10, 30);
    doc.text(`Description: ${description || "No description"}`, 10, 40);
    doc.save(`${title}.pdf`);
  };

  return (
    <div className="task-card">
      <h2 className="task-title">{title}</h2>

      <span
        className={`px-2 py-1 rounded text-white text-sm ${priority === 'High Priority'
            ? 'bg-red-500'
            : 'bg-green-500'
          }`}
      >
        {priority}
      </span>


      <div className="mb-2">
        <span className="font-semibold text-gray-600">Due Date:</span>{" "}
        <span>{dueDate}</span>
      </div>

      <div className="mb-4">
        <span className="font-semibold text-gray-600">Description:</span>
        <p className="mt-1 text-gray-700">{description || "No description"}</p>
      </div>

      <div className="task-buttons">
        <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
        <button className="pdf-btn" onClick={downloadPdf}>Download PDF</button>
      </div>
    </div>
  );
}

export default TaskCard;
