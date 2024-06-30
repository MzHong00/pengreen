import { HTMLAttributes } from "react";

import { type User } from "entities/user";
import { type VoteDto, createVote } from "entities/vote/vote";
import { useGlobalStore } from "shared/stores/useStore";

import styles from "./publicVoteForm.module.css";

interface Props extends HTMLAttributes<HTMLInputElement> {
  user: User;
}

export const PublicVoteForm = ({ user, ...props }: Props) => {
  const voteData = useGlobalStore((state) => state.formData);

  const submitHandler = () => {
    createVote({
      owner: user,
      ...voteData,
    } as VoteDto);
  };

  return (
    <input
      type="button"
      value="생성하기"
      onClick={submitHandler}
      className={styles.container}
      {...props}
    />
  );
};
