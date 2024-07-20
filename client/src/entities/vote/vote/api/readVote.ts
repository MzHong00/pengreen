import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { type VoteDto } from "entities/vote/vote";

export const useReadVote = () => {
  const [sortOptionParams] = useSearchParams();

  return useQuery({
    queryKey: ["vote"],
    queryFn: () => readVote(sortOptionParams.toString()),
  });
};

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
