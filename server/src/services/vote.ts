import { ObjectId } from "mongodb";

import mongoService from "../loaders/mongodb";
import { type Participant, type Vote, type VoteForm } from "../types/vote";
import { type User } from "../types/user";
import { filterByKeys } from "../utils/filterByKeys";

const collection = "vote";

export const createVote = async (formData: VoteForm): Promise<void> => {
  try {
    const vote: Vote = {
      ...formData,
      likes: [],
      participants: [],
      start_time: new Date(),
    };

    await mongoService.insert<Vote>(collection, vote);
  } catch (error) {
    throw new Error(`Create Vote Error: ${error}`);
  }
};

export const readVoteList = async (
  page: number,
  votePerPage: number,
  category: string,
  sort: string
): Promise<Vote[]> => {
  try {
    return await mongoService.aggregate<Vote>(collection, [
      { $match: category ? { category: category } : {} },
      { $sort: sort ? { [`${sort}`]: -1 } : { _id: -1 } },
      { $skip: page * votePerPage },
      { $limit: votePerPage },
    ]);
  } catch (error) {
    throw new Error(`Read Vote Error: ${error}`);
  }
};

export const readVoteDetail = async (voteId: Vote["_id"]) => {
  try {
    return await mongoService.aggregate(collection, [
      { $match: { _id: new ObjectId(voteId) } },
      { $unwind: "$participants" },
      {
        $addFields: {
          "participants.user.age": {
            $dateDiff: {
              startDate: {
                $toDate: "$participants.user.birth",
              },
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $facet: {
          locationAggregate: [
            {
              $group: {
                _id: "$participants.user.location",
                locationCount: { $count: {} },
              },
            },
          ],
          genderAggregate: [
            {
              $group: {
                _id: "$participants.user.gender",
                genderCount: { $count: {} },
              },
            },
          ],
          ageAggregate: [
            {
              $bucket: {
                groupBy: "$participants.user.age",
                boundaries: [10, 20, 30, 40, 50, 60],
                default: "other",
                output: {
                  count: { $sum: 1 },
                },
              },
            },
          ],
        },
      },
    ]);
  } catch (error) {
    throw error;
  }
};

export const readVoteByOwnerId = async (
  own_id: User["_id"]
): Promise<Vote[]> => {
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
  user: User,
  vote_id: Vote["_id"],
  choiceList: Array<string>
): Promise<void> => {
  const voteId = new ObjectId(vote_id);

  try {
    // 기존 참가자 데이터 조회
    const participant = await mongoService.findOne<Vote>(
      collection,
      {
        _id: voteId,
        "participants.user._id": user._id,
      },
      { projection: { "participants.$": 1 } }
    );

    // 새로운 선택 항목들의 count를 증가시키기 위한 업데이트
    const increaseCountOps = choiceList.map((choice) => ({
      updateOne: {
        filter: { _id: voteId, "choice.content": choice },
        update: { $inc: { "choice.$.count": 1 } },
      },
    }));

    if (participant) {
      /* 이미 투표를 한 경우 */
      const previousChoices = participant.participants[0].pick;

      // 이전 선택 항목들의 count를 감소시키기 위한 업데이트
      const decreaseCountOps = previousChoices.map((choice) => ({
        updateOne: {
          filter: { _id: voteId, "choice.content": choice },
          update: { $inc: { "choice.$.count": -1 } },
        },
      }));

      const updatePickOps = {
        updateOne: {
          filter: { _id: voteId, "participants.user._id": user._id },
          update: { $set: { "participants.$.pick": choiceList } },
        },
      };
      // 모든 업데이트를 하나의 bulkWrite로 처리
      await mongoService.bulkWrite<Vote>(collection, [
        ...decreaseCountOps,
        ...increaseCountOps,
        updatePickOps,
      ]);
    } else {
      /* 투표를 하지 않은 경우 */
      const addParticipantOps = {
        updateOne: {
          filter: { _id: voteId },
          update: {
            $push: {
              participants: {
                user: filterByKeys<Participant["user"]>(user, [
                  "_id",
                  "birth",
                  "location",
                  "gender",
                ]),
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
  user_id: User["_id"],
  vote_id: Vote["_id"]
): Promise<void> => {
  try {
    //_id는 ObjectId 타입이기 때문에 vote_id를 ObjectId로 바꾸고 비교해야 함
    const voteId = new ObjectId(vote_id);

    // 사용자가 좋아요를 누른 사람인지 확인
    const isLiker = await mongoService.find<Vote>(
      collection,
      {
        _id: voteId,
        likes: { $in: [user_id] },
      },
      { projection: { likes: 1 } }
    );

    if (isLiker.length === 0) {
      await mongoService.update<Vote>(
        collection,
        { _id: voteId },
        { $push: { likes: user_id } }
      );
    } else {
      await mongoService.update<Vote>(
        collection,
        { _id: voteId },
        { $pull: { likes: user_id } }
      );
    }
  } catch (error) {
    throw new Error(`Update Like Error: ${error}`);
  }
};
