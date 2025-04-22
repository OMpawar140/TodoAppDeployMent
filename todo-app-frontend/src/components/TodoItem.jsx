import React from 'react';
import './TodoItem.css'; // Import the CSS file

const TodoItem = ({ todo, onEdit, onDelete }) => {
  // Function to display the status badge with appropriate color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-pending">Pending</span>;
      case 'in_progress':
        return <span className="badge badge-in-progress">In Progress</span>;
      case 'completed':
        return <span className="badge badge-completed">Completed</span>;
      default:
        return <span className="badge badge-default">{status}</span>;
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-item-header">
        <div>
          <h3 className="todo-title">{todo.title}</h3>
          <p className="todo-description">{todo.description}</p>
          <div className="todo-meta">
            {getStatusBadge(todo.status)}
            <span className="todo-date">
              Created: {new Date(todo.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="todo-actions">
          <button onClick={() => onEdit(todo)} className="btn btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(todo.id)} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
