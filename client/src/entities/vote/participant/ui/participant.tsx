import { FaUser } from "react-icons/fa"
import { useReadVoteParticipants } from "../model/queries"

interface Props {
    voteId: string
}

export const Participant = ({
    voteId
}: Props) => {
    const { data : participant } = useReadVoteParticipants(voteId);
    
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center">
                <FaUser size={15} />
                <span>{participant}</span>
            </div>
        </div>
    )
}