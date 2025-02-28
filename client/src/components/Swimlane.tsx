import TicketCard from './TicketCard.js';
import { TicketData } from '../interfaces/TicketData.js';
import { APIMessage } from '../interfaces/APIMessage.js';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<APIMessage>;
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'todo';
      case 'In Progress':
        return 'inprogress';
      case 'Done':
        return 'done';
      default:
        return '';
    }
  };

  return (
    <div className={`swimlane ${getStatusClass(title)}`}>
      <h2>{title}</h2>
      {tickets.map(ticket => (
        <TicketCard 
          key={ticket.id}
          ticket={ticket}
          deleteTicket={deleteTicket}
        />
      ))}
    </div>
  );
};

export default Swimlane;