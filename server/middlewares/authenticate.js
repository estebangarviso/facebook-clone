import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './../utils/errors.js';
dotenv.config({ path: './../.env' });
export default function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  //Decoding the token
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.headers.user = decodedToken.user;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
}
