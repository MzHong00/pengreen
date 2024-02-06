import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

import VoteForm from "./voteForm";
import Dialog from '../common/dialog'

export default function NewVote() {
    const [openDialog, setOpenDialog] = useState(false);
    const [items, setItems] = useState([]);

    const createVote = () => {
        setOpenDialog(true)
    }

    const voteForm = () => <VoteForm items={items} setItems={setItems}/>

    return (
        <div className="flex flex-wrap">
            <div>
                <button
                    onClick={createVote} 
                    className="w-80 h-60 flex flex-col justify-center items-center bg-gradient-to-br from-cyan-100 to-blue-200 rounded-3xl overflow-hidden p-5 m-3 shadow-lg">
                    <div>
                        <FaPlus size="60" color="white" />
                    </div>
                </button>
            </div>
            {
                openDialog && 
                <Dialog 
                    contentsComponent={voteForm} 
                    setModalOpen={setOpenDialog}
                    dialogStyles={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !p-0`}
                    outsideStyles={'bg-black/40'}/>
            }
        </div>
    )
}