import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: string | undefined;
    mongodb_password: string | undefined;
    access_secret_key: string | undefined;
    refresh_secret_key: string | undefined;
}

export const config: Config = {
    port: process.env.PORT,
    mongodb_password: process.env.MONGODB_ADMIN_PASSWORD,
    access_secret_key: process.env.ACCESS_SECRET_KEY,
    refresh_secret_key: process.env.REFRESH_SECRET_KEY
}