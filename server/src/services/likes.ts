import { type Request, Response } from "express"

import { mongodbFind } from '../data-access/mongodb/find';
import { mongodbUpdate } from "../data-access/mongodb";
import { duplicateChecker } from "../utils/duplicateChecker";
import { ObjectId } from "mongodb";

//좋아요 버튼 Count DB에 반영
export const updateLikeInfo = async (req: Request, res: Response) => {
    const collection = 'vote';
    try {
        const { user_id, vote_id } = req.body;
        //_id는 ObjectId 타입이기 때문에 vote_id를 ObjectId로 바꾸고 비교해야 함
        const voteId = ObjectId.createFromHexString(vote_id)

        // 사용자가 좋아요를 누른 사람인지 확인
        const isLiker = await mongodbFind(collection, {
            _id: voteId,
            like: {
                $in: [user_id]
            }
        })
        
        isLiker.length !== 0 ?
            await mongodbUpdate(
                collection,
                { _id: voteId },
                { $pull: { like: user_id } }
            ) :
            await mongodbUpdate(
                collection,
                { _id: voteId },
                { $push: { like: user_id } }
            )

        res.send();
    } catch (error) {
        throw error
    }
}

export const readLikeInfo = async (req: Request, res: Response) => {
    const collection = 'vote';
    try {
        const { user_id, vote_id } = req.body;
        const voteId = ObjectId.createFromHexString(vote_id)

        // 사용자가 좋아요를 누른 사람인지 확인
        const isLiker: boolean = await duplicateChecker(collection, {
            _id: voteId,
            like: {
                $in: [user_id]
            }
        })
        
        // 좋아요의 개수
        const likes = await mongodbFind(collection, {
            vote_id: voteId,
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