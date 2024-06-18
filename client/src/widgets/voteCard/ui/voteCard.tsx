import { type VoteDto } from "widgets/voteCard/model/types";
import { Choice } from "features/vote/submitChoice";
import { useHover } from "shared/hooks/useHover";
import { BottomSection } from "./BottomSection";

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
        <Choice
          voteId={vote._id}
          choice={vote.choice}
          maxChoice={vote.max_choice}
        />
      </section>
      <BottomSection vote={vote} isVisible={hover} />
    </div>
  );
}
