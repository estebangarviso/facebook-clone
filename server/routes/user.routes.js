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
  const token = req.cookies.token || req.headers.token;
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
      data: {
        token: _token
      }
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
  console.log(body);
  try {
    const user = new User();
    user.create(body);
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let avatar = req.files.avatar;

    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    avatar.mv('./uploads/avatars' + avatar.name);

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
  return res.status(200).json({
    message: 'logout'
  });
});

// !TODO
router.post('/user/upload', async (req, res) => {
  const token = req.cookies.token || req.headers.token;
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
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
