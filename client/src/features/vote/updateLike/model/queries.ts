import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { VoteActionDto } from "entities/vote";

import { readLikes, updateLikes } from "entities/voteLikes";

export const useReadLike = ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  return useQuery({
    queryKey: ["like", user_id, vote_id],
    queryFn: () =>
      readLikes({
        user_id: user_id,
        vote_id: vote_id,
      }),
  });
};

export const useUpdateLike = ({
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
