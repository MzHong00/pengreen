import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

import { useLikerCheck } from "../model/likerCheck";
import { useUpdateLike } from "../model/queries";
import { LoginForm } from "features/authentication/login";
import { useDialog } from "shared/hooks/useDialog";

interface Props {
  userId: string;
  voteId: string;
  likeMember: Array<string> | undefined;
}

export function UpdateLike({ userId, voteId, likeMember = [] }: Props) {
  const isLiker = useLikerCheck(userId, likeMember);
  const updateHandler = useUpdateLike({ user_id: userId, vote_id: voteId });
  const [loginForm, openLoginForm] = useDialog(<LoginForm />);

  return (
    <div className="flex items-center">
      {isLiker ? (
        <IoMdHeart
          onClick={updateHandler}
          className="cursor-pointer"
          color="red"
        />
      ) : (
        <IoMdHeartEmpty
          onClick={userId ? updateHandler : openLoginForm}
          className="cursor-pointer"
        />
      )}
      <span className="text-base">{likeMember.length}</span>
      {loginForm}
    </div>
  );
}
