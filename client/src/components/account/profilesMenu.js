import { LuLogOut } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";

import { ListButton } from "../common/Button";
import { fetchLogout } from "../../fetch/google-oauth";

export default function ProfilesMenu() {
    const list = [
        {
            icon: () => <LuUser2 size="22" />,
            name: "프로필 수정"
        },
        {
            icon: () => <LuLogOut size="22" />,
            name: "로그아웃",
            handler: fetchLogout
        }
    ]

    return (
        <div className="relative flex flex-col w-full rounded-2xl bg-violet-50 overflow-hidden ">
            {list.map((idx) => {
                return (
                    <ListButton key={idx.name}
                        handler={idx.handler}
                        componentImg={idx.icon}
                        name={idx.name}
                        btnClass="h-12 text-sm"
                        containerClass="px-4 border-b-4 border-purple-200 shadow-inner" />
                )
            })}
        </div>
    )
}