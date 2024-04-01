import { type VoteDto } from "widgets/vote/model/types";

import { UpdateLike } from "features/vote/updateLike";
import { useUserFetch } from "features/authentication/login";
import { useDialog } from "shared/hooks/useDialog";
import { Button } from "shared/ui";
import { Choice } from "features/vote/submitChoice";
import { useHover } from "shared/hooks/useHover";
import { Participant } from "entities/vote/participant";
import { VoteDetail } from "widgets/voteDetail";

interface Props {
    vote: VoteDto
}

export function Vote({
    vote
}: Props) {
    const { data: user } = useUserFetch();
    const [voteDetail, openVoteDetail] = useDialog(
        <VoteDetail ownPicture={vote.owner.picture} title={vote.title} voteId={vote._id}/>,
        'bg-gradient-to-br from-cyan-100 to-blue-200'
    );
    const { ref: hoverRef, state: hover } = useHover({});

    return (
        <div ref={hoverRef} className="flex flex-col w-96 h-64 p-5 m-2 rounded-xl overflow-hidden shadow-lg gap-2 bg-gradient-to-br from-[#E3E1D9] to-[#C7C8CC] hover:h-72 duration-300">
            <section className="flex justify-between gap-2">
                <div className='w-[85%] flex items-center'>
                    <img src={vote.owner.picture} alt="프로필 사진" className="w-8 h-8 mr-3 rounded-full" />
                    <h1 className='truncate'>{vote.title}</h1>
                </div>
            </section>
            <section>
                <Choice voteId={vote._id} choice={vote.choice} maxChoice={vote.max_choice} />
            </section> 
            <section>
                {
                    user && hover &&
                    <div className="flex justify-between">
                        <UpdateLike userId={user._id} voteId={vote._id} />
                        <Participant voteId={vote._id} />
                        <Button 
                            text={"자세히"} 
                            btnStyles='p-1 px-2 shadow bg-white hover:shadow-inner' 
                            contentStyles="text-xs font-sans" 
                            handler={openVoteDetail} />
                    </div>
                }
                        {voteDetail}
            </section>
        </div>
    )
}