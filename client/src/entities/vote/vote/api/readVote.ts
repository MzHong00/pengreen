import axios from "shared/api/base";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { type VoteDto } from "entities/vote/vote";

// 그룹, 정렬, 페이지네이션 VoteList를 서버 요청
export const useReadVote = (votePerPage: number, pageNumber: number) => {
  const [sortOptionParams] = useSearchParams();
  const categoryParams = sortOptionParams.get("category");
  const sortgoryParams = sortOptionParams.get("sort");

  return useQuery({
    queryKey: ["voteList", pageNumber, categoryParams, sortgoryParams],
    queryFn: () =>
      readVote(sortOptionParams.toString(), votePerPage, pageNumber),
    staleTime: 1000,
  });
};

const readVote = async (
  queryString: string,
  votePerPage: number,
  pageNumber: number
): Promise<VoteDto[] | undefined> => {
  try {
    const votes = await axios.post(
      "/api/vote/read-list",
      {
        votePerPage: votePerPage,
        page: pageNumber,
      },
      { params: queryString }
    );

    return votes.data;
  } catch (error) {
    console.log("투표 리스트 가져오기 에러");
  }
};
