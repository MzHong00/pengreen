import { useEffect, useMemo, useRef } from "react";

import { useReadVote } from "entities/vote/vote";
import { useCalcVotePerPage } from "../model/useCalcVotePerPage";
import { splitVoteList } from "../model/splitVoteList";
import { usePagination, PaginationSlider } from "features/vote/pagination";
import { VoteCardList } from "widgets/voteCard";

import styles from "./voteListSlider.module.css";

const VOTE_WIDTH = 550;

export const VoteListSlider = () => {
  const [pageNumber, setPageNumber] = usePagination();
  const votePerPage = useCalcVotePerPage(VOTE_WIDTH);
  const { data: voteList, refetch } = useReadVote(votePerPage);

  const sliderRef = useRef<HTMLDivElement>(null);
  const splitedVoteList = useMemo(
    () => splitVoteList(voteList, votePerPage),
    [voteList, votePerPage]
  );
  
  const leftArrowHandler = () => {
    setPageNumber((prev) => prev - 1);
  };

  const rightArrowHandler = () => {
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    refetch();
  }, [votePerPage, refetch]);

  return (
    <div>
      <PaginationSlider
        pageNumber={pageNumber}
        leftSlideHandler={leftArrowHandler}
        rightSlideHandler={rightArrowHandler}
      />
      <div ref={sliderRef} className={styles.sliderContent}>
        {splitedVoteList?.map((voteList, idx) => (
          <VoteCardList
            key={idx}
            voteList={voteList}
            className={`${styles.voteList} ${idx !== 1 && 'opacity-20'}`}
          />
        ))}
      </div>
    </div>
  );
};
