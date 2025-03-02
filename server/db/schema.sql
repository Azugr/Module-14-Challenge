-- Drop the existing database if it exists
DROP DATABASE IF EXISTS kanban_db;

-- Create a new database
CREATE DATABASE kanban_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create a new table
CREATE TABLE tickets (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    assignedUserId INT,
    FOREIGN KEY (assignedUserId) REFERENCES Users(id)
);