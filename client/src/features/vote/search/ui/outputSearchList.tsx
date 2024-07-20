import { HTMLAttributes } from "react";

import { VoteDto } from "entities/vote/vote";

import styles from './search.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  list: VoteDto[];
}

export const OutputSearchList = ({ list, ...props }: Props) => {
  return (
    <div {...props}>
      <h2 className={styles.subTitle}>최근 검색어</h2>
      <ul>
        {list.map((vote) => (
          <li key={vote?._id}>
            <img src={vote.owner.picture} alt="" referrerPolicy="no-referrer" />
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
