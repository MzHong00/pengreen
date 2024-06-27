import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbFind, mongodbFindOne } from "../../loaders/mongodb";
import { Participant } from "../../models/participant";

const collection = "vote";

//투표 선택 수
export const readChoiceCount = async (req: Request, res: Response) => {
  const { vote_id, choiceList } = req.body;

  try {
    //각각의 투표 선택 항목의 수
    let choiceCount: Array<Object> = [];

    for (const choice of choiceList) {
      const eachChoice: Participant[] = await mongodbFind(collection, {
        _id: ObjectId.createFromHexString(vote_id),
        'participant.pick': choice,
      },
      {
        projection: {
          "participant.user_id": 1
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
    throw error;
  }
};

//내가 투표자인지
export const readUserPick = async (req: Request, res: Response) => {
  const { user_id, vote_id } = req.body;

  try {
    //내가 투표자인지
    const userPick = await mongodbFindOne(
      collection,
      {
        _id: ObjectId.createFromHexString(vote_id),
        "participant.user_id": user_id,
      },
      {
        projection: {
          _id: 0,
          "participant.pick": 1,
        },
      }
    );

    res.send(userPick?.participant[0].pick);
  } catch (error) {
    throw error;
  }
};
