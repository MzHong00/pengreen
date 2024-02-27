import axios from 'axios';

export const fetchChoice = async (user_id, vote_id, pick) => {
    try {
        const updatedChoice = await axios.put('http://localhost:5001/api/vote/update-choice', {
            user_id: user_id,
            vote_id: vote_id,
            pick: pick
        })

        return updatedChoice.data;
    } catch (error) {
        console.log("투표 선택 에러");
    }
}

export const fetchChoice_checked = async (user_id, vote_id) => {
    try {
        const fetchChoice_checked = await axios.post('http://localhost:5001/api/vote/already-choice', {
            user_id: user_id,
            vote_id: vote_id
        })

        return fetchChoice_checked.data;
    } catch (error) {
        console.log("투표 선택 여부 에러");
    }
}

export const getChoiceOfVote = async (vote_id) => {
    try {
        const fetchChoice = await axios.post('http://localhost:5001/api/vote/read-choice', {
            vote_id: vote_id
        })

        return fetchChoice.data;
    } catch (error) {
        console.log("투표의 항목들 가져오기 에러");
    }
}