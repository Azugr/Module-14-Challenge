import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

// Define the JwtPayload interface
interface JwtPayload {
  username: string;
}

// Middleware to authenticate the token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the authorization header
  const token = req.headers['authorization']?.split(' ')[1] as string;

  // Decode the token
  const jwtToken = jwt.decode(token);
  if (jwtToken) {
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || ''; 

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      // Attach the decoded token to the request object
      req.user = decoded as JwtPayload;
      return next();
    });
  } else {
    return res.sendStatus(401); // Unauthorized
  }
};