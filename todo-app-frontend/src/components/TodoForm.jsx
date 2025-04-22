import { useState, useEffect } from 'react';
import './TodoForm.css'; // Import the CSS file

const TodoForm = ({ onSubmit, initialData }) => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    if (initialData) {
      setTodo(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(todo);
    if (!initialData) {
      setTodo({ title: '', description: '', status: 'pending' });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {initialData ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={todo.description || ''}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={todo.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="form-button">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
