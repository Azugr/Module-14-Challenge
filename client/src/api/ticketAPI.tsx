import { TicketData } from '../interfaces/TicketData.js';
import { APIMessage } from '../interfaces/APIMessage.js';
import Auth from '../utils/auth.js';

// Ensure API_BASE_URL works for both localhost & Render
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Fetch all tickets
const retrieveTickets = async (): Promise<TicketData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return await response.json();
  } catch (err) {
    console.error('Error retrieving tickets:', err);
    return [];
  }
};

// Fetch a single ticket by ID
const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  if (!id) return Promise.reject('Ticket ID is required');

  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return await response.json();
  } catch (err) {
    console.error('Error retrieving ticket:', err);
    return Promise.reject('Could not fetch singular ticket');
  }
};

// Create a new ticket
const createTicket = async (body: Omit<TicketData, 'id'>): Promise<TicketData> => {
  console.log("Creating ticket with data:", body);

  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response data:', errorData);
      throw new Error(`Invalid API response (${response.status}): ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("Ticket successfully created:", data);

    return data;
  } catch (err) {
    console.error('Error creating ticket:', err);
    if (err instanceof Error) {
      return Promise.reject(`Could not create ticket: ${err.message || 'Unknown error'}`);
    } else {
      return Promise.reject('Could not create ticket: Unknown error');
    }
  }
};

// Update a ticket
const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return await response.json();
  } catch (err) {
    console.error('Error updating ticket:', err);
    return Promise.reject('Update did not work');
  }
};

// Delete a ticket
const deleteTicket = async (ticketId: number): Promise<APIMessage> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return await response.json();
  } catch (err) {
    console.error('Error deleting ticket:', err);
    return Promise.reject('Could not delete ticket');
  }
};

export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };