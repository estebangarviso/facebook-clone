import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './../utils/errors.js';
import { ACCESS_TOKEN_SECRET } from './../config/index.js';

export default function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  //Decoding the token
  try {
    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.headers.user = decodedToken.user;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
}
