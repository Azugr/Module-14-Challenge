import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const NavBar = () => {
  // State to check if the user is logged in
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  // useEffect to check login status on component mount and when loginCheck changes
  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {
          !loginCheck ? (
            // Show Login button if the user is not logged in
            <li className='nav-item'>
              <button type='button'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          ) : (
            // Show Logout button if the user is logged in
            <li className='nav-item'>
              <button type='button' onClick={() => {
                auth.logout();
              }}>Logout</button>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default NavBar;