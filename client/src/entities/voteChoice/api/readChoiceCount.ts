import axios from "axios";

import { VoteActionDto } from "entities/vote";

export const readChoiceCount = async ({
  vote_id,
  choiceList,
}: Omit<VoteActionDto, 'user_id'>) => {
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
