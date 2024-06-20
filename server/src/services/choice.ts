import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import {
  mongodbFind,
  mongodbFindOne,
  mongodbInsert,
  mongodbRemove,
  mongodbUpdate,
} from "../loaders/mongodb";
import { Participant } from "../models/participant";

//투표 선택 수
export const readEachChoiceCount = async (req: Request, res: Response) => {
  const collection = "vote_participants";

  try {
    const { vote_id, choiceList } = req.body;

    //각각의 투표 선택 항목의 수
    let totalChoiceCount: Array<Object> = [];
    for (const choice of choiceList) {
      const eachChoiceQuery = {
        vote_id: vote_id,
        pick: choice,
      };
      const eachChoice: Participant[] = await mongodbFind(
        collection,
        eachChoiceQuery
      );
      const eachChoiceCount: number = eachChoice.length;

      totalChoiceCount.push({
        content: choice,
        count: eachChoiceCount,
      });
    }

    res.send(totalChoiceCount);
  } catch (error) {
    throw error;
  }
};

//내가 투표자인지
export const readMyPick = async (req: Request, res: Response) => {
  const collection = "vote_participants";

  try {
    const { user_id, vote_id } = req.body;

    //내가 투표자인지
    const myPickQuery = {
      user_id: user_id,
      vote_id: vote_id,
    };
    const myPick: Participant = await mongodbFindOne(collection, myPickQuery);

    res.send(myPick?.pick);
  } catch (error) {
    throw error;
  }
};

//투표를 했을 떄
export const updateChoice = async (req: Request, res: Response) => {
  const collection = "vote_participants";

  try {
    const { user_id, vote_id, choiceList } = req.body;

    const participantQuery = {
      user_id: user_id,
      vote_id: vote_id,
    };

    const prevPick: Participant = await mongodbFindOne(
      collection,
      participantQuery
    );

    if (prevPick) {
      await mongodbRemove(collection, prevPick);
    } else {
      await mongodbUpdate(
        "vote",
        { _id: ObjectId.createFromHexString(vote_id) },
        { $push: { participant: user_id } }
      );
    }

    const newPickQuery: Participant = {
      user_id: user_id,
      vote_id: vote_id,
      pick: choiceList,
    };
    await mongodbInsert<Participant>(collection, newPickQuery);

    res.send();
  } catch (error) {
    throw error;
  }
};

// //투표 항목 가져오기
// export const getChoiceOfVote = async (req, res) => {
//     try {
//         const { vote_id } = req.body;
//         const choiceOfVote_query = `selected choice.id, content, count from choice join vote on choice.vote_id = vote.id where vote_id = '${vote_id}'`;
//         const choiceOfVote = await mysql(choiceOfVote_query);

//         res.send(choiceOfVote);
//     } catch (error) {
//         console.log(error);
//     }
// }

// //사용자가 고른 투표 항목 적용 후 고른 항목 가져오기
// export const updateChoiceCount = async (req, res) => {
//     try {
//         const { user_id, vote_id, pick } = req.body;

//         //특정 사용자가 특정 투표를 참여했는지 확인하는 쿼리
//         const participant_query = `selected id from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;
//         const participate_vote = await mysql(participant_query);

//         let isParticipant = participate_vote.length !== 0;

//         if (isParticipant) {
//             //사용자가 기존에 고른 픽들을 1씩 감소
//             const countDown_query = `update choice_count set count = count - 1 where user_id = '${user_id}' and vote_id = '${vote_id}'`;
//             await mysql(countDown_query);

//             //사용자가 참여한 투표 테이블 삭제
//             const deletePick_query = `delete from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;
//             await mysql(deletePick_query);
//         }

//         for (const value of pick) {
//             const setPick_query = `insert into participant_vote(user_id, vote_id, content) values ('${user_id}', '${vote_id}', '${value}')`;
//             await mysql(setPick_query);
//         }

//         //사용자가 고른 Pick 1증가
//         const applyPick_query = `update choice_count set count = count + 1 where user_id = '${user_id}' and vote_id = '${vote_id}'`;
//         await mysql(applyPick_query);

//         const returnChoice_query = `selected * from choice where vote_id = '${vote_id}'`;
//         const returnChoice = await mysql(returnChoice_query);

//         res.send(returnChoice)
//     } catch (error) {
//         console.log("투표 선택 에러");
//     }
// }

// //사용자가 투표한 목록 가져오기
// export const getPick = async (req, res) => {
//     try {
//         const { user_id, vote_id } = req.body;

//         //특정 사용자가 특정 투표를 참여했는지 확인하는 쿼리
//         const participant_query = `selected * from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;
//         const participate_vote = await mysql(participant_query);

//         res.send(participate_vote);
//     } catch (error) {
//         console.log("사용자가 투표 여부 확인 처리 에러");
//     }
// }
