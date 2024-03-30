import { BsFire } from "react-icons/bs";
import { useReadVoteListSortedLikes } from 'entities/vote/participant';
import { useSplitVotes } from "../model/explore";
import { Vote, VoteDto } from "widgets/vote";
import { VoteList } from "widgets/voteList";

export default function Explore() {
    const { isPending, data: votes } = useReadVoteListSortedLikes();
    const {
        ref, splitedVote, leftArrowHandler, rightArrowHandler
    } = useSplitVotes(votes as VoteDto[]);

    return (
        <section className='h-160 relative'>
            <div className='flex items-center'>
                <BsFire color='red' />
                <span>Hot</span>
                <nav className='flex items-center pl-3'>
                    <div className='absolute w-10 h-20 top-1/2 left-0 transform -translate-x-full -translate-y-1/2 border bg-black z-10' onClick={leftArrowHandler} />
                    <div className='absolute w-10 h-20 top-1/2 left-[50rem] transform -translate-y-1/2 border bg-black z-10' onClick={rightArrowHandler} />
                </nav>
            </div>
            <div ref={ref} className="flex">
                <VoteList
                    votes={splitedVote.prevVote}
                    className={`absolute duration-1000 opacity-20 transform -translate-x-full`} />
                <VoteList
                    votes={splitedVote.curVote}
                    className="absolute duration-1000 -translate-x-0" />
                <VoteList
                    votes={splitedVote.nextVote}
                    className="absolute duration-1000 opacity-20 transform translate-x-full" />
            </div>
        </section>
    )
}