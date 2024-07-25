import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { type VoteDto } from "entities/vote/vote";

// 그룹, 정렬, 페이지네이션 VoteList를 서버 요청
export const useReadVote = (votePerPage: number) => {
  const [sortOptionParams] = useSearchParams();
  const pageParams = sortOptionParams.get("page");

  return useQuery({
    queryKey: ["voteList", pageParams],
    queryFn: () => readVote(sortOptionParams.toString(), votePerPage),
  });
};

const readVote = async (
  queryString: string,
  votePerPage?: number
): Promise<VoteDto[] | undefined> => {
  try {
    const postUrl = `${process.env.REACT_APP_API_ROOT}/api/vote/read?${queryString}`;
    const votes = await axios.post(postUrl, { votePerPage: votePerPage });

    return votes.data;
  } catch (error) {
    console.log("투표 리스트 가져오기 에러");
  }
};
