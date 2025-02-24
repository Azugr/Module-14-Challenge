// Function to get the token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};

// Function to check if the user is logged in (alias for isAuthenticated)
export const loggedIn = (): boolean => {
  return isAuthenticated();
};

// Function to get the current user from the token (assuming the token is a JWT)
export const getCurrentUser = (): any | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Function to log out the user
export const logout = (): void => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // Redirect to login page after logout
};

// Function to log in the user
export const login = (token: string): void => {
  localStorage.setItem('token', token);
  window.location.href = '/'; // Redirect to home page after login
};

// Default export
export default {
  getToken,
  isAuthenticated,
  loggedIn,
  getCurrentUser,
  logout,
  login
};