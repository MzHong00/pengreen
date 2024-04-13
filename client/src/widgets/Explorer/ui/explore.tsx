import { splitVotes, useResizeConfig } from "../model/explore";
import { VoteDto } from "widgets/vote";
import { VoteList } from "widgets/voteList";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import styles from './explore.module.css';
import { useSlider } from "shared/hooks/useSlider";
import { SortByButton } from 'features/vote/sortBy';
import { useReadVoteListSortedLikes } from "features/vote/sortBy/model/queries";

export function Explore() {
    const { data: votes } = useReadVoteListSortedLikes();
    const splitInterval = useResizeConfig(400);
    const { splitedVote } = splitVotes(votes as VoteDto[], splitInterval * 2);
    const { pointer, ref, handler } = useSlider(splitedVote?.length as number, 400 * splitInterval);
    
    return (
        <section className='relative'>
            <div className='flex items-center justify-center p-1'>
                <SortByButton />
            </div>
            <div ref={ref.containerRef} className={styles.slider}>
                <nav className='flex items-center pl-3'>
                    <div ref={ref.leftArrowRef} className={`${styles.sliderLeftBtn} ${styles.sliderBtn}`}>
                        <IoIosArrowBack color="white" size={30} />
                    </div>
                    <div ref={ref.rightArrowRef} className={`${styles.sliderRightBtn} ${styles.sliderBtn}`}>
                        <IoIosArrowForward color="white" size={30} />
                    </div>
                </nav>
                <div>
                    {
                        splitedVote?.map((votes, idx) => (
                            <VoteList
                                key={idx}
                                votes={votes}
                                className={`${idx !== pointer && 'opacity-20'} h-160 grid grid-flow-col grid-rows-2 hover:opacity-100 duration-500`}
                                onClick={handler.translateElePosHandler}
                                onMouseEnter={handler.arrowActiveHandler}
                                onMouseLeave={handler.arrowInActiveHandler} />
                        ))
                    }
                    <div className={styles.whiteSpace} />
                </div>
            </div>
        </section>
    )
}