import mysql from '../data-access/mysql.js'

//좋아요 버튼 Count DB에 반영
export const updateLikesCount = async (req, res) => {
    try {
        const { user_id, vote_id } = req.body;

        //좋아요를 누른 사용자가 해당 투표에 좋아요를 눌렀는지 판별
        const participant_query = `select * from participant_likes where user_id = '${user_id}' and vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);
        let isParticipant = participate_vote.length !== 0;

        console.log(vote_id, participate_vote);
        //사용자가 한 투표에 좋아요를 여러번 count up 하는걸 방지
        if (isParticipant) {
            const minus_likesCount_query = `update vote set likes = likes - 1 where id = ${vote_id}`;
            await mysql(minus_likesCount_query);
            const remove_participant_query = `delete from participant_likes where user_id = '${user_id}' and vote_id = '${vote_id}'`;
            await mysql(remove_participant_query);

            isParticipant = false;
        } else {
            const plus_likesCount_query = `update vote set likes = likes + 1 where id = ${vote_id}`;
            await mysql(plus_likesCount_query);
            const add_participant_query = `insert into participant_likes(vote_id, user_id) values('${vote_id}', '${user_id}')`
            await mysql(add_participant_query);

            isParticipant = true;
        }

        const like_count_query = `select likes from vote where id='${vote_id}'`;
        const like_count = await mysql(like_count_query);

        res.send({
            checked: isParticipant,
            like_count: like_count[0].likes,
        })
    } catch (error) {
        console.log("좋아요 버튼 오류", error);
    }
}

//사용자가 좋아요를 이미 누른 상태인지 확인
export const isAlreadyLikes = async (req, res) => {
    try {
        const { user_id, vote_id } = req.body;

        //좋아요를 누른 사용자가 해당 투표에 좋아요를 눌렀는지 판별
        const participant_query = `select * from participant_likes where user_id = '${user_id}' and vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);

        res.send(participate_vote.length !== 0)
    } catch (error) {
        console.log("좋아요 중복 점검 오류", error);
    }
}