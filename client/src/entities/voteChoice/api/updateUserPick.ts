import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type VoteActionChoiceDto } from "..";
import { type VoteActionDto } from "entities/vote";

export const useUpdateUserPick = ({
  user_id,
  vote_id,
}: VoteActionDto) => {
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

const updateUserPick = async ({
  user_id,
  vote_id,
  choiceList,
}: VoteActionChoiceDto) => {
  console.log("Pick Update Fetch");
  try {
    const fetchPick = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/vote/update-choice`,
      {
        user_id: user_id,
        vote_id: vote_id,
        choiceList: choiceList,
      }
    );

    return fetchPick.data;
  } catch (error) {
    console.log("Pick Update 에러");
  }
};
