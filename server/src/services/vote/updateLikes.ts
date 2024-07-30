import { type Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbFind, mongodbUpdate } from "../../loaders/mongodb";

//좋아요 버튼 Count DB에 반영
export const updateLike = async (req: Request, res: Response) => {
  const collection = "vote";
  const { user_id, vote_id } = req.body;

  try {
    //_id는 ObjectId 타입이기 때문에 vote_id를 ObjectId로 바꾸고 비교해야 함
    const voteId = ObjectId.createFromHexString(vote_id);

    // 사용자가 좋아요를 누른 사람인지 확인
    const isLiker = await mongodbFind(
      collection,
      {
        _id: voteId,
        like_member: { $in: [user_id] },
      },
      { projection: { like_member: 1 } }
    );

    if (isLiker.length === 0) {
      await mongodbUpdate(
        collection,
        { _id: voteId },
        { $push: { like_member: user_id }, $inc: { like: 1 } }
      );
    } else {
      await mongodbUpdate(
        collection,
        { _id: voteId },
        { $pull: { like_member: user_id }, $inc: { like: -1 } }
      );
    }

    res.send();
  } catch (error) {
    console.log("updateLike 에러");
    throw error;
  }
};
