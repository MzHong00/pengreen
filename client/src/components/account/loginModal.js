import { useRef } from "react";

import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import { fetchLogin } from "../../fetch/google-oauth"
import {LoginButton} from "../common/Button";

export default function LoginModal({ setModalOpen }) {
    const modalOutside = useRef();

    const oauth = [
        {
            name: "구글",
            logo: () => <FcGoogle size={'20'} viewBox="0 0 48 48" />,
            handler: async () => {
                const googleAuthUrl = await fetchLogin();
                const googleWindow = window.open(googleAuthUrl, "", "width=400, height=600, left=800, top=300, scrollbars=yes");

                setTimeout(() => {
                    googleWindow.postMessage("Hello", "http://localhost:3000/auth/google/redirect");
                }, 1000)
            },
            tailwind: "border"
        },
        {
            name: "네이버",
            logo: () => <SiNaver color="white" />,
            handler: async () => { },
            tailwind: "bg-[#03c75a] text-white"
        },
        {
            name: "카카오",
            handler: async () => { },
            logo: () => <RiKakaoTalkFill size={'20'} />,
            tailwind: "bg-yellow-300"
        }
    ]

    const closeIcon = () => <IoMdClose size={`30`} />

    const clickModalOutside = (e) => {
        //모달창 영역 밖을 클릭하면 모달창을 닫는 핸들러
        e.target === modalOutside.current && (setModalOpen(false))
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div onClick={clickModalOutside} ref={modalOutside} className="top-0 left-0 fixed flex items-center justify-center w-full h-full bg-black/60">
            <div className="flex flex-col items-center p-5 w-112 h-160 bg-white shadow-lg rounded-3xl overflow-hidden gap-10">
                <LoginButton logo={closeIcon} handler={closeModal} btnClass={'!justify-end'} containerClass={'!justify-end'} />
                <div className="flex flex-col justify-between items-center w-full h-full ">
                    <div>
                        <h1 className="text-4xl">환영합니다</h1>
                    </div>
                    <div className="grid gap-2">
                        {oauth.map((oauth) => <LoginButton key={oauth.name} {...oauth} btnClass={`w-72 hover:opacity-90 ${oauth.tailwind}`} />)}
                    </div>
                    <p className="text-sm">로그인하여 다양한 서비스들을 누려보세요!</p>
                </div>
            </div>
        </div>
    )
}