import { Vote } from 'widgets/vote';
import { useRef } from 'react';

import { BsFire } from "react-icons/bs";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { useReadVoteListSortedLikes } from 'widgets/voteList';

export default function Explore() {
    const { isPending, data } = useReadVoteListSortedLikes();
    const ref = useRef<any>();

    const rightArrowHandler = () => {
        ref.current.scrollLeft += 400 * 2;
    }
    const leftArrowHandler = () => {
        ref.current.scrollLeft -= 400 * 2;
    }

    return (
        <section>
            <h2>
                <div className='flex items-center'>
                    <BsFire color='red' />
                    <span>Hot</span>
                </div>
                <nav className='flex items-center'>
                    <IoIosArrowDropleft size="30px" onClick={leftArrowHandler} />
                    <IoIosArrowDropright size="30px" onClick={rightArrowHandler} />
                </nav>
            </h2>
            <div ref={ref} className='h-152 flex flex-col flex-wrap justify-between overflow-auto scroll-smooth'>
                {!isPending && data?.map((vote, idx) => <Vote key={idx} vote={vote} />)}
            </div>
        </section>
    )
}