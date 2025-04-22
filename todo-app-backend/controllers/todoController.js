const Todo = require('../models/todoModel');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get todos', error: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get todo', error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTodo = await Todo.create({ title, description, status });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo', error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const todoId = req.params.id;
    
    // Check if the todo exists
    const existingTodo = await Todo.getById(todoId);
    if (!existingTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    const updated = await Todo.update(todoId, { title, description, status });
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update todo' });
    }
    
    const updatedTodo = await Todo.getById(todoId);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo', error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    
    // Check if the todo exists
    const existingTodo = await Todo.getById(todoId);
    if (!existingTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    const deleted = await Todo.delete(todoId);
    if (!deleted) {
      return res.status(400).json({ message: 'Failed to delete todo' });
    }
    
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo', error: error.message });
  }
};