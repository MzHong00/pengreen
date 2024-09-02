import axios from "shared/api/base";
import { VoteDto } from "../model/types";

export const readVoteDetail = async (voteId?: VoteDto["_id"]) => {
  try {
    if (!voteId) throw new Error("Vote is not founded");

    const vote = await axios.get(`/api/vote/read-id`, {
      params: { voteId: voteId },
    });

    return vote.data;
  } catch (error) {
    throw error;
  }
};
