import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData.js';
import { APIMessage } from '../interfaces/APIMessage.js';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<APIMessage>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const handleDelete = async () => {
    if (ticket.id !== undefined && ticket.id !== null) {
      try {
        await deleteTicket(ticket.id);
        console.log(`✅ Ticket ${ticket.id} deleted successfully.`);
      } catch (error) {
        console.error('❌ Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className="ticket-card">
      <h3>{ticket.name || 'No Title'}</h3>
      <p>{ticket.description || 'No Description'}</p>
      <p><strong>Status:</strong> {ticket.status || 'Unknown'}</p>
      {ticket.id !== undefined && ticket.id !== null && (
        <>
          <Link to="/edit" state={{ id: ticket.id }} className="editBtn">
            Edit
          </Link>
          <button type="button" onClick={handleDelete} className="deleteBtn">
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TicketCard;

