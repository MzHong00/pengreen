import Dialog from "../common/dialog"
import ProfilesCard from "./profilesCard"
import ProfilesMenu from "./profilesMenu"

export default function ProfilesDialog({setModalOpen, user}) {

    const contents = () => {
        
        return (
            <div className="flex flex-col gap-5">
                <ProfilesCard user={user}/>
                <ProfilesMenu />
            </div>
        )
    }

    return (
        <div>
            <Dialog setModalOpen={setModalOpen} dialogStyle={`absolute right-4 w-96 bg-gradient-to-b from-purple-100 to-purple-200`} contentsComponent={contents}/>
        </div>
    )
}