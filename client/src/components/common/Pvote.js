import { useState } from "react";

import { AiOutlineLike } from "react-icons/ai";

import Button from './button'
import Pchoice from './Pchoice';
import Dialog from "./dialog";
import PvoteDetail from "./PvoteDetail";

export default function Pvote({ profiles_picture, vote }) {
    const [openModal, setOpenModal] = useState(false);

    const voteDetail = () => <PvoteDetail {...{ profiles_picture, vote }} />

    const openModalHandler = () => {
        setOpenModal(true);
    }

    return (
        <div className="w-96 h-80 flex flex-col justify-between bg-gradient-to-br from-cyan-100 to-blue-200 rounded-3xl overflow-hidden p-5 m-3 shadow-lg">
            <section className="flex justify-between gap-2">
                <div className='w-[85%] flex items-center'>
                    <img src={profiles_picture} alt="프로필 사진" className="w-8 h-8 mr-3 rounded-full" />
                    <h1 className='truncate'>{vote.title}</h1>
                </div>
                <div className='flex items-center'>
                    <AiOutlineLike className='cursor-pointer' />
                    <span className='text-base'>{vote.likes}</span>
                </div>
            </section>
            <section className='h-48 max-h-48'>
                <div className='h-full'>
                    <Pchoice choice={vote.choice} max_choice={vote.max_choice} type='submit' />
                </div>
            </section>
            <section>
                <Button name={"상세보기"} btnStyles='w-full py-1 shadow bg-sky-100 hover:shadow-inner' handler={openModalHandler} />
            </section>
            {openModal && <Dialog contentsComponent={voteDetail} setModalOpen={setOpenModal} />}
        </div>
    )
}