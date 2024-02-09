import VoteBot from "./voteBot";
import VoteMid from "./voteMid";
import VoteTop from "./voteTop";

export default function VoteForm() {

    return (
        <div>
            <div className="w-144 h-144 p-5 flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg">
                <form className="h-full flex flex-col font-medium">
                    <div className="h-full flex flex-col justify-between gap-5">
                        <VoteTop />
                        <VoteMid />
                        <VoteBot />
                    </div>
                </form>
            </div>
        </div>
    )
}