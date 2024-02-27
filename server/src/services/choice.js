import mysql from '../data-access/mysql.js'

//해당 투표의 항목들 가져오기
export const getChoiceOfVote = async (req, res) => {
    try {
        const {vote_id} = req.body;
        const choiceOfVote_query = `select choice.id, content, count from choice join vote on choice.vote_id = vote.id where vote_id = '${vote_id}'`;
        const choiceOfVote = await mysql(choiceOfVote_query);

        res.send(choiceOfVote);
    } catch (error) {
        console.log(error);
    }
}

//사용자의 Pick DB에 반영
export const updateChoiceCount = async (req, res) => {
    try {
        const { user_id, vote_id, pick } = req.body;

        //특정 사용자가 특정 투표를 참여했는지 확인하는 쿼리
        const participant_query = `select id from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);

        let isParticipant = participate_vote.length !== 0;

        if (isParticipant) {
            const countDown_query = `update choice_count set count = count - 1 where user_id = '${user_id}' and vote_id = '${vote_id}'`;
            await mysql(countDown_query);

            const deletePick_query = `delete from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;
            await mysql(deletePick_query);
        }
        
        for (const value of pick) {
            const setPick_query = `insert into participant_vote(user_id, vote_id, content) values ('${user_id}', '${vote_id}', '${value}')`;
            await mysql(setPick_query);
        }

        const countUp_query = `update choice_count set count = count + 1 where user_id = '${user_id}' and vote_id = '${vote_id}'`;
        await mysql(countUp_query);

        const returnChoice_query = `select * from choice where vote_id = '${vote_id}'`;
        const returnChoice = await mysql(returnChoice_query);

        res.send(returnChoice)
    } catch (error) {
        console.log("투표 선택 에러");
    }
}

//사용자가 해당 투표에 참여한 상태인가
export const isAlreadyChoice = async (req, res) => {
    try {
        const { user_id, vote_id } = req.body;
        
        //특정 사용자가 특정 투표를 참여했는지 확인하는 쿼리
        const participant_query = `select id from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);

        let isParticipant = participate_vote.length !== 0;

        res.send(isParticipant);
    } catch (error) {
        console.log("사용자가 투표 여부 확인 처리 에러");
    }
}