import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

import keys from '../config/oauth2.keys.json' assert { type: "json" };
import { verify, signin, signup } from './auth.js';


const oAuth2Client = new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
);

const google_signin = (req, res) => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    });

    res.status(200).send(authorizeUrl);
}

const google_redirect = async (req, res) => {
    try {
        const code = req.body.code;
        const r = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(r.tokens);

        const googleApi = 'https://www.googleapis.com/oauth2/v2/userinfo';
        
        const redirect = await axios.get(googleApi, {
            headers: {
                Authorization: `Bearer ${oAuth2Client.credentials.access_token}`,
            }
        })

        //const user = redirect.data

        /* 
            구글 계정 정보 받은 상태
            01. Account DB에서 email이 있는지 확인
            02. 이미 같은 email이 존재한다면 로그인
            03. email이 존재하지 않는다면 Account DB에 넣어 회원가입
            04. jwt token 발행 req.send({accessToken, refreshToken})
            ---여기까지 서버---
            05. 받은 토큰을 client측에서 cookie 삽입
            06. 토큰을 통해 access token 인증하여 계정 세션 유지
        */

        // const isAcoount = await verify(user.email);
        // if(!isAcoount) {
        //     signup(user)
        // }

        // const token = signin(user);

        //res.header('Authorization', `Bearer ${token}`);
        res.status(200).send(redirect.data);
    } catch (error) {
        console.log(error)
    }
}

const google_signout = (req, res) => {
    try {
        oAuth2Client.revokeCredentials((err, body) => {
            console.log(err, body)
        });
    } catch (error) {
        console.log("로그아웃 에러")
    }
}

export { google_signin, google_signout, google_redirect }