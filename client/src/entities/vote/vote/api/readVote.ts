import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { type VoteDto } from "entities/vote/vote";

export const useReadVote = (queryString: string) => {
  return useQuery({
    queryKey: ["vote"],
    queryFn: () => readVote(queryString),
  });
}

const readVote = async (
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
