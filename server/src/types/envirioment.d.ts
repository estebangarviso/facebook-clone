export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      PORT: string;
      FRONTEND_ORIGIN: string;
      DB_URL: string;
      DB_NAME: string;
      USE_DB: 'true' | 'false';
    }
  }
}
