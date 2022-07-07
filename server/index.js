import './utils/colors.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import PostRoute from './routes/post.routes.js';
import UserRoute from './routes/user.routes.js';
// import Formatter from './core/Formatter.js';
// import User from './classes/User.js';
// import Post from './classes/Post.js';

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(PostRoute);
app.use(UserRoute);

app.listen(process.env.PORT || 3000, (event) => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`.info);
});
