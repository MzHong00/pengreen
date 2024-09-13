import { HTMLAttributes } from "react";

import { type User } from "entities/user";
import { type VoteDto } from "entities/vote/vote";
import { NumChart } from "shared/ui/Chart/numChart";

import styles from "./voteCover.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  picture?: User["picture"];
  choice?: VoteDto["choice"];
}

export const VoteCover = ({ picture, choice, className, ...props }: Props) => {
  return (
    <div {...props} className={`${styles.voteCover} ${className}`}>
      <img src={picture} alt="썸네일" />
      <div className={`${styles.content}`}>
        <NumChart data={choice} className={styles.choice} />
      </div>
    </div>
  );
};
