import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbUpdate } from "../../loaders/mongodb";

//투표를 했을 떄
export const updateChoice = async (req: Request, res: Response) => {
  const collection = "vote";
  const { user_id, vote_id, choiceList } = req.body;

  try {
    await mongodbUpdate(
      collection,
      { _id: ObjectId.createFromHexString(vote_id) },
      {
        $pull: { participant: { user_id: user_id } },
      }
    );
    await mongodbUpdate(
      collection,
      { _id: ObjectId.createFromHexString(vote_id) },
      {
        $push: {
          participant: {
            user_id: user_id,
            pick: choiceList,
          },
        },
      }
    );

    res.send();
  } catch (error) {
    throw error;
  }
};
