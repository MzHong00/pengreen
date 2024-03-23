import axios from 'axios';
import { Vote } from 'shared/model/vote';

export const createVote = async (vote: Vote): Promise<void> => {
    try {
        await axios.post('http://localhost:5001/api/vote/create', vote);
    } catch (error) {
        console.log("투표 생성 에러");
    }
}

export const readVoteByOwnerId = async (own_id: any): Promise<Vote[] | undefined> => {
    try {
        if (!own_id)
            return;

        console.log("소유자 ID로 투표 가져오기");

        const vote_data = await axios.post('http://localhost:5001/api/vote/read-owner', {
            own_id: own_id
        });

        return vote_data.data;
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

export const readVoteSortedLikes = async (): Promise<Vote[] | undefined> => {
    try {
        const votes = await axios.get('http://localhost:5001/api/vote/read-like');

        return votes.data;
    } catch (error) {
        console.log("좋아요 순서로 투표 가져오기 에러");
    }
}

export const readVoteSortedParticipants = async (): Promise<Vote[] | undefined> => {
    try {
        const votes = await axios.get('http://localhost:5001/api/vote/read-participant');

        return votes.data;
    } catch (error) {
        console.log("참여자 순서로 투표 가져오기 에러");
    }
}