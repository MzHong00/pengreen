import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbFind, mongodbUpdate } from "../../loaders/mongodb";

//투표를 했을 떄
export const updateChoice = async (req: Request, res: Response) => {
  const collection = "vote";
  const { user_id, vote_id, choiceList } = req.body;

  try {
    const isParticipant = await mongodbFind(
      collection,
      {
        _id: ObjectId.createFromHexString(vote_id),
        "participant_member.user_id": user_id
      },
      {
        projection: { participant: 1 },
      }
    );

    if (isParticipant.length === 0) {
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
    } else {
      await mongodbUpdate(
        collection,
        {
          _id: ObjectId.createFromHexString(vote_id),
          "participant_member.user_id": user_id,
        },
        { $set: { "participant_member.$.pick": choiceList } }
      );
    }

    res.send();
  } catch (error) {
    console.log("updateChoice 에러");
    throw error;
  }
};
