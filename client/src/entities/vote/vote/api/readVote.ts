import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { type VoteRequestBody, type VoteDto } from "entities/vote/vote";

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
    const postUrl = `${process.env.REACT_APP_API_ROOT}/api/vote/read?${queryString}`;
    const reqBody: VoteRequestBody = {
      votePerPage: votePerPage,
      page: pageNumber,
    };

    const votes = await axios.post(postUrl, reqBody);
    // console.log(pageNumber, votes.data);

    return votes.data;
  } catch (error) {
    console.log("투표 리스트 가져오기 에러");
  }
};
