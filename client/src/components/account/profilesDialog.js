import Dialog from "../common/dialog"
import ProfilesCard from "./profilesCard"
import ProfilesMenu from "./profilesMenu"

export default function ProfilesDialog({ setModalOpen }) {

    const contents = () => {

        return (
            <div className="flex flex-col gap-5">
                <ProfilesCard />
                <ProfilesMenu />
            </div>
        )
    }

    return (
        <div>
            <Dialog
                setModalOpen={setModalOpen}
                dialogStyles={`absolute right-4 w-96 bg-gradient-to-b from-cyan-50 to-blue-200`}
                contentsComponent={contents} />
        </div>
    )
}