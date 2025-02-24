import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

const userData = [
    {
        username: 'user1',
        password: 'password1', 
    },
    {
        username: 'user2',
        password: 'password2',
    },
    {
      username: 'user3',
      password: 'password3',
  },
    
];

const userSeeds = async () => {
  try {
    console.log('Seeding users...');
    const usersWithHashedPasswords = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    await User.bulkCreate(usersWithHashedPasswords);
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export default userSeeds;