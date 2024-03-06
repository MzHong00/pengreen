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

//투표 가져오기 - 나의 투표
export const getMyVote = async (req, res) => {
    try {
        const { own_id } = req.body;

        const own_vote_query = `select * from pvote where own_id = '${own_id}'`;
        let votes = await mysql(own_vote_query);

        res.send(votes);
    } catch (error) {
        console.log("내 투표 가져오기 에러");
    }
}

export const getVoteById = async (req, res) => {
    try {
        const { vote_id } = req.body;

        const getVoteById_query = `select * from pvote where id = ${vote_id}`;
        const vote = await mysql(getVoteById_query);

        res.send(vote);
    } catch (error) {
        console.log("id로 투표 가져오기 에러");
    }
}

//투표 가져오기 - 좋아요 많은 순서
export const getVote_sortByLikes = async (req, res) => {
    try {
        const sortByLikes_query = `SELECT * FROM pvote order by likes desc`;
        const votes = await mysql(sortByLikes_query);

        res.send(votes);
    } catch (error) {
        console.log("좋아요 순서 투표 가져오기 에러");
    }
}

//투표 가져오기 - 투표자 많은 순서
export const getVote_sortByParticipant = async (req, res) => {
    try {
        //Vote 테이블엔 참여자 수가 없기 때문에 Participant_vote 테이블과 Join하여 참여자 수를 얻어 내림차순 
        const sortByParticipant_query = `select * from pvote order by participants desc`;
        const votes = await mysql(sortByParticipant_query);

        res.send(votes);
    } catch (error) {
        console.log("투표자 많은 순서 투표 가져오기 실패");
    }
}

//소유자 정보 가져오기 - 해당 투표 소유자
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