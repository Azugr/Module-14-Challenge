import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' },
], { individualHooks: true });
};