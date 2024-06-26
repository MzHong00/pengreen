import { IoMdHeart } from "@react-icons/all-files/io/IoMdHeart";
import { IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty";

import { useLikerCheck } from "../lib/likerCheck";
import { type VoteActionLikesDto, useUpdateLikes } from "entities/vote/likes";
import { LoginForm } from "features/authentication/login";
import { useDialog } from "shared/hooks/useDialog";

export function UpdateLike({ user_id, vote_id, liker = [] }: VoteActionLikesDto) {
  const updateHandler = useUpdateLikes({ user_id: user_id, vote_id: vote_id });
  const isAlreadyLiker = useLikerCheck(user_id, liker);
  const [loginForm, openLoginForm] = useDialog(<LoginForm />);

  return (
    <div className="flex items-center">
      {isAlreadyLiker ? (
        <IoMdHeart
          onClick={updateHandler}
          className="cursor-pointer"
          color="red"
        />
      ) : (
        <IoMdHeartEmpty
          onClick={user_id ? updateHandler : openLoginForm}
          className="cursor-pointer"
        />
      )}
      <span>{liker.length}</span>
      {loginForm}
    </div>
  );
}
