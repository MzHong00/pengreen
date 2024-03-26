import { Vote, type VoteDto } from "widgets/vote";
import { FaPlus } from "react-icons/fa6";

import VoteForm from "features/voteForm/generateVote/ui/voteForm/voteForm";
import { useUserFetch } from "features/authentication/login";
import { useDialog } from "shared/hooks/useDialog";
import { useReadVoteListByOwnerId } from "widgets/voteList";

export default function Dashboard() {
    const { data: user } = useUserFetch();
    const { data: votes } = useReadVoteListByOwnerId(user?._id);
    const [voteForm, openVoteForm] = useDialog(VoteForm);

    return (
        <div className="text-xl font-sans font-semibold">
            <section>
                <h2>
                    <span>My Votes</span>
                </h2>
                <div className="flex flex-wrap">
                    <div className="flex flex-wrap">
                        <button
                            onClick={openVoteForm}
                            className="w-96 h-80 flex flex-col justify-center items-center border-2 border-blue-200 rounded-3xl overflow-hidden p-5 m-3 shadow-lg hover:shadow-inner">
                            <FaPlus size="60" color="rgb(165 243 252)" />
                        </button>
                        {voteForm}
                    </div>
                    {votes?.map((vote: VoteDto, idx: number) => <Vote key={idx} vote={vote} />)}
                </div>
            </section>
            <h2>
                <span>Activity</span>
            </h2>
        </div>
    )
}