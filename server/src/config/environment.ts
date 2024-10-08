import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
const DB_NAME = process.env.DB_NAME || "criminal";

export const DB_URL =
  process.env.DB_URL ||
  `postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}`;
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const PUBLIC_CLIENT_URL = process.env.PUBLIC_CLIENT_URL;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_AUTH = process.env.REDIS_AUTH;
export const SALT_ROUNDS = process.env.SALT_ROUNDS;