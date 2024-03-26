import { LogoutButton } from "features/authentication/logout"
import { ModifyProfilesButton } from "features/profiles/modifyInfo"
import { ProfilesPicture } from "features/profiles/modifyPicture"

export function ProfilesDetail() {

    return (
        <div className="w-96 h-128 bg-white flex flex-col justify-between items-center p-10 gap-10">
            <ProfilesPicture />
            <ModifyProfilesButton />
            <LogoutButton />
        </div>
    )
}