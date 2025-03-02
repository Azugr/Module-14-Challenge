-- Drop the existing database if it exists
DROP DATABASE IF EXISTS kanban_db;

-- Create a new database
CREATE DATABASE kanban_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Todo', 'In Progress', 'Done')),
    description TEXT,
    assignedUserId INTEGER REFERENCES users(id) ON DELETE SET NULL
);
