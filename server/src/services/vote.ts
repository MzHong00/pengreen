import { Request, Response } from "express"
import { mongodbFind, mongodbInsert } from "../data-access/mongodb";
import { Vote } from "../models/vote";
import { toVoteFormat } from "../utils/formatUtils";

export const createVote = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = req.body;
        console.log(data);
        
        const vote: Vote = toVoteFormat(data);

        mongodbInsert<Vote>('vote', vote);
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

        console.log(votes);
        
        res.send(votes)
    } catch (error) {
        throw error
    }
}

export const readVoteSortedLikes = async (req: Request, res: Response): Promise<void> => {
    try {
        const sort = {
            like: -1
        }

        const votes = await mongodbFind('vote', {}, sort);

        res.send(votes)
    } catch (error) {
        throw error
    }
}

export const readVoteSortedParticipants = async (req: Request, res: Response): Promise<void> => {
    try {
        const sort = {
            participant: -1
        }

        const votes = await mongodbFind('vote', {}, sort);

        res.send(votes)
    } catch (error) {
        throw error
    }
}

export const updateVote = () => {

}

export const deleteVote = () => {

}