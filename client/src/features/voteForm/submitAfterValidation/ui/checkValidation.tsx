import { type MouseEventHandler, type MouseEvent } from "react";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";

import { User } from "entities/user";
import { createVote, VoteDto } from "entities/vote/vote";
import { VoteFormDto } from "entities/voteForm";
import { VoteCardSkeleton } from "widgets/voteCard";
import { Button } from "shared/ui/Button";

import styles from "./checkValidation.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  invalidationItems: string[];
  formData?: VoteFormDto;
  goBackHandler: MouseEventHandler<HTMLButtonElement>;
  owner?: User;
}

export const SubmitAfterValidation = ({
  invalidationItems,
  formData,
  goBackHandler,
  className,
  owner,
  ...props
}: Props) => {
  const createVoteHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (formData && owner) {
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
    <div className={`${styles.validationContainer} ${className}`} {...props}>
      <nav className={styles.topBar}>
        <Button onClick={goBackHandler}>
          <MdKeyboardArrowLeft size={30} />
        </Button>
        <h2 className={styles.previewText}>미리보기</h2>
      </nav>
      <main className={styles.vaildationContent}>
        <section className={styles.previewVote}>
          <VoteCardSkeleton
            owner={owner}
            title={formData?.title}
            max_choice={formData?.max_choice}
            choice={formData?.choice}
          />
        </section>
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
                <p
                  className={`${styles.vaildationText} text-red-500`}
                  key={item}
                >
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
      </main>
    </div>
  );
};
