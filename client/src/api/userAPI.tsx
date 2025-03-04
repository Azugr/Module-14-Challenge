import Auth from '../utils/auth';

// Function to retrieve all users
const retrieveUsers = async () => {
  try {
    // Make a GET request to the /api/users endpoint
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    // Parse the response JSON to get the user data
    const data = await response.json();

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

// Export the function for use in other parts of the application
export { retrieveUsers };
