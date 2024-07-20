import { useRef } from "react";

import { useSplitVoteList } from "../model/useSplitVoteList";
import { useReadVote } from "entities/vote/vote";
import { usePagination, SliderPagination } from "features/vote/pagination";
import { VoteCardList } from "widgets/voteCard";

import styles from "./voteListSlider.module.css";

const VOTE_WIDTH = 400;

export const VoteListSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data: sortedVotes } = useReadVote();
  const [pageNumber, setPageNumber] = usePagination();
  const [splitedVoteList, votePerPage] = useSplitVoteList(
    sortedVotes,
    VOTE_WIDTH
  );

  const slideHandler = (e: React.MouseEvent<HTMLElement>) => {
    const elePosX = e.currentTarget.offsetLeft;
    setPageNumber(elePosX / ((VOTE_WIDTH * votePerPage) / 2));
  };

  if (sliderRef.current) {
    const sliderWidth = VOTE_WIDTH * (votePerPage / 2);
    sliderRef.current.scrollLeft = pageNumber * sliderWidth;
  }

  return (
    <div ref={sliderRef} className={styles.sliderCotainer}>
      <SliderPagination setPage={setPageNumber} />
      <div>
        {splitedVoteList?.map((voteList, idx) => (
          <VoteCardList
            key={idx}
            voteList={voteList}
            className={`${idx !== pageNumber && "opacity-20"} ${
              styles.voteList
            }`}
            onClick={slideHandler}
          />
        ))}
        <div className={styles.whiteSpace} />
      </div>
    </div>
  );
};
