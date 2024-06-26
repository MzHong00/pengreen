import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { VoteActionDto } from "entities/vote/vote";

export const useUpdateLikes = ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vote", vote_id] });
    },
  });

  return () => {
    mutate({
      user_id: user_id,
      vote_id: vote_id,
    });
  };
};

const updateLikes = async ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  try {
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
