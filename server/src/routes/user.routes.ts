import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '@models/user.model';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN } from '@config/index';
import { UploadedFile } from 'express-fileupload';

dotenv.config({ path: './../.env' });

const router = express.Router();

router.post('/user/login', async (req, res) => {
  const body = req.body;
  console.log({ body });
  try {
    const entity = new User();
    const users = await entity.getCollection();
    const user = users.find((item: any) => item.email === body.email);
    if (user && user.password === body.password) {
      const token = jwt.sign(
        {
          user: {
            userId: user.userId,
            name: user.name,
            email: user.email
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
    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log('refresh-token:decoded', decoded);
    const userId = decoded.user.userId;
    const user = new User();
    const userData = user.getDocumentById(userId);
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
  } catch (error: any) {
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
    let avatar = files?.avatar as UploadedFile;
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
    user.password = body.password;
    user.save();
    return res.status(200).json({
      success: true,
      message: `User ${body.email} created`
    });
  } catch (error: any) {
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
  } catch (error: any) {
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
