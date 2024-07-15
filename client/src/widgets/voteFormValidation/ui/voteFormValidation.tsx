import { type MouseEventHandler } from "react";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";

import { User } from "entities/user";
import { ValidateCard } from "features/voteForm/submitForm/ui/validateCard";
import { VoteFormDto } from "entities/voteForm";
import { VoteCardSkeleton } from "widgets/voteCard";
import { Button } from "shared/ui/Button";

import styles from "./voteFormValidation.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  invalidationItems: string[];
  formData?: VoteFormDto;
  goBackHandler: MouseEventHandler<HTMLButtonElement>;
  owner?: User;
}

export const VoteFormValidation = ({
  invalidationItems,
  formData,
  goBackHandler,
  className,
  owner,
  ...props
}: Props) => {
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
        <ValidateCard
          formData={formData}
          owner={owner}
          invalidationItems={invalidationItems}
        />
      </main>
    </div>
  );
};
