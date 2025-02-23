import { UserData } from './UserData.js';

export interface TicketData {
  id: number | null;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedUserId: number | null;
  assignedUser: UserData | null;
}
