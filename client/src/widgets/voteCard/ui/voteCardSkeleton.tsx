import { VoteDto } from "entities/vote/vote";
import { Participant } from "features/vote/readParticipants";
import { UpdateLike } from "features/vote/updateLike";
import { ChoiceContentBox, ChoiceSubmitBox } from "features/vote/submitPick";
import { TitleBar } from "features/vote/readTitle";
import { Button } from "shared/ui/Button";

import styles from "../ui/voteCard.module.css";

export const VoteCardSkeleton = ({
  owner,
  title,
  choice,
  max_choice,
}: Partial<VoteDto>) => {
  return (
    <div className={styles.cardContainer}>
      <section className={styles.topSection}>
        <TitleBar picture={owner?.picture} title={title} />
      </section>
      <div>
        <ChoiceSubmitBox
          name={owner?.name}
          max_choice={max_choice}
          disabled
        />
        <ChoiceContentBox
          choice={choice}
          max_choice={max_choice}
          isOpenSubmit
        />
      </div>
      <section className="flex justify-between">
        <UpdateLike />
        <Participant />
        <Button className={styles.openDetailButton}>통계</Button>
      </section>
    </div>
  );
};
