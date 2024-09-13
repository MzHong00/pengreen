import { VoteDto } from "entities/vote/vote";
import { Participant } from "features/vote/readParticipants";
import { UpdateLike } from "features/vote/updateLike";
import { ChoiceBox } from "features/vote/submitPick";
import { TitleBar } from "features/vote/title";
import { Button } from "shared/ui/Button";

import styles from "../ui/voteCard.module.css";

export const VoteCardSkeleton = ({
  owner,
  title,
  choice,
  max_choice,
}: Partial<VoteDto>) => {
  return (
    <div className={`${styles.cardContainer}`} style={{ height: "20rem" }}>
      <section className={styles.topSection}>
        <TitleBar
          picture={owner?.picture}
          title={title}
          start_time={new Date()}
        />
      </section>
      <ChoiceBox
        disabled
        choice={choice}
        max_choice={max_choice}
        userName={owner?.name}
        isOpenSubmit={false}
      />
      <section className={styles.otherInfoBox} style={{ opacity: 1 }}>
        <UpdateLike />
        <Participant />
        <Button className={styles.openDetailButton}>자세히</Button>
      </section>
    </div>
  );
};
