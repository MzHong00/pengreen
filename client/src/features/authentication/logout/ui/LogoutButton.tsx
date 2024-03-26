import { LuLogOut } from "react-icons/lu";
import { fetchLogout } from "shared/api";
import { Button } from "shared/ui";

export const LogoutButton = () => {
    const logoutIcon = () => <LuLogOut size={22}/>

    return (
        <Button
            handler={fetchLogout}
            componentImg={logoutIcon}
            text='로그아웃'
            btnStyles="px-4" />
    )
}