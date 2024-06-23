import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { type VoteDto } from "entities/vote";

export const useReadVoteById = (voteId: string) => {
  return useQuery({
    queryKey: ["vote", voteId],
    queryFn: () => readVoteById(voteId),
  });
};

const readVoteById = async (
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
