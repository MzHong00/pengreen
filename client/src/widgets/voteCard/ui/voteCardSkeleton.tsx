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
    <div className={`${styles.cardContainer}`}>
      <section className={styles.topSection}>
        <TitleBar
          picture={owner?.picture}
          title={title}
          start_time={new Date()}
        />
      </section>
      <ChoiceSubmitBox name={owner?.name} max_choice={max_choice} disabled />
      <ChoiceContentBox
        choice={choice}
        max_choice={max_choice}
        isOpenSubmit={false}
      />
      <section className={styles.otherInfoBox}>
        <UpdateLike />
        <Participant />
        <Button className={styles.openDetailButton}>자세히</Button>
      </section>
    </div>
  );
};
