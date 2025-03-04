import { Outlet } from 'react-router-dom';

import Navbar from './components/NavBar';

function App() {
  return (
    <div className='container'>
      {/* Render the Navbar component */}
      <Navbar />
      <main>
        {/* Render the matched child route */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;