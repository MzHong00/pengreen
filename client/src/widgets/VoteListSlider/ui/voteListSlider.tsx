import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useReadVote } from "entities/vote/vote";
import { useCalcVotePerPage } from "../model/useCalcVotePerPage";
import { PaginationSlider } from "features/vote/pagination";
import { VoteCardList } from "widgets/voteCard";

import styles from "./voteListSlider.module.css";

const VOTE_MAX_WIDTH = 550;

export const VoteListSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const votePerPage = useCalcVotePerPage(VOTE_MAX_WIDTH);

  const { data: preVote = [], refetch: preLoad } = useReadVote(
    votePerPage,
    page - 1
  );
  const { data: curVote = [], refetch: curLoad } = useReadVote(
    votePerPage,
    page
  );
  const { data: nxtVote = [], refetch: nxtLoad } = useReadVote(
    votePerPage,
    page + 1
  );

  const leftArrowHandler = () => {
    setPage((prev) => prev - 1);
  };

  const rightArrowHandler = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    preLoad();
    curLoad();
    nxtLoad();
  }, [votePerPage, preLoad, curLoad, nxtLoad]);

  useLayoutEffect(() => {
    if (page < 1) setPage(1);
  }, [page, setPage]);

  return (
    <div className={styles.sliderContainer}>
      <PaginationSlider
        page={page}
        setPage={setPage}
        leftSlideHandler={leftArrowHandler}
        rightSlideHandler={rightArrowHandler}
        isShowLeftArrow={preVote?.length !== 0}
        isShowRightArrow={nxtVote?.length !== 0}
      />

      <div ref={sliderRef} className={styles.sliderContent}>
        {preVote?.length !== 0 && (
          <VoteCardList
            voteList={preVote}
            onClick={leftArrowHandler}
            className={`${styles.voteList} ${styles.inActiveList} ${styles.prevList}`}
          />
        )}

        <VoteCardList voteList={curVote} className={styles.voteList} />
        
        {nxtVote?.length !== 0 && (
          <VoteCardList
            voteList={nxtVote}
            onClick={rightArrowHandler}
            className={`${styles.voteList} ${styles.inActiveList} ${styles.nextList}`}
          />
        )}
      </div>
    </div>
  );
};
