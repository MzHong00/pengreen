import { Participant } from "features/vote/readParticipants";
import { useFetchVoteById } from "features/vote/sortBy/model/queries";
import { UpdateLike } from "features/vote/updateLike";
import { useUserFetch } from "features/authentication/login";
import { type VoteDto } from "widgets/voteCard/model/types";
import { VoteDetail } from "widgets/voteDetail";
import { Button } from "shared/ui/Button";
import { useDialog } from "shared/hooks/useDialog";

import styles from "./additionalInfo.module.css";

interface Props {
  vote: VoteDto;
  isVisible: boolean;
}

export const VoteAdditionalInfo = ({ vote, isVisible }: Props) => {
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
      {isVisible && (
        <div className="flex justify-between">
          <UpdateLike
            userId={user._id}
            voteId={vote._id}
            likeMember={data?.like}
          />
          <Participant participant={data?.participant.length} />
          <Button onClick={openVoteDetail} className={styles.openDetailButton}>
            자세히
          </Button>
        </div>
      )}
      {voteDetail}
    </section>
  );
};
