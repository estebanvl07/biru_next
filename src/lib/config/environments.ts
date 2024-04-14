export const PORT = process.env.PORT || 8080;
export const POSTGRES_URI = process.env.POSTGRES_URI || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const FRONT_URL = process.env.FRONT_URL || "";
export const NODEMAILER_KEY = process.env.NODEMAILER_KEY || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const REDIS_URI = process.env.REDIS_URI || "";
export const CALLBACK_URL = process.env.CALLBACK_URL || "/auth";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const SESSION_SECRET = process.env.SESSION_SECRET || "your-secret-key";
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || "localhost";

export const IS_PROD = NODE_ENV === "production";
