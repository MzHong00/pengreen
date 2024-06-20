import axios from "axios";
import { VoteActionDto } from "entities/vote";

export const updateUserPick = async ({
  user_id,
  vote_id,
  choiceList,
}: VoteActionDto) => {
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
