import { type VoteDto } from "entities/vote/vote";
import { VoteAdditionalInfo } from "features/vote/additionalInfo";
import { SubmitChoiceContainer } from "features/vote/submitChoice";
import { useHover } from "shared/hooks/useHover";

import styles from "./voteCard.module.css";

interface Props {
  vote: VoteDto;
}

export function VoteCard({ vote }: Props) {
  const { ref: hoverRef, state: hover } = useHover();

  return (
    <div ref={hoverRef} className={styles.container}>
      <section className={styles.topSection}>
        <div className={styles.titleContainer}>
          <img
            src={vote.owner.picture}
            alt={vote.owner.name}
            className={styles.ownerImage}
          />
          <h1 className={styles.title}>{vote.title}</h1>
        </div>
      </section>
      <section>
        <SubmitChoiceContainer
          _id={vote._id}
          choice={vote.choice}
          max_choice={vote.max_choice}
        />
      </section>
      <VoteAdditionalInfo vote={vote} isVisible={hover} />
    </div>
  );
}
