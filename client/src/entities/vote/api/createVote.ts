import axios from "axios";
import { type VoteDto } from "widgets/voteCard";

export const createVote = async (vote: VoteDto): Promise<void> => {
  try {
    await axios.post(`${process.env.REACT_APP_API_ROOT}/api/vote/create`, vote);
  } catch (error) {
    console.log("투표 생성 에러");
  }
};
