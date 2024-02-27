import { useContext, useEffect, useState } from 'react';

import { BsFire } from "react-icons/bs";

import { UserContext } from '../../domain/pengreen';
import { getVote_seqLikes } from '../../fetch/vote';

import Pvote from '../common/Pvote';

export default function Home() {
    const { user } = useContext(UserContext);
    const [votes, setVotes] = useState();

    useEffect(() => {
        const fetchVotes = async () => {
            const seqLikesVote = await getVote_seqLikes();
            setVotes(seqLikesVote);
        }

        fetchVotes();
    }, []);

    return (
        <div className="text-xl font-sans font-semibold">
            <section>
                <h2 className='flex items-center'>
                    <BsFire color='red' />
                    <span>Hot</span>
                </h2>
                    <div className='grid grid-flow-col grid-rows-2'>
                        {
                            votes && user && votes.map((vote, idx) =>
                                <Pvote key={idx} user_id={user.id} profiles_picture={user.picture} vote={vote} />)
                        }
                    </div>
            </section>
        </div>
    )
}