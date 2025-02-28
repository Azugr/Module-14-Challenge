import Auth from '../utils/auth.js';

// Ensure API_BASE_URL works for both localhost & Render
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const retrieveUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };