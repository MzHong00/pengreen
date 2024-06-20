import axios from "axios";
import { type VoteDto } from "widgets/voteCard";

export const readVote = async (
  queryString: string
): Promise<VoteDto[] | undefined> => {
  try {
    const votes = await axios.get(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read?${queryString}`
    );

    return votes.data;
  } catch (error) {
    console.log("투표 리스트 가져오기 에러");
  }
};
