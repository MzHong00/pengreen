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
    console.log("Pick 개수 Fetch");
    try {
        const eachChoiceCount = await axios.put(`${process.env.REACT_APP_API_ROOT}/api/vote/read-choice-count`, {
            vote_id: vote_id,
            choiceList: choiceList
        })

        return eachChoiceCount.data;
    } catch (error) {
        console.log("Pick 개수 가져오기 에러");
    }
}

export const readMyPick = async ({
    user_id, vote_id
}: VoteChoice) => {
    try {
        const isParticipant = await axios.put(`${process.env.REACT_APP_API_ROOT}/api/vote/read-mypick`, {
            user_id: user_id,
            vote_id: vote_id,
        })

        return isParticipant.data;
    } catch (error) {
        console.log("참여자 수 가져오기 에러");
    }
}

export const updateChoice = async ({
    user_id, vote_id, selected
}: VotePickDto) => {
    console.log("Pick Update Fetch");
    try {
        const fetchPick = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/update-choice`, {
            user_id: user_id,
            vote_id: vote_id,
            selected: selected
        })

        return fetchPick.data
    } catch (error) {
        console.log("Pick Update 에러");
    }
}