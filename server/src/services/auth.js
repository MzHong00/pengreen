import jwt from "jsonwebtoken";

import mysql from '../data-access/mysql.js';

const ACCESS_TOKEN_EXPIRES = "1h"

const auth = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader) {
            // "Bearer <token>" 형식으로 전송된 토큰에서 "Bearer " 부분을 제거하여 토큰을 추출합니다.
            const accessToken = authorizationHeader.split(' ')[1];

            const data = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);

            res.status(200).send(data);
        } else {
            res.status(401).send('Access token is missing');
        }
    } catch (error) {
        console.log("access Token 만료: ", error.expiredAt);
        res.send('expired');
    }
}

const signin = async (req, res) => {
    try {
        const user = req.body;
        const isAcoount = await verify(user.data.email);
        if (!isAcoount) {
            signup(user.data)
        }
        const token = issueToken(user.data);

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
        const isAcoount = data.some(idx => idx.email === email)

        return isAcoount
    } catch (error) {
        console.log("verify error: ", error);
    }
}

//로그인하여 token을 발급
const issueToken = (user) => {
    try {
        const accessToken = jwt.sign({
            email: user.email,
            name: user.name
        }, process.env.ACCESS_SECRET_KEY, {
            expiresIn: ACCESS_TOKEN_EXPIRES,
            issuer: 'access issuer'
        })

        const refreshToken = jwt.sign({
            email: user.email,
            name: user.name
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

const reissue_token = (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader) {
            // "Bearer <token>" 형식으로 전송된 토큰에서 "Bearer " 부분을 제거하여 토큰을 추출합니다.
            const refreshToken = authorizationHeader.split(' ')[1];
            const data = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

            if (data) {
                const accessToken = jwt.sign({
                    email: data.email,
                    name: data.name
                }, process.env.ACCESS_SECRET_KEY, {
                    expiresIn: ACCESS_TOKEN_EXPIRES,
                    issuer: 'access issuer'
                })

                res.status(200).send(accessToken);
            }
        } else {
            res.status(401).send('Access token is missing');
        }
    } catch (error) {
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

export { signin, auth, reissue_token }