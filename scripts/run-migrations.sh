#!/bin/bash

echo "=== Running SQL Migrations ==="

# Load database credentials from environment variables or a file
DB_HOST="cloud-project-db.cve4qsww8e58.ap-south-1.rds.amazonaws.com"
DB_PORT="3306"  # or 5432 for PostgreSQL
DB_USER="admin"
DB_PASS="Indianrailways1!"
DB_NAME="todo_db"

# Run the SQL script
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < /home/ec2-user/todo-app/db/schema.sql

echo "=== Database migration completed ==="
