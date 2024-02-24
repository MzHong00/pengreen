import mysql from '../data-access/mysql.js'

//투표 만들기
export const createVote = async (req, res) => {
    try {
        const {
            own_id, title, deadline, max_choice, choice
        } = req.body;

        const vote_id = new Date().getTime() + Math.random();

        const vote_query = `insert into vote(id, title, deadline, max_choice, own_id) values('${vote_id}', '${title}', '${deadline}', ${max_choice}, '${own_id}')`
        await mysql(vote_query);

        choice.map(async (item) => {
            const choice_query = `insert into choice(vote_id, content) values('${vote_id}', '${item.content}')`;
            await mysql(choice_query);
        })
    } catch (error) {
        console.log("투표 생성 에러");
    }
}

//내가 만든 투표 가져오기
export const getMyVote = async (req, res) => {
    try {
        const { own_id } = req.body;

        const own_vote_query = `select * from vote where own_id = '${own_id}'`;
        let votes = await mysql(own_vote_query);

        for (const vote of votes) {
            const vote_choice_join = `select choice.id, content, count from vote join choice on vote.id = choice.vote_id where vote.id = ${vote.id};`
            const choices = await mysql(vote_choice_join);
            vote.choice = choices;
        }

        res.send(votes);
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

//좋아요 버튼 클릭
export const updateLikesCount = async (req, res) => {
    try {
        const { user_id, vote_id } = req.body;

        //좋아요를 누른 사용자가 해당 투표에 좋아요를 눌렀는지 판별
        const participant_query = `select * from participant_likes where user_id = '${user_id}' && vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);
        let isParticipant = participate_vote.length !== 0;

        //사용자가 한 투표에 좋아요를 여러번 count up 하는걸 방지
        if (isParticipant) {
            const minus_likesCount_query = `update vote set likes = likes - 1 where id = ${vote_id}`;
            await mysql(minus_likesCount_query);
            const remove_participant_query = `delete from participant_likes where user_id = '${user_id}'`;
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

export const isAlreadyLikes = async (req, res) => {
    try {
        const { user_id, vote_id } = req.body;

        //좋아요를 누른 사용자가 해당 투표에 좋아요를 눌렀는지 판별
        const participant_query = `select * from participant_likes where user_id = '${user_id}' && vote_id = '${vote_id}'`;
        const participate_vote = await mysql(participant_query);

        res.send(participate_vote.length !== 0)
    } catch (error) {
        console.log("좋아요 중복 점검 오류", error);
    }
}