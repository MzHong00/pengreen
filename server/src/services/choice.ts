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
