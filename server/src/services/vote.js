import mysql from '../data-access/mysql.js'

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

export const getMyVote = async (req, res) => {
    try {
        const { own_id } = req.body;

        const own_vote_query = `select * from vote where own_id = '${own_id}'`;
        let votes = await mysql(own_vote_query);

        for (const vote of votes) {
            const vote_choice_join = `select choice.id, content, count from vote join choice on vote.id = choice.vote_id where vote.id=${vote.id};`
            const choices = await mysql(vote_choice_join);
            vote.choice = choices;
        }

        res.send(votes);
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}