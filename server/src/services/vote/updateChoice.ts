import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbUpdate } from "../../loaders/mongodb";

//투표를 했을 떄
export const updateChoice = async (req: Request, res: Response) => {
  const collection = "vote";
  const { user_id, vote_id, choiceList } = req.body;

  try {
    //기존의 선택을 제거
    await mongodbUpdate(
      collection,
      { _id: ObjectId.createFromHexString(vote_id) },
      {
        $pull: { participant_member: { user_id: user_id } },
        $inc: { participant: -1 },
      }
    );

    //새로운 선택을 생성
    await mongodbUpdate(
      collection,
      { _id: ObjectId.createFromHexString(vote_id) },
      {
        $push: {
          participant_member: {
            user_id: user_id,
            pick: choiceList,
          },
        },
        $inc: { participant: 1 },
      }
    );

    res.send();
  } catch (error) {
    console.log("updateChoice 에러");
    throw error;
  }
};
