import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { type VoteActionDto } from "entities/vote";
import {
  readChoiceCount,
  readUserPick,
  updateUserPick,
} from "entities/voteChoice";

export const useReadEachChoiceCount = ({
  vote_id,
  choiceList,
}: Omit<VoteActionDto, "user_id">) => {
  return useQuery({
    queryKey: ["choice", vote_id],
    queryFn: () =>
      readChoiceCount({
        vote_id: vote_id,
        choiceList: choiceList,
      }),
    enabled: !!choiceList,
  });
};

export const useReadMyPick = ({
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

export const useUpdateChoice = ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (selected: Array<string>) =>
      updateUserPick({
        user_id: user_id,
        vote_id: vote_id,
        choiceList: selected,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["choice", vote_id] });
      queryClient.invalidateQueries({ queryKey: ["isParticipant", vote_id] });
      queryClient.invalidateQueries({ queryKey: ["vote", vote_id] });
    },
  });
};
