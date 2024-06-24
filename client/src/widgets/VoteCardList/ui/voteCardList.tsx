import { HTMLAttributes } from "react";

import { type VoteDto } from "entities/vote";
import { VoteCard } from "widgets/voteCard";

interface Props extends HTMLAttributes<HTMLDivElement> {
  votes: VoteDto[] | undefined;
}

export const VoteCardList = ({ votes = [], className, ...props }: Props) => {
  return (
    <div {...props} className={`${className}`}>
      {votes.map((vote: VoteDto, idx: number) => (
        <VoteCard key={idx} vote={vote} />
      ))}
    </div>
  );
};
