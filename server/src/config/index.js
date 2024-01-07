import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mysql_connection: {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'my_db',
        connectionLimit: 10
    }
}