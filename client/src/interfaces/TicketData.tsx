export interface TicketData {
  id?: number; 
  name: string;
  status: 'Todo' | 'In Progress' | 'Done'; 
  description: string;
  
}
