import { Router, Request, Response } from 'express';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  console.log('🟢 Login Request:', req.body);
  const { username, password } = req.body;

  // Find the user in the database by username
  console.log('🔍 Searching for user with username:', username);
  const user = await User.findOne({ where: { username } });

  // If user is not found, send an authentication failed response
  if (!user) {
    console.log('❌ User not found:', username);
    return res.status(404).json({ message: `User doesn't exist` });
  }

  // Compare the provided password with the stored hashed password
  console.log('🔑 Comparing passwords...');
  const validPass = await bcrypt.compare(password, user.password);

  // If password is invalid, send an authentication failed response
  if (!validPass) {
    console.log('❌ Invalid password!');
    return res.status(404).json({ message: `Password is not correct` });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  console.log('🔐 Generating JWT token...');
  // The token will expire in 365 days (1 year) for studying purposes
  const token = jwt.sign({ username }, secretKey, { expiresIn: '365d' });

  console.log('✅ Login successful! Token generated.');
  return res.json({ token });  // Send the token as a JSON response
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
