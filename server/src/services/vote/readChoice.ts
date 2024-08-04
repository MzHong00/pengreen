import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbFind, mongodbFindOne } from "../../loaders/mongodb";
import { Participant } from "../../types/participant";

const collection = "vote";

//투표 선택 수
export const readChoiceCount = async (req: Request, res: Response) => {
  const { vote_id, choiceList } = req.body;

  try {
    //각각의 투표 선택 항목의 수
    let choiceCount = [];

    for (const choice of choiceList) {
      const eachChoice: Participant[] = await mongodbFind(collection, {
        _id: ObjectId.createFromHexString(vote_id),
        'participant_member.pick': choice,
      },
      {
        projection: {
          "participant_member": 1
        }
      }
    );
    
    choiceCount.push({
        content: choice,
        count: eachChoice.length,
      });
    }

    res.send(choiceCount);
  } catch (error) {
    console.log("readChoiceCount 에러");
    throw error;
  }
};

//사용자가 투표자인지 확인
export const readUserPick = async (req: Request, res: Response) => {
  const { user_id, vote_id } = req.body;

  try {
    //사용자의 투표 가져오기
    const userPick = await mongodbFindOne(
      collection,
      {
        _id: ObjectId.createFromHexString(vote_id),
        "participant_member.user_id": user_id,
      },
      {
        projection: {
          _id: 0,
          "participant_member.pick": 1,
        },
      }
    );

    res.send(userPick?.participant_member[0].pick);
  } catch (error) {
    console.log("readUserPick 에러");
    throw error;
  }
};
