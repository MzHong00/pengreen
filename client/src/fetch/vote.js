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

export const fetchLikes = async (user_id, vote_id) => {
    try {
        const fetch_like = await axios.put('http://localhost:5001/api/vote/update-like', {
            user_id: user_id,
            vote_id: vote_id
        })
        console.log(fetch_like);
        return {
            checked: fetch_like.data.checked,
            like_count: fetch_like.data.like_count
        }
    } catch (error) {
        console.log("좋아요 처리 에러");
    }
}

export const fetchLikes_checked = async (user_id, vote_id) => {
    try {
        const fetch_like_checked = await axios.post('http://localhost:5001/api/vote/already-like', {
            user_id: user_id,
            vote_id: vote_id
        })

        return fetch_like_checked.data;
    } catch (error) {
        console.log("좋아요 처리 에러");
    }
}