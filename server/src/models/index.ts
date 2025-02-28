import {sequelize}  from '../config/connection.js';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

export { sequelize, User, Ticket };