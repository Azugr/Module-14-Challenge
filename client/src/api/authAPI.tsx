import { UserLogin } from "../interfaces/UserLogin";

// Function to handle user login
export const login = async (userInfo: UserLogin) => {
  // Make a POST request to the /auth/login endpoint with the user's login information
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  });

  // Check if the response is not OK (status code is not in the range 200-299)
  if (!res.ok) {
    throw new Error('Failed to login');
  }

  // Parse the response JSON to get the user data
  const user = await res.json();
  return user;
};