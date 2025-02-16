// Function to get the token from localStorage
export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  // Function to check if the user is authenticated
  export const isAuthenticated = (): boolean => {
    const token = getToken();
    return !!token;
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
  };