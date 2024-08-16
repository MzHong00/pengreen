import { ObjectId } from "mongodb";

import mongoService from "../loaders/mongodb";
import { type Vote, type VoteForm } from "../types/vote";

const collection = "vote";

export const createVote = async (formData: VoteForm): Promise<void> => {
  try {
    const vote: Vote = {
      ...formData,
      like_member: [],
      participant_member: [],
      start_time: new Date(),
    };

    await mongoService.insert<Vote>(collection, vote);
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
    return await mongoService.aggregate<Vote>(collection, [
      { $match: category ? { category: category } : {} },
      { $sort: sort ? { [sort as string]: -1 } : { _id: -1 } },
      { $skip: page * votePerPage },
      { $limit: votePerPage },
    ]);
  } catch (error) {
    throw new Error(`Read Vote Error: ${error}`);
  }
};

export const readVoteById = async (voteId: string): Promise<Vote | null> => {
  try {
    const vote = await mongoService.findOne<Vote>(collection, {
      _id: ObjectId.createFromHexString(voteId),
    });

    return vote;
  } catch (error) {
    throw new Error(`Read Vote By Id Error: ${error}`);
  }
};

export const readVoteByOwnerId = async (own_id: string): Promise<Vote[]> => {
  try {
    const voteList = await mongoService.find<Vote>(collection, {
      "owner._id": own_id,
    });

    return voteList;
  } catch (error) {
    throw new Error(`Read Vote By Owner Error: ${error}`);
  }
};

export const updateChoice = async (
  user_id: string,
  vote_id: string,
  choiceList: Array<string>
): Promise<void> => {
  const voteId = new ObjectId(vote_id);

  try {
    // 기존 참가자 데이터 조회
    const participant = await mongoService.findOne<Vote>(
      collection,
      {
        _id: voteId,
        "participant_member.user_id": user_id,
      },
      { projection: { "participant_member.$": 1 } }
    );

    const previousChoices = participant?.participant_member[0].pick as string[];

    // 이전 선택 항목들의 count를 감소시키기 위한 업데이트
    const decreaseCountOps = previousChoices?.map((choice) => ({
      updateOne: {
        filter: { _id: voteId, "choice.content": choice },
        update: { $inc: { "choice.$.count": -1 } },
      },
    }));

    // 새로운 선택 항목들의 count를 증가시키기 위한 업데이트
    const increaseCountOps = choiceList.map((choice) => ({
      updateOne: {
        filter: { _id: voteId, "choice.content": choice },
        update: { $inc: { "choice.$.count": 1 } },
      },
    }));

    if (participant) {
      const updatePickOps = {
        updateOne: {
          filter: { _id: voteId, "participant_member.user_id": user_id },
          update: { $set: { "participant_member.$.pick": choiceList } },
        },
      };
      // 모든 업데이트를 하나의 bulkWrite로 처리
      await mongoService.bulkWrite<Vote>(collection, [
        ...decreaseCountOps,
        ...increaseCountOps,
        updatePickOps,
      ]);
    } else {
      const addParticipantOps = {
        updateOne: {
          filter: { _id: voteId },
          update: {
            $push: {
              participant_member: {
                user_id: user_id,
                pick: choiceList,
              },
            },
          },
        },
      };

      // 참가자 추가와 count 증가를 함께 처리
      await mongoService.bulkWrite<Vote>(collection, [
        ...increaseCountOps,
        addParticipantOps,
      ]);
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
    const isLiker = await mongoService.find<Vote>(
      collection,
      {
        _id: voteId,
        like_member: { $in: [user_id] },
      },
      { projection: { like_member: 1 } }
    );

    if (isLiker.length === 0) {
      await mongoService.update<Vote>(
        collection,
        { _id: voteId },
        { $push: { like_member: user_id } },
      );
    } else {
      await mongoService.update<Vote>(
        collection,
        { _id: voteId },
        { $pull: { like_member: user_id } }
      );
    }
  } catch (error) {
    throw new Error(`Update Like Error: ${error}`);
  }
};
