import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';

const router = Router();

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log("🟢 Step 1: Login request received:", username);

    // 🔹 Find the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log("❌ Step 2: User not found:", username);
      return res.status(401).json({ message: "Authentication failed" });
    }

    console.log("✅ Step 3: User found:", user.username);

    // 🔹 Debugging: Log password comparison
    console.log("🔍 Database password:", user.password);
    console.log("🔍 Entered password:", password);

    // 🔹 Compare passwords (Plain Text)
    if (user.password !== password) {
      console.log("❌ Step 4: Password does not match");
      return res.status(401).json({ message: "Authentication failed" });
    }

    console.log("✅ Step 5: Login successful");
    return res.json({ message: "Login successful", user });
  } catch (error: any) {
    console.error("🚨 Step 6: Error during login:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

router.post('/login', loginHandler);

export default router;