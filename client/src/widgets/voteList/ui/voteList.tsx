import { VoteDto } from "widgets/vote/model/types";
import { Vote } from "widgets/vote/ui/vote";


export const VoteList = ({ votes, ...Props }: any) => {

    return (
        <div {...Props}>
            {votes?.map((vote: VoteDto, idx: number) => <Vote key={idx} vote={vote} />)}
        </div>
    );
};
