import jwt from "jsonwebtoken";

import mysql from '../data-access/mysql.js';

const auth = async (req, res) => {
    try {
        const user = req.body;
        const isAcoount = await verify(user.email);
        if (!isAcoount) {
            signup(user)
        }

        const token = signin(user);
        res.status(200).send(token);
    } catch (error) {
        console.log("로그인 에러")
    }
}

//boolean, 사용자 DB에 사용자가 존재하는지 여부
const verify = async (email) => {
    try {
        const query = "select * from account";
        const data = await mysql(query);
        const isAcoount = data.some(idx => idx.email)

        return isAcoount
    } catch (error) {
        console.log("verify error: ", error);
    }
}

//로그인하여 token을 발급
const signin = (user) => {
    try {
        const accessToken = jwt.sign({
            email: user.email,
            name: user.name
        }, process.env.ACCESS_SECRET_KEY, {
            expiresIn: '10m',
            issuer: 'access issuer'
        })

        const refreshToken = jwt.sign({
            email: user.email,
            name: user.email
        }, process.env.REFRESH_SECRET_KEY, {
            expiresIn: '24h',
            issuer: 'refresh issuer'
        })

        return {
            accessToken, refreshToken
        }
    } catch (error) {
        console.error("로그인 오류: ", error);
    }
}

//회원가입하여 사용자 DB에 추가
const signup = (user) => {
    console.log("회원가입:", user);
    try {
        const query = `insert into Account(id, email, name, picture) values (${user.id}, "${user.email}", "${user.name}", "${user.picture}")`;
        mysql(query);
    } catch (error) {
        console.log("회원가입 오류")
    }
}

const accessToken = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = jwt.verify(token, ACCESS_SECRET_KEY);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};

const refreshToken = (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, REFRESH_SECRET_KEY);

        const accessToken = jwt.sign({
            email: user.email,
            name: user.name
        }, ACCESS_SECRET_KEY, {
            expiresIn: '1m',
            issuer: 'access issuer'
        })

        res.cookie("accessToken", accessToken, {
            secure: false,
            httpOnly: true,
        })

        res.status(200).json("Access Token Recreated");
    } catch {
        res.status(500).json(error);
    }
}

const logout = (req, res) => {

    try {
        res.clearCookie('accessToken');

        res.status(200).json("Logout Success");
    } catch (error) {
        res.status(500).json(error);
    }
}

// export { signin, accessToken, refreshToken, logout }
export { auth, verify, signin, signup }