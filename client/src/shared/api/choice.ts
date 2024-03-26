import axios from 'axios';
import { type VotePickDto } from 'features/vote/submitChoice';

interface VoteChoice {
    user_id?: string;
    vote_id: string;
    choiceList?: Array<string>
}


export const readEachChoiceCount = async ({
    vote_id, choiceList
}: VoteChoice) => {
    try {
        const eachChoiceCount = await axios.put('http://localhost:5001/api/vote/read-choice-count', {
            vote_id: vote_id,
            choiceList: choiceList
        })

        return eachChoiceCount.data;
    } catch (error) {
        console.log("투표 선택 에러");
    }
}

export const readIsParticipant = async ({
    user_id, vote_id
}: VoteChoice) => {
    try {
        const isParticipant = await axios.put('http://localhost:5001/api/vote/read-isParticipant', {
            user_id: user_id,
            vote_id: vote_id,
        })

        return isParticipant.data;
    } catch (error) {
        console.log("투표 선택 에러");
    }
}

export const updateChoice = async ({
    user_id, vote_id, selected
}: VotePickDto) => {
    try {
        const fetchPick = await axios.post('http://localhost:5001/api/vote/update-choice', {
            user_id: user_id,
            vote_id: vote_id,
            selected: selected
        })

        return fetchPick.data
    } catch (error) {
        console.log("투표 선택 여부 에러");
    }
}