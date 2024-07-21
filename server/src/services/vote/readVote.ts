import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbFind } from "../../loaders/mongodb";
import { mongodbAggregate } from "../../data-access/mongodb/aggregate";
import { type SortType } from "../../models/vote";

const collection = "vote";

export const readVote = async (req: Request, res: Response) => {
  const { page, sort, category } = req.query;

  try {
    const sortType: SortType[] = ["like", "participant"];
    const verifyType = sortType.includes(sort as SortType);

    //req.query에 like, participant를 제외하 나머지 값을 넣으면 pipeline에서 오류가 나기 때문에 검증 및 기본값 설정
    const verifiedSort = verifyType ? sort : "participant";

    // const pipeline = [
    //   {
    //     $addFields: {
    //       arraySize: { $size: `$${verifiedSort}` },
    //     },
    //   },
    //   {
    //     $sort: { arraySize: -1 }, // arraySize 필드를 기준으로 내림차순 정렬
    //   },
    // ];
    // const votes = await mongodbAggregate(collection, pipeline);

    const votes = await mongodbFind(collection, {});
    
    res.send(votes);
  } catch (error) {
    console.log("readVote 에러");
    throw error;
  }
};

export const readVoteById = async (req: Request, res: Response) => {
  const { voteId } = req.body;

  try {
    const votes = await mongodbFind(collection, {
      _id: ObjectId.createFromHexString(voteId),
    });

    res.send(votes);
  } catch (error) {
    console.log("readVoteById 에러");
    throw error;
  }
};

export const readVoteByOwnerId = async (req: Request, res: Response) => {
  const { own_id } = req.body;

  try {
    const query = {
      "owner._id": own_id,
    };
    const votes = await mongodbFind(collection, query);

    res.send(votes);
  } catch (error) {
    console.log("readVoteByOwnerId 에러");
    throw error;
  }
};
