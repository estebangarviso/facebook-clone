import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '@utils/index';
import { ACCESS_TOKEN_SECRET } from '@config/index';
import { RequestWithUser } from '@@types/index';

export default function (req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  //Decoding the token
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload & { user: DecodedUser };
    req.headers.user = decoded.user;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
}
