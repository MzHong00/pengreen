import { HTMLAttributes } from "react";
import { VoteCard } from "widgets/voteCard";
import { VoteDto } from "widgets/voteCard/model/types";

import styles from "./voteCardList.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  votes: VoteDto[];
}

export const VoteCardList = ({ votes = [], className, ...props }: Props) => {
  return (
    <div {...props} className={`${styles.voteList} ${className}`}>
      {votes.map((vote: VoteDto, idx: number) => (
        <VoteCard key={idx} vote={vote} />
      ))}
    </div>
  );
};
