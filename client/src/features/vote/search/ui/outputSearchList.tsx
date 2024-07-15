import { HTMLAttributes } from "react";

import { VoteDto } from "entities/vote/vote";

interface Props extends HTMLAttributes<HTMLDivElement> {
  list: VoteDto[];
}

export const OutputSearchList = ({ list, ...props }: Props) => {
  return (
    <div  {...props}>
      <div >최근 검색어</div>
      <ul>
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
    </div>
  );
};
