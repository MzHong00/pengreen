import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { VoteActionDto } from "entities/vote/vote";

export const useUpdateLike = ({
  user_id,
  vote_id,
}: VoteActionDto) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      updateLike({
        user_id: user_id,
        vote_id: vote_id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voteList"] });
    },
  });
};

const updateLike = async ({ user_id, vote_id }: VoteActionDto) => {
  try {
    if (!user_id) return;

    const fetchLike = await axios.put(
      `${process.env.REACT_APP_API_ROOT}/api/vote/update-like`,
      {
        user_id: user_id,
        vote_id: vote_id,
      }
    );

    const { likesCount, isLiker } = fetchLike.data;

    console.log("좋아요 업데이트 Fetch");

    return { likesCount, isLiker };
  } catch (error) {
    console.log("좋아요 처리 에러");
  }
};
