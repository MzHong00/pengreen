import { useState, useEffect, useContext } from "react";

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { UserContext } from '../../domain/pengreen';

import Button from './button'
import Dialog from "./dialog";
import PvoteDetail from "./PvoteDetail";
import PchoiceForm from "./PchoiceForm";
import PnumberChart from "./PnumberChart";

import { fetchLikes, fetchLikes_checked } from "../../fetch/likes";
import { getVoteOwner } from "../../fetch/vote";
import { getChoiceOfVote } from "../../fetch/choice";

export default function Pvote({ vote }) {
    const [openModal, setOpenModal] = useState(false);
    const { user } = useContext(UserContext);

    const [like, setLike] = useState(vote.likes);
    const [likeChecked, setLikeChecked] = useState();
    const [choice, setChoice] = useState();
    const [owner, setOwner] = useState();

    const voteDetail = () => <PvoteDetail title={vote.title} profiles_picture={owner.picture} choice={choice} />

    useEffect(() => {
        const fetchUser = async () => {
            //로그인 중인 사용자가 해당 투표의 좋아요를 눌렀는지 확인
            const isChecked = await fetchLikes_checked(user.id, vote.id);

            setLikeChecked(isChecked);
        }

        user && fetchUser();
    }, [user, vote]);

    useEffect(() => {
        const fetchVote = async () => {
            //해당 투표의 소유자 정보 가져오기
            const owner_info = await getVoteOwner(vote.id);
            //해당 투표의 항목 가져오기
            const choice = await getChoiceOfVote(vote.id);

            setOwner(owner_info);
            setChoice(choice);
        };

        fetchVote();
    }, [vote]);

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const likesHandler = async () => {
        if(!user) {
            console.log("로그인을 해달라는 모달창 표시 or 로그인 모달창 열기");
            return;
        }

        const { checked, like_count } = await fetchLikes(user.id, vote.id);
        setLikeChecked(checked);
        setLike(like_count);
    }

    return (
        <div className="w-96 h-80 flex flex-col justify-between bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl overflow-hidden p-5 m-2 shadow-lg gap-3">
            <section className="flex justify-between gap-2">
                <div className='w-[85%] flex items-center'>
                    {owner && <img src={owner.picture} alt="프로필 사진" className="w-8 h-8 mr-3 rounded-full" />}
                    <h1 className='truncate'>{vote.title}</h1>
                </div>
                <div className='flex items-center'>
                    {
                        likeChecked ?
                            <AiFillLike onClick={likesHandler} className='cursor-pointer' /> :
                            <AiOutlineLike onClick={likesHandler} className='cursor-pointer' />
                    }
                    <span className='text-base'>{like}</span>
                </div>
            </section>
            <section className="h-[60%]">
                    {
                        user ?
                        <PchoiceForm user_id={user.id} vote_id={vote.id} max_choice={vote.max_choice} choice={choice} setChoice={setChoice} /> :
                        <PnumberChart data={choice}/>
                    }
            </section>
            <section>
                <Button name={"상세보기"} btnStyles='w-full py-1 shadow bg-sky-100 hover:shadow-inner' handler={openModalHandler} />
            </section>
            {openModal && <Dialog contentsComponent={voteDetail} setModalOpen={setOpenModal} />}
        </div>
    )
}