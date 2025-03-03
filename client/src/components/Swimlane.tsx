import TicketCard from './TicketCard.js';
import { TicketData } from '../interfaces/TicketData';
import { APIMessage } from '../interfaces/APIMessage';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<APIMessage>
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'swim-lane todo';
      case 'In Progress':
        return 'swim-lane inprogress';
      case 'Done':
        return 'swim-lane done';
      default:
        return 'swim-lane';
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