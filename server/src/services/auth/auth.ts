import jwt from "jsonwebtoken";
import config from "../../config";

import { Request, Response } from "express";
import { User } from "../../models/user";
import { mongodbFindOne, mongodbInsert } from "../../data-access/mongodb";
import { toUserFormat } from "../../utils/formatUtils";

const ACCESS_TOKEN_EXPIRES: string = "10s"

export const tokenAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            return;
        }

        // "Bearer <token>" 형식으로 전송된 토큰에서 "Bearer " 부분을 제거하여 토큰을 추출합니다.
        const accessToken: string = authorizationHeader.split(' ')[1];
        const data = jwt.verify(accessToken, config.access_secret_key as string);
        
        const user = toUserFormat(data);
        
        res.status(200).send(user);
    } catch (error) {
        console.log("access Token 만료: ", (error as jwt.TokenExpiredError).expiredAt);
        res.send('expired');
    }
}

export const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const accountOfGoogle = req.body;
        const isGuest: boolean = await isUserExist(accountOfGoogle);
        
        if (isGuest) {
            await signup(accountOfGoogle);
        }

        const userFindQuery = {
            email: accountOfGoogle.email
        }
        const user = await mongodbFindOne('user', userFindQuery);
        
        const token = issueToken(user);

        res.status(200).send(token);
    } catch (error) {
        console.log("로그인 에러")
    }
}

//회원가입하여 사용자 DB에 추가
const signup = async (user: any) => {
    try {
        const data: User = toUserFormat(user);

        await mongodbInsert<User>('user', data)
    } catch (error) {
        console.log("회원가입 오류")
    }
}

//boolean, 사용자 DB에 사용자가 존재하는지 여부
const isUserExist = async (user: any): Promise<boolean> => {
    try {
        const query = {
            email: user.email
        };

        const data = await mongodbFindOne('user', query);
        const isGuest: boolean = data ? false : true;
        
        return isGuest;
    } catch (error) {
        throw error;
    }
}

//로그인하여 token을 발급
const issueToken = (user: any) => {
    try {
        const payload: User = toUserFormat(user);

        const accessToken = jwt.sign(payload, config.access_secret_key as string, {
            expiresIn: ACCESS_TOKEN_EXPIRES,
            issuer: 'access issuer'
        })

        const refreshToken = jwt.sign(payload, config.refresh_secret_key as string, {
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

export const reissueToken = (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (authorizationHeader) {
            // "Bearer <token>" 형식으로 전송된 토큰에서 "Bearer " 부분을 제거하여 토큰을 추출합니다.
            const refreshToken = authorizationHeader.split(' ')[1];
            const data: any = jwt.verify(refreshToken, config.refresh_secret_key as string);

            const payload: User = toUserFormat(data);

            if (data) {
                const accessToken = jwt.sign(payload, config.access_secret_key as string, {
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