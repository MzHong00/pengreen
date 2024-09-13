import axios from "shared/api/base";
import { VoteFormDto } from "entities/voteForm";

export const createVote = async (vote: VoteFormDto): Promise<void> => {
  try {
    await axios.post(`/api/vote/create`, vote);
  } catch (error) {
    console.log("투표 생성 에러");
  }
};
