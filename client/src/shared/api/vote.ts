import axios from 'axios';
import { type VoteDto } from 'widgets/vote';

export const createVote = async (vote: VoteDto): Promise<void> => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/create`, vote);
    } catch (error) {
        console.log("투표 생성 에러");
    }
}

export const readVoteParticipants = async (vote_id: string): Promise<string | undefined> => {
    try {
        const vote_data = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/read-participant`, {
            vote_id: vote_id
        });

        return vote_data.data.participantCount;
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

export const readVoteListByOwnerId = async (own_id: string): Promise<VoteDto[] | undefined> => {
    try {
        if (!own_id) return;

        const vote_data = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/read-owner`, {
            own_id: own_id
        });

        return vote_data.data;
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

export const readVoteListSortedLikes = async (): Promise<VoteDto[] | undefined> => {
    try {
        const votes = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/vote/read-sorted-like`);
        
        return votes.data;
    } catch (error) {
        console.log("좋아요 순서로 투표 가져오기 에러");
    }
}

export const readVoteListSortedParticipants = async (): Promise<VoteDto[] | undefined> => {
    try {
        const votes = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/vote/read-sorted-participant`);

        return votes.data;
    } catch (error) {
        console.log("참여자 순서로 투표 가져오기 에러");
    }
}