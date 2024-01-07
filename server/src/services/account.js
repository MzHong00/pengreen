import bcrypt from "bcrypt";

import pool from '../data-access/mysql.js'

const register = async (req, res) => {
    try {
        const { password, ...info } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        pool((mysql) => {
            const query = `insert into user(email, password, name) values ("${info.email}", "${hashedPassword}", "${info.name}")`
            mysql.query(query, function (error, results, fields) {
                if (error) throw error;
            })

            mysql.release();
        })

        res.status(200).json({ info, message: "create account successful" })
    } catch (error) {
        throw new Error(`Error registering user: ${error}`);
    }
}

const signin = (req, res) => {

}

export { register }