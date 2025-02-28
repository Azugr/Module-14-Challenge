import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  try {
    const hashedPasswords = await Promise.all([
      bcrypt.hash('password1', 10),
      bcrypt.hash('password2', 10),
      bcrypt.hash('password3', 10),
      bcrypt.hash('password4', 10),
      bcrypt.hash('password5', 10),
    ]);

    await User.bulkCreate(
      [
        {
          username: 'user1',
          password: hashedPasswords[0],
        },
        {
          username: 'user2',
          password: hashedPasswords[1],
        },
        {
          username: 'user3',
          password: hashedPasswords[2],
        },
        {
          username: 'user4',
          password: hashedPasswords[3],
        },
        {
          username: 'user5',
          password: hashedPasswords[4],
        },
      ],
      { individualHooks: true }
    );

    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('🚨 Error seeding users:', error);
  }
};