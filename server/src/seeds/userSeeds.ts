import bcryptjs from 'bcryptjs';
import { User } from '../models/user.js';

const users = [
  { email: 'user1@example.com', username: 'user1', password: 'password1' },
  { email: 'user2@example.com', username: 'user2', password: 'password2' },
  { email: 'user3@example.com', username: 'user3', password: 'password3' },
];

export const seedUsers = async () => {
  try {
    // Hash each user's password before creating
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      return { email: user.email, username: user.username, password: hashedPassword };
    }));

    await User.bulkCreate(hashedUsers);
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};