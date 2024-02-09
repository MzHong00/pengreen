import { useState } from "react";

import { FaPlus } from "react-icons/fa6";
import PvoteCreator from "../common/PvoteCreator";

export default function CreateVoteButton() {
    const [openDialog, setOpenDialog] = useState(false);

    const openVoteCreator = () => {
        setOpenDialog(true)
    }

    return (
        <div className="flex flex-wrap">
            <div>
                <button
                    onClick={openVoteCreator}
                    className="w-80 h-60 flex flex-col justify-center items-center bg-gradient-to-br from-cyan-100 to-blue-200 rounded-3xl overflow-hidden p-5 m-3 shadow-lg">
                    <FaPlus size="60" color="white" />
                </button>
            </div>
            { openDialog && <PvoteCreator setModalOpen={setOpenDialog}/> }
        </div>
    )
}