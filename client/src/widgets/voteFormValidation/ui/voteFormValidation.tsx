import {
  type MouseEventHandler,
  type MouseEvent,
  type Dispatch,
  HTMLAttributes,
} from "react";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";

import { type User } from "entities/user";
import { type VoteFormDto } from "entities/voteForm";
import { createVote } from "entities/vote/vote";
import { FormValidator } from "features/voteForm/validateForm";
import { SelectCategory } from "features/voteForm/selectCategory";
import { VoteCardSkeleton } from "widgets/voteCard";
import { Button } from "shared/ui/Button";

import styles from "./voteFormValidation.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  owner?: User;
  formData?: Omit<VoteFormDto, "owner">;
  emptyVoteFields: string[];
  setEmptyVoteFields: Dispatch<React.SetStateAction<string[]>>;
  goBackHandler: MouseEventHandler<HTMLButtonElement>;
}

export const VoteFormValidation = ({
  owner,
  formData,
  emptyVoteFields,
  setEmptyVoteFields,
  goBackHandler,
  className,
  ...props
}: Props) => {
  const onSubmitForm = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!owner || !formData) return;

    await createVote({
      owner: owner,
      ...formData,
    });
    
    window.location.reload();
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
        <SelectCategory setEmptyVoteFields={setEmptyVoteFields} />
        <VoteCardSkeleton
          owner={owner}
          title={formData?.title}
          max_choice={formData?.max_choice}
          choice={formData?.choice}
        />
        <FormValidator
          onSubmit={onSubmitForm}
          invalidationItems={emptyVoteFields}
        />
      </main>
    </div>
  );
};
