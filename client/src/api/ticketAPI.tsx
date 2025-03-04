import { TicketData } from '../interfaces/TicketData';
import { APIMessage } from '../interfaces/APIMessage';
import Auth from '../utils/auth';

// Function to retrieve all tickets
const retrieveTickets = async (): Promise<TicketData[]> => {
  try {
    // Make a GET request to the /api/tickets/ endpoint
    const response = await fetch('/api/tickets/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    // Parse the response JSON to get the ticket data
    const data = await response.json();

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};

// Function to retrieve a single ticket by ID
const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    // Make a GET request to the /api/tickets/:id endpoint
    const response = await fetch(`/api/tickets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    // Parse the response JSON to get the ticket data
    const data = await response.json();

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      throw new Error('Could not invalid API response, check network tab!');
    }
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return Promise.reject('Could not fetch singular ticket');
  }
};

// Function to create a new ticket
const createTicket = async (body: TicketData): Promise<TicketData> => {
  try {
    // Make a POST request to the /api/tickets/ endpoint
    const response = await fetch('/api/tickets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });

    // Parse the response JSON to get the created ticket data
    const data = await response.json();

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from Ticket Creation: ', err);
    return Promise.reject('Could not create ticket');
  }
};

// Function to update an existing ticket by ID
const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    // Make a PUT request to the /api/tickets/:id endpoint
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });

    // Parse the response JSON to get the updated ticket data
    const data = await response.json();

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

// Function to delete a ticket by ID
const deleteTicket = async (ticketId: number): Promise<APIMessage> => {
  try {
    // Make a DELETE request to the /api/tickets/:id endpoint
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    // Parse the response JSON to get the deletion message
    const data = await response.json();

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting ticket', err);
    return Promise.reject('Could not delete ticket');
  }
};

// Export the functions for use in other parts of the application
export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };