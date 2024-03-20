import ProfilesCard from "./profilesCard"
import ProfilesMenu from "./profilesMenu"

export function Profiles() {

    return (
        <div className="w-96 h-128 bg-white flex flex-col justify-between items-center p-10 gap-10">
            <ProfilesCard />
            <ProfilesMenu />
        </div>
    )
}