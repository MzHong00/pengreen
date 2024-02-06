import NewVote from "./newVote";

export default function Dashboard(params) {

    return (
        <div className="text-xl font-sans font-semibold">
            <div>
                <span>
                    My Votes
                </span>
                <NewVote />
            </div>
            <div>
                Activity
            </div>
        </div>
    )
}