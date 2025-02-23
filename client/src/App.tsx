import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KanbanBoard from './components/KanbanBoard';
import LoginPage from './components/LoginPage';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;