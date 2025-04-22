import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import './TodoList.css'; // Import the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  const handleUpdateTodo = async (todo) => {
    try {
      const updatedTodo = await updateTodo(editingTodo.id, todo);
      setTodos(todos.map(t => t.id === editingTodo.id ? updatedTodo : t));
      setEditingTodo(null);
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {editingTodo ? (
        <div>
          <TodoForm 
            onSubmit={handleUpdateTodo} 
            initialData={editingTodo} 
          />
          <button 
            onClick={cancelEdit}
            className="cancel-button"
          >
            Cancel editing
          </button>
        </div>
      ) : (
        <TodoForm onSubmit={handleAddTodo} />
      )}

      <div className="tasks-container">
        <h2 className="tasks-title">Tasks</h2>
        
        {loading ? (
          <div className="loading-message">
            <p>Loading tasks...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="empty-tasks">
            <p>No tasks yet. Create your first task above!</p>
          </div>
        ) : (
          <div>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={handleEdit}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;