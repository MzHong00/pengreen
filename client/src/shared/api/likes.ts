import axios from 'axios';

interface Props {
    user_id: string;
    vote_id: string
}

export const fetchLikeUpdate = async ({
    user_id, vote_id
}: Props) => {
    try {
        const fetchLike = await axios.put(`https://${process.env.REACT_APP_API_ROOT}/api/vote/update-like`, {
            user_id: user_id,
            vote_id: vote_id
        })

        const { likesCount, isLiker } = fetchLike.data;

        console.log("좋아요 업데이트 Fetch");

        return { likesCount, isLiker };
    } catch (error) {
        console.log("좋아요 처리 에러");
    }
}

export const fetchLikesRead = async ({
    user_id, vote_id
}: Props) => {
    try {
        const fetchLike = await axios.post(`https://${process.env.REACT_APP_API_ROOT}/api/vote/read-like`, {
            user_id: user_id,
            vote_id: vote_id
        })

        const { likesCount, isLiker } = fetchLike.data;

        console.log("좋아요 읽기 Fetch");
        
        return { likesCount, isLiker };
    } catch (error) {
        console.log("좋아요 여부 처리 에러");
    }
}