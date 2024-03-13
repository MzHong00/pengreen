import { useState, useEffect, useContext } from "react";

import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { UserContext } from '../../pages/main';
import { FaUser } from "react-icons/fa";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Button from '../../shared/ui/button'
import Dialog from "../../shared/ui/dialog";
import PvoteDetail from "../detail/PvoteDetail";
import Pchoice from "../choice/Pchoice";
import PnumberChart from "../../entities/chart/numChart";

import { fetchLikes_checked, fetchLikes_update } from "../../shared/api/likes";
import { getOwnerOfVote, getVoteById } from "../../shared/api/vote";
import { getChoiceOfVote } from "../../shared/api/choice";

export default function Pvote({ vote, vote_id }) {
    const { user } = useContext(UserContext);
    const queryClient = useQueryClient()

    
    const likesUpdate = useMutation({
        mutationFn: fetchLikes_update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['votes'] })
        }
    })

    const [pvote, setPvote] = useState({});
    const [choice, setChoice] = useState();

    const [owner, setOwner] = useState();
    const [likeChecked, setLikeChecked] = useState();

    const [openModal, setOpenModal] = useState(false);
    const [hover, setHover] = useState(false);
    const voteDetail = () => <PvoteDetail title={pvote.title} profiles_picture={owner.picture} choice={choice} />

    useEffect(() => {
        const fetchData = async () => {
            const owner = await getOwnerOfVote(vote_id);
            const isChecked = await fetchLikes_checked(user.id, vote_id);

            setOwner(owner);
            setLikeChecked(isChecked);
        };

        user && fetchData();
    }, [user, vote_id]);

    useEffect(() => {
        const fetchData = async () => {
            const vote = await getVoteById(vote_id);
            const choice = await getChoiceOfVote(vote_id);

            setPvote(vote);
            setChoice(choice);
        }

        fetchData();
    }, [vote_id, pvote.likes]);

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const likesHandler = async () => {
        if (!user) {
            console.log("로그인을 해달라는 모달창 표시 or 로그인 모달창 열기");
            return;
        }

        likesUpdate.mutate({
            user_id: user.id,
            vote_id: vote_id
        })
    }

    const hoverHandler = (e) => {
        e.type === 'mouseenter' ? setHover(true) : setHover(false);
    }

    return (
        <div
            className="flex flex-col w-96 h-64 p-5 m-2 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl overflow-hidden shadow-lg gap-2 hover:h-72 duration-300"
            onMouseEnter={hoverHandler}
            onMouseLeave={hoverHandler}>
            <section className="flex justify-between gap-2">
                <div className='w-[85%] flex items-center'>
                    {owner && <img src={owner.picture} alt="프로필 사진" className="w-8 h-8 mr-3 rounded-full" />}
                    <h1 className='truncate'>{vote.title}</h1>
                </div>
            </section>
            <section>
                {
                    user ?
                        <Pchoice user={user} vote_id={vote.id} max_choice={vote.max_choice} choice={choice} setChoice={setChoice} /> :
                        <PnumberChart data={choice} />
                }
            </section>
            <section>
                {
                    hover &&
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                            <div className='flex items-center'>
                                {
                                    likeChecked ?
                                        <IoMdHeart onClick={likesHandler} className='cursor-pointer' /> :
                                        <IoMdHeartEmpty onClick={likesHandler} className='cursor-pointer' />
                                }
                                <span className='text-base'>{vote.likes}</span>
                            </div>
                            <div className="flex items-center">
                                <FaUser size={15} />
                                <span>{vote.participants}</span>
                            </div>
                        </div>
                        <Button name={"자세히"} btnStyles='p-1 px-2 shadow bg-sky-100 hover:shadow-inner' contentStyles="text-xs font-sans" handler={openModalHandler} />
                    </div>
                }
            </section>
            {openModal && <Dialog contentsComponent={voteDetail} setModalOpen={setOpenModal} />}
        </div>
    )
}