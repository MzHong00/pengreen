import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { VoteActionDto } from "entities/vote";

export const useReadUserPick = ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  return useQuery({
    queryKey: ["isParticipant", vote_id],
    queryFn: () =>
      readUserPick({
        user_id: user_id,
        vote_id: vote_id,
      }),
    enabled: !!user_id,
  });
};

const readUserPick = async ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  try {
    const isParticipant = await axios.put(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read-mypick`,
      {
        user_id: user_id,
        vote_id: vote_id,
      }
    );

    return isParticipant.data;
  } catch (error) {
    console.log("참여자 수 가져오기 에러");
  }
};
