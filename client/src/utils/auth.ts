import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  // Decode the token and get the user profile
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  // Check if the user is logged in by verifying the token
  loggedIn() {
    const token = this.getToken();
    return token;
  }
  
  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  // Get the token from local storage
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // Save the token to local storage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); 
  }

  // Remove the token from local storage and redirect to the login page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

// Export an instance of AuthService for use in other parts of the application
export default new AuthService();