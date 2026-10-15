CREATE DATABASE task_manager_db;

USE task_manager_db;

SELECT id, title, description, completed
FROM task
ORDER BY id;