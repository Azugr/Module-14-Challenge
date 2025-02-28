import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      username: 'user1',
      password: "password",
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
      { individualHooks: true  });
    };
