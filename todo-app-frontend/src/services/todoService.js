
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getAllTodos = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodoById = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (todo) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (id, todo) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};