import { BsFire } from "react-icons/bs";
import { useReadVoteListSortedLikes } from 'entities/vote/participant';
import { useSplitVotes } from "../model/explore";
import { VoteDto } from "widgets/vote";
import { VoteList } from "widgets/voteList";

export default function Explore() {
    const { data: votes } = useReadVoteListSortedLikes();
    const {
        ref, splitedVote, leftArrowHandler, rightArrowHandler
    } = useSplitVotes(votes as VoteDto[]);
    
    return (
        <section className='h-160 relative overflow-hidden'>
            <div className='flex items-center'>
                <BsFire color='red' />
                <span>Hot</span>
                <nav className='flex items-center pl-3'>
                    <div className='absolute w-10 h-20 top-1/2 left-10 transform -translate-y-1/2 bg-black z-10' onClick={leftArrowHandler} />
                    <div className='absolute w-10 h-20 top-1/2 right-10 transform -translate-y-1/2 bg-black z-10' onClick={rightArrowHandler} />
                </nav>
            </div>
            <div className="flex" ref={ref}>
                <VoteList
                    votes={splitedVote.prevVote}
                    className={`absolute left-1/2 -translate-x-[150%] opacity-20`} />
                <VoteList
                    votes={splitedVote.curVote}
                    className="absolute left-1/2 -translate-x-1/2" />
                <VoteList
                    votes={splitedVote.nextVote}
                    className="absolute left-1/2 translate-x-1/2 opacity-20" />
            </div>
        </section>
    )
}