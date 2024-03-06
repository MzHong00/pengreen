import axios from 'axios';

export const fetchLikes_update = async (user_id, vote_id) => {
    try {
        const fetch_like = await axios.put('http://localhost:5001/api/vote/update-like', {
            user_id: user_id,
            vote_id: vote_id
        })

        return fetch_like.data.likes;
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
        console.log("좋아요 여부 처리 에러");
    }
}