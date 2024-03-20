import axios from 'axios';

export const createVote = async (vote: any) => {
    try {
        await axios.post('http://localhost:5001/api/vote/create', vote);
    } catch (error) {
        console.log("투표 생성 에러");
    }
}

export const readVoteByOwnerId = async (user_id: any) => {
    try {
        if (!user_id)
            return;
        
        const vote_data = await axios.post('http://localhost:5001/api/vote/read-owner', {
            own_id: user_id
        });

        return vote_data.data;
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

export const readVoteSortedLikes = async () => {
    try {
        const votes = await axios.get('http://localhost:5001/api/vote/read-like');

        return votes.data;
    } catch (error) {
        console.log("좋아요 순서로 투표 가져오기 에러");
    }
}

export const readVoteSortedParticipants = async () => {
    try {
        const votes = await axios.get('http://localhost:5001/api/vote/read-participant');

        return votes.data;
    } catch (error) {
        console.log("참여자 순서로 투표 가져오기 에러");
    }
}



export const getVoteById = async (vote_id: any) => {
    try {
        const vote = await axios.post('http://localhost:5001/api/vote/read-id', {
            vote_id: vote_id
        });

        return vote.data[0];
    } catch (error) {
        console.log("id로 투표 가져오기 에러");
    }
}


export const getOwnerOfVote = async (vote_id: any) => {
    try {
        const owner = await axios.post('http://localhost:5001/api/vote/read-owner', {
            vote_id: vote_id
        })

        return owner.data[0];
    } catch (error) {
        console.log("투표 소유자 정보 가져오기 에러");
    }
}