import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,

  mongodbPassword: process.env.MONGODB_ADMIN_PASSWORD,

  jwtAccessKey: process.env.JWT_ACCESS_KEY,
  jwtRefreshKey: process.env.JWT_REFRESH_KEY,
  jwtExpiredMinute: process.env.JWT_EXPIRED_MINUTE,
};
