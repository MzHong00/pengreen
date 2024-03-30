import { Vote, type VoteDto } from "widgets/vote";
import { FaPlus } from "react-icons/fa6";

import VoteForm from "features/voteForm/generateVote/ui/voteForm/voteForm";
import { useUserFetch } from "features/authentication/login";
import { useDialog } from "shared/hooks/useDialog";
import { useReadVoteListByOwnerId } from "entities/vote/participant";

export default function Dashboard() {
    const { data: user } = useUserFetch();
    const { data: votes } = useReadVoteListByOwnerId(user?._id);
    const [voteForm, openVoteForm] = useDialog(<VoteForm />);

    return (
        <div className="text-xl font-sans font-semibold">
            <section className="h-160">
                <h2 className="flex items-center gap-3">
                    <span>My Votes</span>
                    <FaPlus 
                        color="rgb(171 209 213)"
                        className="border-2 border-blue-200 rounded-lg shadow hover:shadow-inner cursor-pointer"
                        onClick={openVoteForm}/>
                </h2>
                <div className="h-152 grid grid-flow-col grid-rows-voteList">
                    {votes?.map((vote: VoteDto, idx: number) => <Vote key={idx} vote={vote} />)}
                </div>
            </section>
            {voteForm}
            <h2>
                <span>Activity</span>
            </h2>
        </div>
    )
}