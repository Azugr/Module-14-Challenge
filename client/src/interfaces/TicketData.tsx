export interface TicketData {
  id?: number; 
  name: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done'; 
}
