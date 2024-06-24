import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { VoteActionChoiceDto } from "..";

export const useReadChoiceCount = ({
  vote_id,
  choiceList,
}: Omit<VoteActionChoiceDto, "user_id">) => {
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

const readChoiceCount = async ({
  vote_id,
  choiceList,
}: Omit<VoteActionChoiceDto, "user_id">) => {
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
