import axios from "axios";
import { type VoteDto } from "widgets/voteCard";

export const readVoteById = async (
  voteId: string
): Promise<VoteDto | undefined> => {
  try {
    const votes = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read-id`,
      {
        voteId: voteId,
      }
    );

    console.log("투표 Fetch");

    return votes.data[0];
  } catch (error) {
    console.log("투표 가져오기 에러");
  }
};
