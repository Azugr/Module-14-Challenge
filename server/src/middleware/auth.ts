import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded as JwtPayload;
    next();
  });
};