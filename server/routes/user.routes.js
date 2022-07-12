import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

const router = express.Router();

router.post('/user/login', (req, res) => {
  const body = req.body;
  console.log(body);
  const entity = new User();
  const users = entity.readAll();
  const user = users.find((item) => item.email === body.email);
  if (user && user.password === body.password) {
    try {
      const token = jwt.sign(
        {
          user: {
            userId: user.userId,
            name: user.name
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
      );
      return res.status(200).json({
        success: true,
        token,
        userId: user.userId
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message
      });
    }
  }

  return res.status(400).json({
    message: 'invalid request'
  });
});

router.post('/user/refresh', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
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
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
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
  console.log(body);
  try {
    const user = new User();
    user.create(body);
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let avatar = files?.avatar;
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    if (avatar) avatar.mv('./uploads/avatars' + avatar.name);

    return res.status(200).json({
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
    // process.env.ACCESS_TOKEN_SECRET,
    // {
    //   expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
    // });
    // ... // verify the token on the server
    // const decoded = await jwtRedis.verify(_token, process.env.ACCESS_TOKEN_SECRET);
    // ... // remove token from server
    // await jwtRedis.destroy({user:decoded.user}, process.env.ACCESS_TOKEN_SECRET);
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

// !TODO
router.post('/user/upload', async (req, res) => {
  const token = req.cookies.token;
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    return res.status(401).json({ success: false, message: 'Error! Token was not provided.' });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv('./uploads/' + avatar.name);

      //send res
      res.send({
        status: true,
        message: 'File is uploaded',
        name: avatar.name,
        mimetype: avatar.mimetype,
        size: avatar.size
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
