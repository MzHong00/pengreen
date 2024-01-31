import { useMemo } from "react";

import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import { fetchLogin } from "../../fetch/google-oauth"
import Button from "../common/Button";
import Dialog from "../common/dialog";

export default function LoginModal({ setModalOpen }) {

    const oauth = useMemo(() => [
        {
            name: "구글",
            componentImg: () => <FcGoogle size={'20'} viewBox="0 0 48 48" />,
            handler: async () => {
                const googleAuthUrl = await fetchLogin();
                window.open(googleAuthUrl, "", "width=400, height=600, left=800, top=300, scrollbars=yes");
            },
            tailwind: "border"
        },
        {
            name: "네이버",
            componentImg: () => <SiNaver color="white" size={'20'} viewBox="0 0 26 26"/>,
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

    const contents = () => {
        return (
            <div className="flex flex-col justify-between items-center w-full h-full p-10 gap-10">
                <div>
                    <h1 className="text-4xl">환영합니다</h1>
                </div>
                <div className="grid gap-2">
                    {oauth.map((oauth) =>
                    <Button
                        key={oauth.name}
                        name={oauth.name+"계정으로 로그인"}
                        componentImg={oauth.componentImg}
                        handler={oauth.handler}
                        btnStyles={`w-72 px-7 !justify-start hover:opacity-75 ${oauth.tailwind}`}
                        contentStyles="h-10 flex items-center gap-3"/>)}
                </div>
                <p className="text-sm">로그인하여 다양한 서비스들을 누려보세요!</p>
            </div>
        )
    }

    return (
        <div>
            <Dialog
                contentsComponent={contents}
                setModalOpen={setModalOpen}
                dialogStyles='w-100 h-144 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white'
                outsideStyles='bg-black/60' />
        </div>
    )
}