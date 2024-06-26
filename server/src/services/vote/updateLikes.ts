import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbFind, mongodbUpdate } from "../../loaders/mongodb";

//좋아요 버튼 Count DB에 반영
export const updateLike = async (req: Request, res: Response) => {
  const { user_id, vote_id } = req.body;
  const collection = "vote";

  try {
    //_id는 ObjectId 타입이기 때문에 vote_id를 ObjectId로 바꾸고 비교해야 함
    const voteId = ObjectId.createFromHexString(vote_id);

    // 사용자가 좋아요를 누른 사람인지 확인
    const isLiker = await mongodbFind(collection, {
      _id: voteId,
      like: {
        $in: [user_id],
      },
    });

    isLiker.length !== 0
      ? await mongodbUpdate(
          collection,
          { _id: voteId },
          { $pull: { like: user_id } }
        )
      : await mongodbUpdate(
          collection,
          { _id: voteId },
          { $push: { like: user_id } }
        );

    res.send();
  } catch (error) {
    throw error;
  }
};