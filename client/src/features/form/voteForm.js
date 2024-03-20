import { useState } from "react";

import VoteTop from "./voteTop";
import VoteMid from "./voteMid";
import VoteBot from "./voteBot";
import { useUserFetch } from "features/authentication/auth";

export default function VoteForm() {
    const { data: user } = useUserFetch();

    const [vote, setVote] = useState({
        owner: user,
        title: "",
        choice: [],
        max_choice: 1,
        start_time: new Date().toISOString(),
        deadline: new Date().toISOString(),
        like: 0,
        participant: 0
    });

    return (
        <div>
            <div className="w-144 h-144 p-5 flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg">
                <form className="h-full flex flex-col font-medium">
                    <div className="h-full flex flex-col justify-between gap-5">
                        <VoteTop {...{vote, setVote}} />
                        <VoteMid {...{vote, setVote}} />
                        <VoteBot {...{vote, setVote}} />
                    </div>
                </form>
            </div>
        </div>
    )
}