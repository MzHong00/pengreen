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

        //투표 데이터에 Choice까지 붙혀서 응답
        // for (const vote of votes) {
        //     const vote_choice_join = `select choice.id, content, count from vote join choice on vote.id = choice.vote_id where vote.id = ${vote.id};`
        //     const choices = await mysql(vote_choice_join);
        //     vote.choice = choices;
        // }

        res.send(votes);
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

//좋아요 순서 투표 가져오기
export const getVote_seqLikes = async (req, res) => {
    try {
        const seqLikes_query = `SELECT * FROM my_db.vote order by likes desc`;
        const votes = await mysql(seqLikes_query);

        res.send(votes);
    } catch (error) {
        console.log("좋아요 순서 투표 가져오기 에러");
    }
}

//해당 투표의 소유자 정보 가져오기
export const getVoteOwner = async (req, res) => {
    try {
        const { vote_id } = req.body;
        const getOwner_query = `select name, picture from vote join account on vote.own_id = account.id where vote.id = '${vote_id}'`;
        const owner = await mysql(getOwner_query);

        res.send(owner);
    } catch (error) {
        console.log("투표 소유자 정보 가져오기 에러");
    }
}