import { useState, type MouseEvent } from "react";

import { FaUser } from "react-icons/fa";

import Button from '../../shared/common/button'
import PvoteDetail from "../voteDetail/PvoteDetail";
import Pchoice from "../../features/choice/Pchoice";
import PnumberChart from "../../entities/chart/numChart";

import { UpdateLike } from "features/updateLike";
import { useUserFetch } from "store/queries/auth";
import { useDialog } from "shared/hooks/useDialog";
import { Vote } from "shared/model/vote";

interface Props {
    vote: Vote
}

export default function Pvote({
    vote
}: Props) {
    const addPropsToDetail = () => <PvoteDetail profiles_picture={vote.owner.picture} title={vote.title} choice={vote.choice} />

    const { data: user } = useUserFetch();
    const [voteDetail, openVoteDetail] = useDialog(addPropsToDetail);


    const [hover, setHover] = useState(false);
    const hoverHandler = (e: MouseEvent<HTMLElement>) => {
        e.type === 'mouseenter' ? setHover(true) : setHover(false);
    }


    return (
        <div
            className="flex flex-col w-96 h-64 p-5 m-2 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl overflow-hidden shadow-lg gap-2 hover:h-72 duration-300"
            onMouseEnter={hoverHandler}
            onMouseLeave={hoverHandler}>
            <section className="flex justify-between gap-2">
                <div className='w-[85%] flex items-center'>
                    <img src={vote.owner.picture} alt="프로필 사진" className="w-8 h-8 mr-3 rounded-full" />
                    <h1 className='truncate'>{vote.title}</h1>
                </div>
            </section>
            <section>
                {/* {
                    user ?
                        <Pchoice user={user} choice={vote.choice} max_choice={vote.max_choice} /> :
                        <PnumberChart data={vote.choice} />
                } */}
            </section>
            <section>
                {
                    user && hover &&
                    <div className="flex justify-between">
                        {/* <UpdateLike userId={user._id} voteId={vote._id} /> */}
                        <div className="flex items-center gap-3">

                            <div className="flex items-center">
                                <FaUser size={15} />
                                {/* <span>{vote.participant}</span> */}
                            </div>
                        </div>
                        <Button name={"자세히"} btnStyles='p-1 px-2 shadow bg-sky-100 hover:shadow-inner' contentStyles="text-xs font-sans" handler={openVoteDetail} />
                        {voteDetail}
                    </div>
                }
            </section>
        </div>
    )
}