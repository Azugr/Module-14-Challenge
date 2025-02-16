import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!; // 🔥 Ensures we always use the environment variable

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after "Bearer "

    if (!token) {
        console.log('❌ No token provided.');
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    // **Verify the JWT token**
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('❌ Token verification failed:', err.message);
            res.status(403).json({ message: 'Invalid or expired token' });
            return;
        }

        // **Attach user data to the request object**
        (req as any).user = decoded;
        console.log('✅ Token verified successfully:', decoded);

        next(); // Proceed to the next middleware
    });
};

export default authenticateToken;

