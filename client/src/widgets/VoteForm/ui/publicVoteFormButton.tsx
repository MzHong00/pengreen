import { type User } from "entities/user";
import { type VoteDto, createVote } from "entities/vote";
import { HTMLAttributes } from "react";
import { useGlobalStore } from "shared/stores/useStore";

interface Props extends HTMLAttributes<HTMLInputElement> {
  user: User;
}

export const PublicVoteFormButton = ({ user, ...props }: Props) => {
  const voteData = useGlobalStore((state) => state.formData);

  const submitHandler = () => {
    createVote({
      owner: user,
      ...voteData,
    } as VoteDto);
  };

  return (
    <input
      {...props}
      type="button"
      value="게시"
      onClick={submitHandler}
      className={`w-12 h-10 flex justify-center items-center bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl shadow-lg cursor-pointer hover:shadow-inner text-sm`}
    />
  );
};
