import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData.js';
import { APIMessage } from '../interfaces/APIMessage.js';
import { MouseEventHandler } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<APIMessage>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        await deleteTicket(ticketId);
        // Optionally, you can add logic here to update the UI after deletion
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <Link to='/edit' state={{ id: ticket.id }} type='button' className='editBtn'>
        Edit
      </Link>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>
        Delete
      </button>
    </div>
  );
};

export default TicketCard;

