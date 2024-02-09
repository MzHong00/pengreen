import CreateVoteButton from "./createVoteButton";

export default function Dashboard(params) {

    return (
        <div className="text-xl font-sans font-semibold">
            <div>
                <span>
                    My Votes
                </span>
                <CreateVoteButton />
            </div>
            <div>
                Activity
            </div>
        </div>
    )
}