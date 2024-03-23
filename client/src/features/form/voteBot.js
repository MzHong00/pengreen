import PublicButton from "features/postVote/publicButton";
import AddChoice from "../choice/addToChoice/addChoice";

export default function VoteBot({ vote, setVote }) {

    return (
        <div className={`flex`}>
            <div className={`flex items-center w-full h-full`}>
                <AddChoice setVote={setVote} />
                <PublicButton vote={vote} />
            </div>
        </div>
    )
}