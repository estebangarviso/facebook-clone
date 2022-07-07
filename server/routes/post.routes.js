import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import Formatter from '../utils/formatter.js';

dotenv.config();

const router = express.Router();

router.get('/post', (req, res) => {
  const token = req.cookies.token || req.headers.token;
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    return res.status(401).json({ success: false, message: 'Error! Token was not provided.' });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const postEntity = new Post();
    const userEntity = new User();
    const posts = postEntity.readAll();
    const users = userEntity.readAll();

    const postsWithUser = posts.map((post) => {
      const user = users.find((user) => user.userId === post.userId);
      // Format createdAt to be more readable
      post.createdAt = Formatter.getTimeSince(post.createdAt);
      return {
        ...post,
        user: {
          name: user.name,
          avatar: user.avatar
        }
      };
    });
    return res.status(200).json(postsWithUser);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Error! Invalid token.' });
  }
});

router.post('/post', (req, res) => {
  const body = req.body;
  const token = req.cookies.token || req.headers.token;

  console.log({ body, token });
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    return res.status(401).json({ success: false, message: 'Error! Token was not provided.' });
  }

  if (!token) {
    return res.status(403).json({
      error: 'Error! Token was not provided'
    });
  } else if (token) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({
        error: 'Error! Inavlid token'
      });
    }
    try {
      const post = new Post();
      post.create(body);
      return res.status(200).json({
        message: `Post created by user with email ${decoded.email}`
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  return res.status(500).json({
    message: 'Error! Something went wrong.'
  });
});

export default router;
