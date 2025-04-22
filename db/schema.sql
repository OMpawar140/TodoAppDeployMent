
CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;


CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO todos (title, description, status) VALUES
('Complete project setup', 'Set up React and Node.js environment', 'completed'),
('Build API endpoints', 'Create the CRUD endpoints for todos', 'in_progress'),
('Design UI components', 'Create components with Tailwind CSS', 'pending');