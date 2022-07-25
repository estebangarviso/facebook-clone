import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { encryptedString } from '../utils/crypto.js';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN } from '../config/index.js';

const router = express.Router();

router.post('/user/login', async (req, res) => {
  const body = req.body;
  console.log({ body });
  try {
    const entity = new User();
    const encryptedPassword = encryptedString(body.password);
    const user = await entity.getOne({ email: body.email, password: encryptedPassword });
    if (user) {
      console.log('User is authenticated', user);
      const token = jwt.sign(
        {
          user: {
            userId: user.userId,
            name: user.name
          }
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
      );
      return res.status(200).json({
        success: true,
        token,
        userId: user.userId
      });
    }

    return res.status(400).json({
      message: 'Invalid email or password'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

router.post('/user/refresh', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log('refresh-token:decoded', decoded);
    const userId = decoded.user.userId;
    const user = new User();
    const userData = user.read(userId);
    if (!userData) {
      return res.status(401).json({
        message: 'User not found from token'
      });
    }
    const _token = jwt.sign(
      {
        user: {
          userId: userData.userId,
          name: userData.name
        }
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN
      }
    );
    return res.status(200).json({
      success: true,
      token: _token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message
    });
  }
});

router.post('/user/register', (req, res) => {
  const body = req.body;
  const files = req.files;
  console.log({ body, files });
  try {
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    let avatar = files?.avatar;
    if (avatar) {
      const fileName = `${Date.now()}-${avatar.name}`;
      avatar.mv('./public/uploads/avatars/' + fileName);
      body.avatar = '/uploads/avatars/' + fileName;
    } else {
      body.avatar = null;
    }
    console.log('user-register:body', body);
    const user = new User();
    user.avatar = body.avatar;
    user.name = body.name;
    user.email = body.email;
    user.password = encryptedString(body.password);
    user.save();
    return res.status(200).json({
      success: true,
      message: `User ${body.email} created`
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
});

router.post('/user/logout', (req, res) => {
  // remove token from cookies if it exists and from jwt
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({
        success: true,
        message: 'No token provided or token expired so just logged out from the app'
      });
    }
    // clean cookie token from browser
    res.clearCookie('token');
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message
    });
  }
  return res.status(200).json({
    message: 'Logout successful'
  });
});

export default router;

// ref: jwt-redis https://www.npmjs.com/package/jwt-redis
// in order to remove the token from the server you need to use jwt-redis
// import jwtRedis from 'jwt-redis';
// const tokens = [];
// ... // save the token to the server
// await jwtRedis.sign({
//   user: {
//     userId: userData.userId,
//     name: userData.name
//   }
// },
// ACCESS_TOKEN_SECRET,
// {
//   expiresIn: ACCESS_TOKEN_EXPIRES_IN
// });
// ... // verify the token on the server
// const decoded = await jwtRedis.verify(_token, ACCESS_TOKEN_SECRET);
// ... // remove token from server
// await jwtRedis.destroy({user:decoded.user}, ACCESS_TOKEN_SECRET);