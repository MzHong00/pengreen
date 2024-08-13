import axios from "shared/api/base";
import { useQuery } from "@tanstack/react-query";

import { type VoteDto } from "entities/vote/vote";
import { Cookies } from "react-cookie";

export const useReadUserPick = (voteId: VoteDto["_id"]) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");
  
  return useQuery({
    queryKey: ["isParticipant", voteId],
    queryFn: () => readUserPick(voteId),
    enabled: !!voteId && !!accessToken,
  });
};

const readUserPick = async (voteId: VoteDto["_id"]) => {
  try {
    const isParticipant = await axios.put(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read-mypick`,
      { vote_id: voteId }
    );

    return isParticipant.data;
  } catch (error) {
    new Error("참여자 수 가져오기 에러");
  }
};
