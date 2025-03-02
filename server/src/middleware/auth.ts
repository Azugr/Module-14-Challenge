import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['authorization']?.split(' ')[1] as string;
  const jwtToken = jwt.decode(token);
  if (jwtToken) {
    const secretKey = process.env.JWT_SECRET_KEY || ''; 
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded as JwtPayload;
      return next();
    })
  }
};