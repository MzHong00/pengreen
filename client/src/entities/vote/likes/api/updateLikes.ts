import axios from "shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteDto } from "entities/vote/vote";

export const useUpdateLike = (vote_id: VoteDto["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateLike(vote_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voteList"] });
    },
  });
};

const updateLike = async (vote_id: VoteDto["_id"]) => {
  try {
    const fetchLike = await axios.put(
      `${process.env.REACT_APP_API_ROOT}/api/vote/update-like`,
      { vote_id: vote_id }
    );

    const { likesCount, isLiker } = fetchLike.data;

    console.log("좋아요 업데이트 Fetch");

    return { likesCount, isLiker };
  } catch (error) {
    console.log("좋아요 처리 에러");
  }
};
