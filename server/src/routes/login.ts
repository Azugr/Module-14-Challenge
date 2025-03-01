import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log("🟢 Step 1: Login request received - Username:", username);

    // Step 2: Find user in database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("❌ Step 2: User not found:", username);
      return res.status(401).json({ message: 'Authentication failed' });
    }

    console.log("✅ Step 3: User found -", user.username);

    // Step 4: Compare password
    console.log("🔍 Checking password:", password, "against stored:", user.password);

    let passwordIsValid = false;

    // Check if the stored password is hashed (bcrypt hashes start with "$2b$")
    if (user.password.startsWith("$2b$")) {
      passwordIsValid = await bcrypt.compare(password, user.password);
    } else {
      passwordIsValid = user.password === password; 
    }

    if (!passwordIsValid) {
      console.log("❌ Step 4: Password does not match!");
      return res.status(401).json({ message: 'Authentication failed' });
    }

    console.log("✅ Step 5: Login successful, generating token...");

    // Step 6: Generate JWT Token
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret';
    const token = jwt.sign({ username: user.username, id: user.id }, secretKey, { expiresIn: '365d' });

    return res.json({ message: "Login successful", token, user: { id: user.id, username: user.username } });

  } catch (error: any) {
    console.log("🚨 Step 6: Error during login:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Register the login route
router.post('/login', loginHandler);

export default router;
