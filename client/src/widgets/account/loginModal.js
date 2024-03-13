import { useMemo } from "react";

import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import Button from "../../shared/ui/button";
import Dialog from "../../shared/ui/dialog";
import { fetchGoogleForm } from "shared/api";

export default function LoginModal({ setModalOpen }) {

    const oauth = useMemo(() => [
        {
            name: "구글",
            componentImg: () => <FcGoogle size={'20'} viewBox="0 0 48 48" />,
            handler: async () => {
                const googleAuthUrl = await fetchGoogleForm();
                window.open(googleAuthUrl, "", "width=400, height=600, left=800, top=300, scrollbars=yes");
            },
            tailwind: "border"
        },
        {
            name: "네이버",
            componentImg: () => <SiNaver color="white" size={'20'} viewBox="0 0 26 26" />,
            handler: async () => { },
            tailwind: "bg-[#03c75a] text-white"
        },
        {
            name: "카카오",
            handler: async () => { },
            componentImg: () => <RiKakaoTalkFill size={'20'} />,
            tailwind: "bg-yellow-300"
        }
    ], [])

    const loginForm = () => {
        return (
            <div className="w-96 h-128 bg-white flex flex-col justify-between items-center w-full h-full p-10 gap-10">
                <h1>
                    <span className="text-4xl">환영합니다</span>
                </h1>
                <div className="grid gap-2">
                    {oauth.map((oauth) =>
                        <Button
                            key={oauth.name}
                            name={oauth.name + "계정으로 로그인"}
                            componentImg={oauth.componentImg}
                            handler={oauth.handler}
                            btnStyles={`w-72 px-7 hover:opacity-75 ${oauth.tailwind}`}
                            contentStyles="h-10 flex items-center gap-3" />)}
                </div>
                <p className="text-sm">로그인하여 다양한 서비스들을 누려보세요!</p>
            </div>
        )
    }

    return (
        <Dialog contentsComponent={loginForm} setModalOpen={setModalOpen} />
    )
}