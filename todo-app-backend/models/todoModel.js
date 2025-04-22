const { pool } = require('../config/db');

const Todo = {
  // Get all todos
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get single todo by id
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create a new todo
  create: async (todo) => {
    try {
      const [result] = await pool.query(
        'INSERT INTO todos (title, description, status) VALUES (?, ?, ?)',
        [todo.title, todo.description, todo.status || 'pending']
      );
      return { id: result.insertId, ...todo };
    } catch (error) {
      throw error;
    }
  },

  // Update a todo
  update: async (id, todo) => {
    try {
      const [result] = await pool.query(
        'UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?',
        [todo.title, todo.description, todo.status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Delete a todo
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Todo;