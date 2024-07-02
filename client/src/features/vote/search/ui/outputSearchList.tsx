import { HTMLAttributes } from "react";

import { VoteDto } from "entities/vote/vote";

interface Props extends HTMLAttributes<HTMLUListElement> {
  list: VoteDto[];
}

export const OutputSearchList = ({ list, ...props }: Props) => {
  return (
    <ul {...props}>
      {list.map((vote) => (
        <li key={vote?._id}>
          <img src={vote.owner.picture} referrerPolicy="no-referrer" />
          <h2>
            <span>{vote.title}</span>
          </h2>
          <p>{vote.description}</p>
        </li>
      ))}
    </ul>
  );
};
