import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { VoteActionDto } from "entities/vote";

//미사용 중
export const useReadLikes = ({
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

const readLikes = async ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  try {
    const fetchLike = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/vote/read-like`,
      {
        user_id: user_id,
        vote_id: vote_id,
      }
    );

    const { likesCount, isLiker } = fetchLike.data;

    console.log("좋아요 읽기 Fetch");

    return { likesCount, isLiker };
  } catch (error) {
    console.log("좋아요 여부 처리 에러");
  }
};
