import { useEffect, useRef, useState } from 'react';

import { BsFire } from "react-icons/bs";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

import { getVote_sortByLikes, getVote_sortByParticipant } from '../../fetch/vote';

import Pvote from '../common/Pvote';

export default function Explore() {
    const [votes, setVotes] = useState();
    const ref = useRef();

    useEffect(() => {
        const fetchVotes = async () => {
            const seqLikesVote = await getVote_sortByParticipant();
            setVotes(seqLikesVote);
        }

        fetchVotes();
    }, []);

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
            <div ref={ref} className='h-[43rem] flex flex-col flex-wrap overflow-auto scroll-smooth'>
                { votes && votes.map((vote, idx) => <Pvote key={idx} vote={vote} />) }
            </div>
        </section>
    )
}