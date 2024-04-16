import { FaUser } from "react-icons/fa"

interface Props {
    participant: number | undefined;
}

export const Participant = ({
    participant = 0
}: Props) => {
    
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center">
                <FaUser size={15} />
                <span>{participant}</span>
            </div>
        </div>
    )
}