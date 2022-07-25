import './utils/colors.js';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import PostRoute from './routes/post.routes.js';
import UserRoute from './routes/user.routes.js';
import { FRONTEND_ORIGIN, PORT } from './config/index.js';

dotenv.config();
const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: FRONTEND_ORIGIN || 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json());
app.use('/', express.static('public'));

// Routes
app.use(PostRoute);
app.use(UserRoute);
app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

app.listen(PORT || 3000, (event) => {
  console.log(`Server is running on port ${PORT || 3000}`.info);
});
