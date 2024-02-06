import NewVoteBot from "./newVoteBot";
import NewVoteMid from "./newVoteMid";
import NewVoteTop from "./newVoteTop";

export default function VoteForm({ items, setItems }) {

    return (
        <div>
            <div className="w-144 h-144 p-5 flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg">
                <form action="/" method="get" className="h-full flex flex-col font-medium">
                    <div className="h-full flex flex-col justify-between gap-5">
                        <NewVoteTop />

                        <NewVoteMid items={items} setItems={setItems}/>

                        <NewVoteBot setItems={setItems} />
                    </div>
                </form>
            </div>
        </div>
    )
}