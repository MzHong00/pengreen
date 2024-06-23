import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useReadVoteParticipants = (voteId: string) => {
  return useQuery({
    queryKey: ["participant", voteId],
    queryFn: () => readVoteParticipants(voteId),
  });
};

const readVoteParticipants = async (
  vote_id: string
): Promise<string | undefined> => {
  try {
    const vote_data = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read-participant`,
      {
        vote_id: vote_id,
      }
    );
    console.log("참여자 Fetch");

    return vote_data.data.participantCount;
  } catch (error) {
    console.log("내 투표 가져오기 에러");
  }
};
