import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { APIMessage } from '../interfaces/APIMessage';
import { MouseEventHandler } from 'react';

// Define the props for the TicketCard component
interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<APIMessage>;
}

// TicketCard component to display individual ticket details
const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  // Handle delete button click
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        const data = await deleteTicket(ticketId);
        return data;
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
      <Link to='/edit' state={{ id: ticket.id }} type='button' className='editBtn'>Edit</Link>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;
