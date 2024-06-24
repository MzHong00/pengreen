import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import {
  sliceVotes,
  useFetchVotes,
  useVisibleVoteCount,
} from "../model/explore";
import { VoteCardList } from "widgets/VoteCardList";
import { useSlider } from "shared/hooks/useSlider";

import styles from './voteListSlider.module.css'

const widthOfVote = 400;

export const VoteListSlider = () => {

    const votes = useFetchVotes();
    const visibleVoteCount = useVisibleVoteCount(widthOfVote);
    const splitedVoteGroup = sliceVotes(votes, visibleVoteCount * 2);
    const { pointer, ref, handler } = useSlider(
      splitedVoteGroup?.length as number,
      widthOfVote * visibleVoteCount
    );

    return (
        <div ref={ref.containerRef} className={styles.sliderCotainer}>
        <nav className={styles.arrowButtonContainer}>
          <div
            ref={ref.leftArrowRef}
            className={`${styles.sliderLeftBtn} ${styles.sliderBtn}`}
            onClick={handler.leftArrowHandler}
          >
            <IoIosArrowBack color="white" size={30} />
          </div>
          <div
            ref={ref.rightArrowRef}
            className={`${styles.sliderRightBtn} ${styles.sliderBtn}`}
            onClick={handler.rightArrowHandler}
          >
            <IoIosArrowForward color="white" size={30} />
          </div>
        </nav>
        <div>
          {splitedVoteGroup?.map((votes, idx) => (
            <VoteCardList
              key={idx}
              votes={votes}
              className={`${idx !== pointer && "opacity-20"} ${styles.voteList}`}
              onClick={handler.translateElePosHandler}
              onMouseEnter={handler.arrowActiveHandler}
              onMouseLeave={handler.arrowInActiveHandler}
            />
          ))}
          <div className={styles.whiteSpace} />
        </div>
      </div>
    )
}