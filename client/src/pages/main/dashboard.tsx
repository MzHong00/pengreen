import { type Vote } from "shared/model/vote";

import Pvote from "../../widgets/voteCard/Pvote";
import CreateVoteButton from "features/openForm/createVoteButton";
import { useUserFetch } from "store/queries/auth";
import { useReadVoteByOwnerId } from "store/queries/vote";

export default function Dashboard() {
    const { data: user } = useUserFetch();
    const { data: votes } = useReadVoteByOwnerId(user?._id);

    return (
        <div className="text-xl font-sans font-semibold">
            <section>
                <h2>
                    <span>My Votes</span>
                </h2>
                <div className="flex flex-wrap">
                    <CreateVoteButton />
                    {votes?.map((vote: Vote, idx: number) => <Pvote key={idx} vote={vote} />)}
                </div>
            </section>
            <h2>
                <span>Activity</span>
            </h2>
        </div>
    )
}