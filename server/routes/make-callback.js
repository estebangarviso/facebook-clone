import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// make express callback function
function makeExpressCallback(controller) {
  return function (req, res) {
    const token = req.cookies.token || req.headers.token;
    //Authorization: 'Bearer TOKEN'
    if (!token) {
      return res.status(401).json({ success: false, message: 'Error! Token was not provided.' });
    }

    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const result = controller(req, res);
      return result;
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: 'Error! Invalid token.' });
    }
  };
}

export default makeExpressCallback;
