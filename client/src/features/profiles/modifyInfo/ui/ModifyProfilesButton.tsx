import { LuUser2 } from "react-icons/lu";
import { Button } from "shared/ui";

export function ModifyProfilesButton() {

    return (
        <Button
            componentImg={<LuUser2 size="22" />}
            text='프로필 수정'
            btnStyles="px-4" />
    )
}