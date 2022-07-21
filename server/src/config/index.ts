import * as dotenv from 'dotenv';
dotenv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;
export const PORT = process.env.PORT;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
export const DB_URL = process.env.DB_URL;
export const DB_NAME = process.env.DB_NAME;
export const USE_DB = process.env.USE_DB === 'true';

const CONFIG = {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  PORT,
  FRONTEND_ORIGIN,
  DB_URL,
  DB_NAME,
  USE_DB
};

export default CONFIG;
