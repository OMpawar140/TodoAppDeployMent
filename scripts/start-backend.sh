#!/bin/bash

echo "=== Starting Backend Deployment ==="

# Navigate to the deployed directory
cd /home/ec2-user/todo-app/todo-app-backend || exit

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Start the server in the background
echo "Starting server.js in the background..."
nohup node server.js > /home/ec2-user/todo-app/backend.log 2>&1 &

echo "=== Backend started successfully ==="
