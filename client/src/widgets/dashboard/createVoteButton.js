import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

import VoteForm from "../form/voteForm";
import Dialog from "../../shared/ui/dialog";

export default function CreateVoteButton() {
    const [openDialog, setOpenDialog] = useState(false);

    const voteForm = () => <VoteForm />

    const openVoteCreator = () => {
        setOpenDialog(true)
    }

    return (
        <div className="flex flex-wrap">
            <div>
                <button
                    onClick={openVoteCreator}
                    className="w-96 h-80 flex flex-col justify-center items-center border-2 border-blue-200 rounded-3xl overflow-hidden p-5 m-3 shadow-lg hover:shadow-inner">
                    <FaPlus size="60" color="rgb(165 243 252)" />
                </button>
            </div>
            {openDialog && <Dialog contentsComponent={voteForm} setModalOpen={setOpenDialog}/>}
        </div>
    )
}