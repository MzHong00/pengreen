import mysql from '../data-access/mysql.js'

//좋아요 버튼 Count DB에 반영
export const updateLikesCount = async (req, res) => {
    try {
        const { user_id, vote_id } = req.body;
        
        //좋아요를 누른 사용자가 해당 투표에 좋아요를 눌렀는지 판별
        const participant_query = `select * from participant_likes where user_id = '${user_id}' and vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);
        let isParticipant = participate_vote.length !== 0;

        //사용자가 한 투표에 좋아요를 여러번 count up 하는걸 방지
        if (isParticipant) {
            const remove_participant_query = `delete from participant_likes where user_id = '${user_id}' and vote_id = '${vote_id}'`;
            await mysql(remove_participant_query);
        } else {
            const add_participant_query = `insert into participant_likes(vote_id, user_id) values('${vote_id}', '${user_id}')`
            await mysql(add_participant_query);
        }

        const like_count_query = `select likes from pvote where id='${vote_id}'`;
        const like_count = await mysql(like_count_query);

        res.send(like_count[0]);  
    } catch (error) {
        console.log("좋아요 버튼 오류");
    }
}

//사용자가 좋아요를 이미 누른 상태인지 확인
export const isAlreadyLikes = async (req, res) => {
    try {
        const { user_id, vote_id } = req.body;

        //좋아요를 누른 사용자가 해당 투표에 좋아요를 눌렀는지 판별
        const participant_query = `select id from participant_likes where user_id = '${user_id}' and vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);

        res.send(participate_vote.length !== 0)
    } catch (error) {
        console.log("좋아요 중복 점검 오류", error);
    }
}