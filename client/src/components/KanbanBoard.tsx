import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

const KanbanBoard: React.FunctionComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
    } else {
      // Fetch tasks from the server
      fetchTasks(token);
    }
  }, [navigate]);

  const fetchTasks = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="kanban-board">
      <h1>Kanban Board</h1>
      <div className="columns">
        <div className="column">
          <h2>To Do</h2>
          {tasks.filter(task => task.status === 'todo').map(task => (
            <div key={task.id} className="task">
              {task.title}
            </div>
          ))}
        </div>
        <div className="column">
          <h2>In Progress</h2>
          {tasks.filter(task => task.status === 'in-progress').map(task => (
            <div key={task.id} className="task">
              {task.title}
            </div>
          ))}
        </div>
        <div className="column">
          <h2>Done</h2>
          {tasks.filter(task => task.status === 'done').map(task => (
            <div key={task.id} className="task">
              {task.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;