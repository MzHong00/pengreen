import axios from 'axios';
import { type VoteDto } from 'widgets/voteCard';

export const createVote = async (vote: VoteDto): Promise<void> => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/create`, vote);
    } catch (error) {
        console.log("투표 생성 에러");
    }
}

export const fetchSortedVoteList = async (queryString: string): Promise<VoteDto[] | undefined> => {
    try {
        const votes = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/vote/read?${queryString}`);
        
        return votes.data;
    } catch (error) {
        console.log("투표 리스트 가져오기 에러");
    }
}

export const fetchVoteById= async (voteId: string): Promise<VoteDto | undefined> => {
    try {
        const votes = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/read-id`, {
            voteId: voteId
        });
        
        console.log("투표 Fetch");
        
        return votes.data[0];
    } catch (error) {
        console.log("투표 가져오기 에러");
    }
}

export const readVoteParticipants = async (vote_id: string): Promise<string | undefined> => {
    try {
        const vote_data = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/read-participant`, {
            vote_id: vote_id
        });
        console.log("참여자 Fetch");
        
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