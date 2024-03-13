import { useState, useContext, useMemo } from "react";

import VoteTop from "./voteTop";
import VoteMid from "./voteMid";
import VoteBot from "./voteBot";
import { UserContext } from "../../pages/main";

export default function VoteForm() {
    const getInitialDate = useMemo(() => {
        const oneDayLater = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
        return new Date(oneDayLater).toISOString().slice(0, 16);
    }, [])

    const { user } = useContext(UserContext)

    const [vote, setVote] = useState({
        own_id: user.id,
        own_picture: user.picture,
        title: "",
        choice: [],
        max_choice: 1,
        deadline: getInitialDate
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