import { UserLogin } from "../interfaces/UserLogin.js";

const login = async (userInfo: UserLogin) => {
  // Use the environment variable for the API base URL
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  });

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  const user = await res.json();
  return user;
};

export { login };