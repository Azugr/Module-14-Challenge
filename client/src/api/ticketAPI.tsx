import { TicketData } from '../interfaces/TicketData.js';
import { APIMessage } from '../interfaces/APIMessage.js';
import Auth from '../utils/auth.js';

// ✅ Ensure API_BASE_URL works for both localhost & Render
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Function to refresh the board dynamically
const refreshBoard = () => {
  window.location.reload();
};

// ✅ Fetch all tickets
const retrieveTickets = async (): Promise<TicketData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets`, {  
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) throw new Error(`🚨 Invalid API response (${response.status})`);

    return await response.json();
  } catch (err) {
    console.error('❌ Error retrieving tickets:', err);
    return [];
  }
};

// ✅ Fetch a single ticket by ID
const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  if (!id) return Promise.reject('🚨 Ticket ID is required');

  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, {  
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) throw new Error(`🚨 Invalid API response (${response.status})`);

    return await response.json();
  } catch (err) {
    console.error('❌ Error retrieving ticket:', err);
    return Promise.reject('Could not fetch singular ticket');
  }
};

// ✅ Create a new ticket & refresh board
const createTicket = async (body: TicketData): Promise<TicketData> => {
  console.log("🛠️ Creating ticket with data:", body);

  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`🚨 Invalid API response (${response.status})`);

    const data = await response.json();
    console.log("✅ Ticket successfully created:", data);

    refreshBoard(); // 🔄 Refresh the board after creation
    return data;
  } catch (err) {
    console.error('❌ Error creating ticket:', err);
    return Promise.reject('Could not create ticket');
  }
};

// ✅ Update a ticket & refresh board
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

    if (!response.ok) throw new Error(`🚨 Invalid API response (${response.status})`);

    const data = await response.json();
    refreshBoard(); // 🔄 Refresh the board after update
    return data;
  } catch (err) {
    console.error('❌ Error updating ticket:', err);
    return Promise.reject('Update did not work');
  }
};

// ✅ Delete a ticket & refresh board
const deleteTicket = async (ticketId: number): Promise<APIMessage> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {  
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    if (!response.ok) throw new Error(`🚨 Invalid API response (${response.status})`);

    const data = await response.json();
    refreshBoard(); // 🔄 Refresh the board after deletion
    return data;
  } catch (err) {
    console.error('❌ Error deleting ticket:', err);
    return Promise.reject('Could not delete ticket');
  }
};

export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };
