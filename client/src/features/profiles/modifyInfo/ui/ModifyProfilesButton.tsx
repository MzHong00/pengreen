import { LuUser2 } from "react-icons/lu";
import { Button } from "shared/ui";

export function ModifyProfilesButton() {
    const modifyProfilesIcon = () => <LuUser2 size="22" />

    return (
        <Button
            componentImg={modifyProfilesIcon}
            text='프로필 수정'
            btnStyles="px-4" />
    )
}