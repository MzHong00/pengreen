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
        if(!user_id)
            return;

        const vote_data = await axios.post('http://localhost:5001/api/vote/read-mine', {
            own_id: user_id
        });

        return vote_data.data;
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}