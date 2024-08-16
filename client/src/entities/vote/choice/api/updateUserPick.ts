import axios from "shared/api/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { VoteDto } from "entities/vote/vote";
import { ChoiceDto } from "../model/types";

export const useUpdateUserPick = (vote_id: VoteDto["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pick: ChoiceDto["content"][]) =>
      updateUserPick(vote_id, pick),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["choice", vote_id] });
      queryClient.invalidateQueries({ queryKey: ["isParticipant", vote_id] });
      queryClient.invalidateQueries({ queryKey: ["voteList"] });
    },
  });
};

const updateUserPick = async (
  vote_id: VoteDto["_id"],
  choiceList: ChoiceDto["content"][]
) => {
  console.log("Pick Update Fetch");
  try {
    const fetchPick = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/vote/update-choice`,
      {
        vote_id: vote_id,
        choiceList: choiceList,
      }
    );

    return fetchPick.data;
  } catch (error) {
    console.log("Pick Update 에러");
  }
};
