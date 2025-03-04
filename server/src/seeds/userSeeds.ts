import { User } from '../models/user';

// Function to seed user data
export const userSeeds = async () => {
  // Delete all existing users
  await User.destroy({ where: {} });

  // Bulk create new users
  await User.bulkCreate(
    [
      {
        username: 'user1',
        password: 'password',
      },
      {
        username: 'user2',
        password: 'password',
      },
      {
        username: 'user3',
        password: 'password',
      },
      {
        username: 'user4',
        password: 'password',
      },
      {
        username: 'user5',
        password: 'password',
      },
    ],
    { individualHooks: true } // Ensure hooks are run for each user
  );
};
