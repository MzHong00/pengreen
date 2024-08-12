import axios from "shared/api/base";
import { useQuery } from "@tanstack/react-query";

import { VoteDto } from "entities/vote/vote";
import { ChoiceDto } from "..";

export const useReadChoiceCount = (
  vote_id: VoteDto["_id"],
  choiceList: ChoiceDto["content"][]
) => {
  return useQuery({
    queryKey: ["choice", vote_id],
    queryFn: () => readChoiceCount(vote_id, choiceList),
    enabled: !!choiceList,
  });
};

const readChoiceCount = async (
  vote_id: VoteDto["_id"],
  choiceList: ChoiceDto["content"][]
) => {
  console.log("Pick 개수 Fetch");
  try {
    const choiceCount = await axios.put(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read-choice-count`,
      {
        vote_id: vote_id,
        choiceList: choiceList,
      }
    );

    return choiceCount.data;
  } catch (error) {
    console.log("Pick 개수 가져오기 에러");
  }
};
