import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../config/connection.js';  
import { body, validationResult } from 'express-validator';

dotenv.config();

const router = express.Router();

// **Login Route**
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    console.log('🟢 Login Request:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      console.log('🔍 Searching for user with email:', email);
      
      // **Check if the database is returning users**
      const allUsers = await User.findAll();  // ✅ Fetch all users for debugging
      console.log('📋 All Users in DB:', allUsers.map(user => user.email));  // ✅ Log only emails

      // **Query user from database**
      const foundUser = await User.findOne({ where: { email: email.toLowerCase().trim() } });

      console.log('🛠️ Found User:', foundUser);

      if (!foundUser) {
        console.log('❌ User not found:', email);
        return res.status(401).json({ message: 'User not found' });
      }

      console.log('✅ User found, verifying password...');

      // **Compare password**
      const passwordIsValid = await bcryptjs.compare(password, foundUser.password);
      if (!passwordIsValid) {
        console.log('❌ Invalid password!');
        return res.status(401).json({ message: 'Invalid password' });
      }

      // **Generate JWT Token**
      const token = jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET_KEY!, 
        { expiresIn: '365d' } // 🔥 Set to 1 year (365 days) for homework/testing purposes
      );

      console.log('✅ Login successful! Token generated.');
      return res.status(200).json({
        token,
        user: { id: foundUser.id, email: foundUser.email },
      });

    } catch (error) {
      console.error('❌ Login error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  }
);

export default router;
