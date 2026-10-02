import { Pencil, Trash2 } from "lucide-react";

const Task = ({ id, title, completed, onToggle, onEdit, onDelete }) => {
  return (
    <li className="task">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />

      <span className={completed ? "completed" : ""}>
        {title}
      </span>

      <button
        className="edit-btn"
        onClick={() => onEdit(id)}
      >
        <Pencil size={20} />
      </button>

      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};

export default Task;