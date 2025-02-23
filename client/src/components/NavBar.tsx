import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.isAuthenticated()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button
              type='button'
              onClick={() => {
                auth.logout();
                setLoginCheck(false);
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;