import { FaPlus } from "react-icons/fa6";

import { useDialog } from "shared/hooks/useDialog";
import VoteForm from "features/form/voteForm";

export default function CreateVoteButton() {
    const [voteForm, openVoteForm] = useDialog(VoteForm);

    return (
        <div className="flex flex-wrap">
            <div>
                <button
                    onClick={openVoteForm}
                    className="w-96 h-80 flex flex-col justify-center items-center border-2 border-blue-200 rounded-3xl overflow-hidden p-5 m-3 shadow-lg hover:shadow-inner">
                    <FaPlus size="60" color="rgb(165 243 252)" />
                </button>
            </div>
            {voteForm}
        </div>
    )
}