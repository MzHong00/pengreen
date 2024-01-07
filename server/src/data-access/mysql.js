import mysql from 'mysql';
import config from "../config/index.js"

const pool = mysql.createPool(config.mysql_connection);

export default (callback) => {
    pool.getConnection((error, connection) => {
        if (error) throw error;
        callback(connection)
    })
}