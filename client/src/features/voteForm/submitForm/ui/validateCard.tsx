import { createVote, VoteDto } from "entities/vote/vote";
import { VoteFormDto } from "entities/voteForm";
import { User } from "entities/user";
import { Button } from "shared/ui/Button";

import styles from "./validateCard.module.css";

interface Props {
  formData: VoteFormDto | undefined;
  owner: User | undefined;
  invalidationItems: string[];
}

export const ValidateCard = ({ formData, owner, invalidationItems }: Props) => {
  const createVoteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formData && owner) {
      //id는 몽고디비에서 생성해 주는 것을 사용
      const vote: Omit<VoteDto, "_id"> = {
        ...formData,
        owner: owner,
        like: [],
        participant: [],
        start_time: new Date().toString(),
      };

      createVote(vote);
      window.location.reload();
    }
  };

  return (
    <>
      <h2 className={styles.title}>투표를 생성 하시겠습니까?</h2>
      <section className={styles.validationCheckBar}>
        {invalidationItems.length === 0 ? (
          <>
            <p className={`${styles.vaildationText} text-green-600`}>
              *투표를 생성할 수 있습니다.
            </p>
            <Button
              className={`${styles.createButton} ${styles.activeButton}`}
              onClick={createVoteHandler}
            >
              예
            </Button>
          </>
        ) : (
          <>
            {invalidationItems.map((item) => (
              <p className={`${styles.vaildationText} text-red-500`} key={item}>
                *{item}이 올바르지 않습니다.
              </p>
            ))}
            <Button
              className={`${styles.createButton} ${styles.inActiveButton}`}
              disabled
            >
              예
            </Button>
          </>
        )}
      </section>
    </>
  );
};
