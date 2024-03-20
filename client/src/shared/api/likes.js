import axios from 'axios';

export const fetchLikeUpdate = async ({ user_id, vote_id }) => {
    try {
        const fetchLike = await axios.put('http://localhost:5001/api/vote/like-update', {
            user_id: user_id,
            vote_id: vote_id
        })

        const { likesCount, isLiker } = fetchLike.data;

        return { likesCount, isLiker };
    } catch (error) {
        console.log("좋아요 처리 에러");
    }
}

export const fetchLikesRead = async ({ user_id, vote_id }) => {
    try {
        const fetchLike = await axios.post('http://localhost:5001/api/vote/like', {
            user_id: user_id,
            vote_id: vote_id
        })

        const { likesCount, isLiker } = fetchLike.data;
        
        return { likesCount, isLiker };
    } catch (error) {
        console.log("좋아요 여부 처리 에러");
    }
}