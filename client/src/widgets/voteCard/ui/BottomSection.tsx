import { Participant } from "entities/vote/participant";
import { useFetchVoteById } from "features/vote/sortBy/model/queries";
import { UpdateLike } from "features/vote/updateLike";
import { useUserFetch } from "features/authentication/login";
import { type VoteDto } from "widgets/voteCard/model/types";
import { VoteDetail } from "widgets/voteDetail";
import { Button } from "shared/ui";
import { useDialog } from "shared/hooks/useDialog";

interface Props {
  vote: VoteDto;
  isVisible: boolean;
}

export const BottomSection = ({ vote, isVisible }: Props) => {
  const [voteDetail, openVoteDetail] = useDialog(
    <VoteDetail
      ownPicture={vote.owner?.picture}
      title={vote.title}
      voteId={vote._id}
    />,
    "bg-gradient-to-br from-cyan-100 to-blue-200"
  );
  const { data } = useFetchVoteById(vote._id);
  const { data: user } = useUserFetch();

  return (
    <section>
      {user && isVisible && (
        <div className="flex justify-between">
          <UpdateLike
            userId={user._id}
            voteId={vote._id}
            likeMember={data?.like}
          />
          <Participant participant={data?.participant.length} />
          <Button
            text={"자세히"}
            btnStyles="p-1 px-2 shadow bg-white hover:shadow-inner"
            contentStyles="text-xs font-sans"
            handler={openVoteDetail}
          />
        </div>
      )}
      {voteDetail}
    </section>
  );
};
