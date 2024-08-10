import mysql from 'mysql'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'my_db',
    connectionLimit: 10
});


export default (query) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) throw reject(error);
            
            connection.query(query, function (error, results, fields) {
                if (error) throw console.log(error);

                resolve(results);
            })
            connection.release();
        })
    })
}