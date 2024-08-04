import { VoteForm, type Vote } from "../../types/vote";
import { mongodbInsert } from "../../loaders/mongodb";

export const createVote = async (req: Request) => {
  const formData = req.body;
  const collection = "vote";

  const vote: Vote = {
    ...(formData as unknown as VoteForm),
    like: 0,
    like_member: [],
    participant: 0,
    participant_member: [],
    start_time: new Date(),
  };

  try {
    mongodbInsert<Vote>(collection, vote);
  } catch (error) {
    throw error;
  }
};
