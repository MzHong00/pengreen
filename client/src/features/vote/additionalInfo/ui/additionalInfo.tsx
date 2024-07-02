import { useUserFetch } from "entities/user";
import { useReadVoteById, type VoteDto } from "entities/vote/vote";
import { Participant } from "features/vote/readParticipants";
import { UpdateLike } from "features/vote/updateLike";
import { Button } from "shared/ui/Button";

import styles from "./additionalInfo.module.css";

interface Props {
  vote: VoteDto;
  isVisible: boolean;
}

export const VoteAdditionalInfo = ({ vote, isVisible }: Props) => {
  const { data } = useReadVoteById(vote._id);
  const { data: user } = useUserFetch();

  const isOpenDetailHandler = () => {};

  return (
    <section>
      {isVisible && (
        <div className="flex justify-between">
          <UpdateLike
            user_id={user?._id}
            vote_id={vote?._id}
            liker={data?.like ? data.like : []}
          />
          <Participant participant={data?.participant.length} />
          <Button
            onClick={isOpenDetailHandler}
            className={styles.openDetailButton}
          >
            통계
          </Button>
        </div>
      )}
    </section>
  );
};
