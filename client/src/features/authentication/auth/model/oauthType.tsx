import { OAuthProvider } from "../../auth/model/types";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import { fetchGoogleForm } from "shared/api";

export const oauthType = (): OAuthProvider[] => {
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