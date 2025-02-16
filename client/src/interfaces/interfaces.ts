export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  }
