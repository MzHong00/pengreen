import { Request, Response } from "express"

import { mongodbFind, mongodbInsert } from "../data-access/mongodb";
import { mongodbAggregate } from "../data-access/mongodb/aggregate";
import { type SortType, type Vote } from "../models/vote";
import { toVoteFormat } from "../utils/formatUtils";
import { ObjectId } from "mongodb";

export const createVote = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        
        const vote: Vote = toVoteFormat(data);
        mongodbInsert<Vote>('vote', vote);
    } catch (error) {
        throw error;
    }
}

export const readVoteList = async (req: Request, res: Response): Promise<void> => {
    const { sort } = req.query 
    
    try {
        const sortType: SortType[] = ['like', 'participant']
        const verifyType = sortType.includes(sort as any);

        //req.query에 like, participant를 제외하 나머지 값을 넣으면 pipeline에서 오류가 나기 때문에 검증 및 기본값 설정
        const verifiedSort = verifyType ? sort : 'participant'
        
        const pipeline = [
            {
                $addFields: {
                    arraySize: { $size: `$${verifiedSort}` },
                }
            },
            {
                $sort: { arraySize: -1 } // arraySize 필드를 기준으로 내림차순 정렬
            }
        ];
        const votes = await mongodbAggregate('vote', pipeline);
        
        res.send(votes)
    } catch (error) {
        throw error;
    }
}

export const readVoteById = async (req: Request, res: Response): Promise<void> => {
    const { voteId } = req.body
    
    try {
        const votes = await mongodbFind('vote', {
            _id: ObjectId.createFromHexString(voteId)
        });
        
        res.send(votes)
    } catch (error) {
        throw error;
    }
}

export const readVoteParticipants = async (req: Request, res: Response): Promise<void> => {
    const collection = "vote_participants";
    try {
        const { vote_id } = req.body;

        //투표 참여자 수
        const choiceListQuery = {
            vote_id: vote_id
        }
        const participant = await mongodbFind(collection, choiceListQuery);
        const participantCount: number = participant.length;

        res.send({
            participantCount: participantCount,
        });
    } catch (error) {
        throw error
    }
}

export const readVoteByOwnerId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { own_id } = req.body;
        
        const query = {
            "owner._id": own_id
        }
        const votes = await mongodbFind('vote', query);

        res.send(votes)
    } catch (error) {
        throw error
    }
}