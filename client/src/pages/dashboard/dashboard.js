import { useEffect, useState } from "react";

import CreateVoteButton from "../../features/vote/openForm/createVoteButton";
import Pvote from "../../widgets/vote/Pvote";
import { readVoteByOwnerId } from "../../shared/api/vote";
import { useUserFetch } from "features/authentication/auth";

export default function Dashboard() {
    const { data: user } = useUserFetch();
    const [votes, setVotes] = useState();
    
    useEffect(() => {
        const fetchVotes = async () => {
            const myVotes = user && await readVoteByOwnerId(user.user_id);
            setVotes(myVotes)
        }
        fetchVotes();
    }, [user]);

    return (
        <div className="text-xl font-sans font-semibold">
            <section>
                <h2>
                    <span>
                        My Votes
                    </span>
                </h2>
                <div className="flex flex-wrap">
                    <CreateVoteButton />
                    {
                        votes && votes.map((vote, idx) =>
                            <Pvote key={idx} user_id={user.id} profiles_picture={user.picture} vote={vote} />)
                    }
                </div>
            </section>
            <h2>
                <span>
                    Activity
                </span>
            </h2>
        </div>
    )
}