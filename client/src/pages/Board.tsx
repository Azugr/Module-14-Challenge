import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { APIMessage } from '../interfaces/APIMessage';

import auth from '../utils/auth.js';

// Define the possible board states
const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  // State to store tickets
  const [tickets, setTickets] = useState<TicketData[]>([]);
  // State to handle errors
  const [error, setError] = useState(false);
  // State to check if the user is logged in
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  // Function to fetch tickets from the API
  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  // Function to delete an individual ticket
  const deleteIndvTicket = async (ticketId: number): Promise<APIMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  // useLayoutEffect to check login status on component mount
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  // useEffect to fetch tickets if the user is logged in
  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  // Render the error page if there is an error
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {
        !loginCheck ? (
          // Show login notice if the user is not logged in
          <div className='login-notice'>
            <h1>
              Login to create & view tickets
            </h1>
          </div>
        ) : (
          // Show the board with tickets if the user is logged in
          <div className='board'>
            <button type='button' id='create-ticket-link'>
              <Link to='/create'>New Ticket</Link>
            </button>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane
                    title={status}
                    key={status}
                    tickets={filteredTickets}
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Board;