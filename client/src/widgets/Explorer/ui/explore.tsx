import { sliceVotes, useFetchVotes, useVisibleVoteCount } from "../model/explore";
import { VoteList } from "widgets/voteList";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import styles from './explore.module.css';
import { useSlider } from "shared/hooks/useSlider";
import { SortByButton } from 'features/vote/sortBy';

const widthOfVote = 400

export function Explore() {
    const votes = useFetchVotes();
    const visibleVoteCount = useVisibleVoteCount(widthOfVote);
    const splitedVotes = sliceVotes(votes, visibleVoteCount * 2);
    const { pointer, ref, handler } = useSlider(splitedVotes?.length as number, widthOfVote * visibleVoteCount);

    console.log(votes);
    
    return (
        <section className='relative'>
            <div className='flex items-center justify-center p-1'>
                <SortByButton />
            </div>
            <div ref={ref.containerRef} className={styles.slider}>
                <nav className='flex items-center pl-3'>
                    <div
                        ref={ref.leftArrowRef}
                        className={`${styles.sliderLeftBtn} ${styles.sliderBtn}`}
                        onClick={handler.leftArrowHandler}>
                        <IoIosArrowBack color="white" size={30} />
                    </div>
                    <div
                        ref={ref.rightArrowRef}
                        className={`${styles.sliderRightBtn} ${styles.sliderBtn}`}
                        onClick={handler.rightArrowHandler}>
                        <IoIosArrowForward color="white" size={30} />
                    </div>
                </nav>
                <div>
                    {
                        splitedVotes?.map((votes, idx) => (
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