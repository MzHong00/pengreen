import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { mongodbAggregate, mongodbFind } from "../../loaders/mongodb";
import { Vote } from "../../types/vote";

const collection = "vote";

export const readVote = async (req: Request, res: Response) => {
  const page = parseInt(req.body.page as string) - 1;
  const votePerPage = req.body.votePerPage === 0 ? 1 : req.body.votePerPage;
  const category = req.query.category;
  const sort = req.query.sort;

  if (page < 0) {
    res.status(200).send([]);
    return;
  }

  try {
    const votes: Vote[] = await mongodbAggregate(collection, [
      { $match: category ? { category: category } : {} },
      { $sort: sort ? { [sort as string]: -1 } : { _id: -1 } },
      { $skip: page * votePerPage },
      { $limit: votePerPage },
    ]);

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
