import { type Request, Response } from "express"

import { mongodbFind, mongodbFindOne } from '../data-access/mongodb/find';
import { mongodbInsert, mongodbRemove } from "../data-access/mongodb";
import { Liker } from "../models/liker";
import { duplicateChecker } from "../utils/duplicateChecker";

//좋아요 버튼 Count DB에 반영
export const updateLikeInfo = async (req: Request, res: Response) => {
    try {
        const { user_id, vote_id } = req.body;

        // 사용자가 좋아요를 누른 사람인지 확인
        const likerQuery = {
            user_id: user_id,
            vote_id: vote_id
        }
        const isLiker: boolean = await duplicateChecker('vote_likers', likerQuery)

        isLiker ? await mongodbRemove('vote_likers', likerQuery) : await mongodbInsert<Liker>('vote_likers', likerQuery)

        res.send();
    } catch (error) {
        throw error
    }
}

export const readLikeInfo = async (req: Request, res: Response) => {
    try {
        const { user_id, vote_id } = req.body;

        // 사용자가 좋아요를 누른 사람인지 확인
        const likerCheckQuery = {
            user_id: user_id,
            vote_id: vote_id
        }
        const isLiker: boolean = await duplicateChecker('vote_likers', likerCheckQuery)

        // 좋아요의 개수
        const likes = await mongodbFind('vote_likers', {
            vote_id: vote_id
        })
        const likesCount = likes.length;

        res.send({
            likesCount: likesCount,
            isLiker: isLiker
        });
    } catch (error) {
        console.log("좋아요 정보 읽기 오류");
        throw error
    }
}