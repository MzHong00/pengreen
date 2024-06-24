import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbFind, mongodbInsert } from "../loaders/mongodb";
import { mongodbAggregate } from "../data-access/mongodb/aggregate";
import { type SortType, type Vote } from "../models/vote";
import { toVoteFormat } from "../utils/formatUtils";

export const createVote = async (req: Request) => {
  const data = req.body;
  const collection = "vote";

  try {
    const vote = toVoteFormat(data);
    mongodbInsert<Vote>(collection, vote);
  } catch (error) {
    throw error;
  }
};

export const readVoteList = async (req: Request, res: Response) => {
  const { sort } = req.query;
  const collection = "vote";

  try {
    const sortType: SortType[] = ["like", "participant"];
    const verifyType = sortType.includes(sort as SortType);

    //req.query에 like, participant를 제외하 나머지 값을 넣으면 pipeline에서 오류가 나기 때문에 검증 및 기본값 설정
    const verifiedSort = verifyType ? sort : "participant";

    const pipeline = [
      {
        $addFields: {
          arraySize: { $size: `$${verifiedSort}` },
        },
      },
      {
        $sort: { arraySize: -1 }, // arraySize 필드를 기준으로 내림차순 정렬
      },
    ];
    const votes = await mongodbAggregate(collection, pipeline);

    res.send(votes);
  } catch (error) {
    throw error;
  }
};

export const readVoteById = async (req: Request, res: Response) => {
  const { voteId } = req.body;
  const collection = "vote";

  try {
    const votes = await mongodbFind(collection, {
      _id: ObjectId.createFromHexString(voteId),
    });

    res.send(votes);
  } catch (error) {
    throw error;
  }
};

export const readVoteParticipants = async (req: Request, res: Response) => {
  const { vote_id } = req.body;
  const collection = "vote_participants";

  try {
    //투표 참여자 수
    const choiceListQuery = {
      vote_id: vote_id,
    };
    const participant = await mongodbFind(collection, choiceListQuery);
    const participantCount: number = participant.length;

    res.send({
      participantCount: participantCount,
    });
  } catch (error) {
    throw error;
  }
};

export const readVoteByOwnerId = async (req: Request, res: Response) => {
  const { own_id } = req.body;
  const collection = "vote";

  try {
    const query = {
      "owner._id": own_id,
    };
    const votes = await mongodbFind(collection, query);

    res.send(votes);
  } catch (error) {
    throw error;
  }
};
