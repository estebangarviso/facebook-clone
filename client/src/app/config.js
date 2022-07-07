export const AppConfig = {
  BACKEND_URL: 'http://localhost:3001',
  TOKEN_EXPIRATION_WARN_TIME_MILISECONDS: 180000 // Watch out for this value, it's used in the frontend to warn the user about the token expiration need to be lower than server the token expiration time
};