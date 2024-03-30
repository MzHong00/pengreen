import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import { fetchGoogleForm } from "shared/api";
import { ReactNode } from "react";
import { Button } from "shared/ui";

interface OAuthProvider {
    name: string;
    componentImg: () => ReactNode;
    handler: () => Promise<void>;
    tailwind: string;
}

const oauthType = (): OAuthProvider[] => {
    return ([
        {
            name: "구글",
            componentImg: () => <FcGoogle />,
            handler: async () => {
                const googleAuthUrl = await fetchGoogleForm();
                window.open(googleAuthUrl, "", "width=400, height=600, left=800, top=300, scrollbars=yes");
            },
            tailwind: "border"
        },
        {
            name: "네이버",
            componentImg: () => <SiNaver />,
            handler: async () => { },
            tailwind: "bg-[#03c75a] text-white"
        },
        {
            name: "카카오",
            componentImg: () => <RiKakaoTalkFill />,
            handler: async () => { },
            tailwind: "bg-yellow-300"
        }
    ])
}

export function LoginForm() {
    const oauth = oauthType();

    return (
        <div className="w-96 h-128 p-10 flex flex-col justify-between items-center gap-10">
            <h1>
                <span className="text-4xl">환영합니다</span>
            </h1>
            <div className="grid gap-2">
                {oauth.map((oauth) =>
                    <Button
                        key={oauth.name}
                        text={oauth.name + "계정으로 로그인"}
                        componentImg={oauth.componentImg}
                        handler={oauth.handler}
                        btnStyles={`w-72 px-7 hover:opacity-75 ${oauth.tailwind}`}
                        contentStyles="h-10 flex items-center gap-3" />)}
            </div>
            <p className="text-sm">로그인하여 다양한 서비스들을 누려보세요!</p>
        </div>
    )
}