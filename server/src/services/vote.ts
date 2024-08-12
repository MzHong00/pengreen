import { ObjectId } from "mongodb";

import {
  mongodbAggregate,
  mongodbFind,
  mongodbFindOne,
  mongodbInsert,
  mongodbUpdate,
} from "../data-access/mongodb";
import { type Participant, type Vote, type VoteForm } from "../types/vote";

const collection = "vote";

export const createVote = async (formData: VoteForm): Promise<void> => {
  try {
    const vote: Vote = {
      ...formData,
      like: 0,
      like_member: [],
      participant: 0,
      participant_member: [],
      start_time: new Date(),
    };

    mongodbInsert<Vote>(collection, vote);
  } catch (error) {
    throw new Error(`Create Vote Error: ${error}`);
  }
};

export const readVote = async (
  page: number,
  votePerPage: number,
  category: string,
  sort: string
): Promise<Vote[]> => {
  try {
    return await mongodbAggregate(collection, [
      { $match: category ? { category: category } : {} },
      { $sort: sort ? { [sort as string]: -1 } : { _id: -1 } },
      { $skip: page * votePerPage },
      { $limit: votePerPage },
    ]);
  } catch (error) {
    throw new Error(`Read Vote Error: ${error}`);
  }
};

export const readVoteById = async (voteId: string): Promise<Vote> => {
  try {
    const vote = await mongodbFindOne(collection, {
      _id: ObjectId.createFromHexString(voteId),
    });

    return vote;
  } catch (error) {
    throw new Error(`Read Vote By Id Error: ${error}`);
  }
};

export const readVoteByOwnerId = async (own_id: string): Promise<Vote[]> => {
  try {
    const voteList = await mongodbFind(collection, {
      "owner._id": own_id,
    });

    return voteList;
  } catch (error) {
    throw new Error(`Read Vote By Owner Error: ${error}`);
  }
};

//투표 선택 수
export const readChoiceCount = async (
  vote_id: string,
  choiceList: Array<string>
) => {
  let choiceCount = [];
  try {
    for (const choice of choiceList) {
      const eachChoice: Participant[] = await mongodbFind(
        collection,
        {
          _id: ObjectId.createFromHexString(vote_id),
          "participant_member.pick": choice,
        },
        { projection: { participant_member: 1 } }
      );

      choiceCount.push({
        content: choice,
        count: eachChoice.length,
      });
    }

    return choiceCount;
  } catch (error) {
    throw new Error(`Read Choice Error: ${error}`);
  }
};

//사용자가 투표자인지 확인
export const readUserPick = async (user_id: string, vote_id: string) => {
  try {
    const userPick = await mongodbFindOne(
      collection,
      {
        _id: ObjectId.createFromHexString(vote_id),
        "participant_member.user_id": user_id,
      },
      {
        projection: {
          _id: 0,
          "participant_member.pick": 1,
        },
      }
    );

    return userPick?.participant_member[0].pick;
  } catch (error) {
    throw new Error(`Read User Error: ${error}`);
  }
};

//투표를 했을 떄
export const updateChoice = async (
  user_id: string,
  vote_id: string,
  choiceList: Array<string>
): Promise<void> => {
  try {
    const isParticipant = await mongodbFind(
      collection,
      {
        _id: ObjectId.createFromHexString(vote_id),
        "participant_member.user_id": user_id,
      },
      { projection: { participant: 1 } }
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
  } catch (error) {
    throw new Error(`Update Choice Error: ${error}`);
  }
};

//좋아요 버튼 Count DB에 반영
export const updateLike = async (
  user_id: string,
  vote_id: string
): Promise<void> => {
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
  } catch (error) {
    throw new Error(`Update Like Error: ${error}`);
  }
};
