import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { type VoteDto } from "entities/vote/vote";
import { User } from "entities/user";

export const useReadVoteListByOwner = (ownId: User["_id"]) => {
  return useQuery({
    queryKey: ["vote", ownId],
    queryFn: () => readVoteByOwner(ownId),
    enabled: !!ownId,
  });
};

const readVoteByOwner = async (
  own_id: User["_id"]
): Promise<VoteDto[] | undefined> => {
  if (!own_id) return;

  try {
    const vote_data = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read-owner`,
      {
        own_id: own_id,
      }
    );

    return vote_data.data;
  } catch (error) {
    console.log("내 투표 가져오기 에러");
  }
};
