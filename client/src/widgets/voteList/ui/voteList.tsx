import { type VoteDto } from "widgets/vote/model/types"
import { Vote } from "widgets/vote/ui/vote"

interface Props {
    votes: VoteDto[],
    className?: string,
    onClick?: any,
}

export const VoteList = ({
    votes, className, onClick
}: Props): JSX.Element => {

    return (
        <div className={`w-[50rem] h-152 grid grid-flow-col grid-rows-voteList ${className}`} onClick={onClick}>
            {votes?.map((vote: VoteDto, idx: number) => <Vote key={idx} vote={vote} />)}
        </div>
    )
}