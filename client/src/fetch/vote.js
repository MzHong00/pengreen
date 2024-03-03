import axios from 'axios';

export const createVote = async (vote) => {
    try {
        await axios.post('http://localhost:5001/api/vote/create', vote);
    } catch (error) {
        console.log("투표 생성 에러");
    }
}

export const getMyVote = async (user_id) => {
    try {
        if (!user_id)
            return;

        const vote_data = await axios.post('http://localhost:5001/api/vote/read-mine', {
            own_id: user_id
        });

        return vote_data.data;
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

export const getVote_sortByLikes = async () => {
    try {
        const votes = await axios.get('http://localhost:5001/api/vote/read-like');
        
        return votes.data;
    } catch (error) {
        console.log("좋아요 순서로 투표 가져오기 에러");
    }
}

export const getVote_sortByParticipant = async () => {
    try {
        const votes = await axios.get('http://localhost:5001/api/vote/read-participant');
        
        return votes.data;
    } catch (error) {
        console.log("좋아요 순서로 투표 가져오기 에러");
    }
}

export const getVoteOwner = async (vote_id) => {
    try {
        const owner = await axios.post('http://localhost:5001/api/vote/read-owner', {
            vote_id: vote_id
        })

        return owner.data[0];
    } catch (error) {
        console.log("투표 소유자 정보 가져오기 에러");
    }
}