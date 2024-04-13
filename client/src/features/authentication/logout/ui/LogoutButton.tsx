import { LuLogOut } from "react-icons/lu";
import { fetchLogout } from "shared/api";
import { Button } from "shared/ui";

export const LogoutButton = () => {
    
    return (
        <Button
            handler={fetchLogout}
            componentImg={<LuLogOut size={22}/>}
            text='로그아웃'
            btnStyles="px-4" />
    )
}