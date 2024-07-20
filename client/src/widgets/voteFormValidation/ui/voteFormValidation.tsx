import { type MouseEventHandler, type MouseEvent, type Dispatch } from "react";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";

import { type User } from "entities/user";
import { type VoteFormDto } from "entities/voteForm";
import { createVote } from "entities/vote/vote";
import { getFormData, SubmitFormBox } from "features/voteForm/submitForm";
import { SelectCategory } from "features/voteForm/selectCategory";
import { VoteCardSkeleton } from "widgets/voteCard";
import { Button } from "shared/ui/Button";

import styles from "./voteFormValidation.module.css";

interface Props {
  owner?: User;
  className?: string;
  formData?: Omit<VoteFormDto, 'owner'>;
  invalidationItems: string[];
  setInvalidationItems: Dispatch<React.SetStateAction<string[]>>
  goBackHandler: MouseEventHandler<HTMLButtonElement>;
}

export const VoteFormValidation = ({
  owner,
  className,
  formData,
  invalidationItems,
  setInvalidationItems,
  goBackHandler,
}: Props) => {
  const onSubmitForm = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!owner) return;
    const formData = getFormData(e);
    
    createVote({
      owner: owner,
      ...formData
    });
    window.location.reload();
  };

  return (
    <div className={`${styles.validationContainer} ${className}`}>
      <nav className={styles.topBar}>
        <Button onClick={goBackHandler}>
          <MdKeyboardArrowLeft size={30} />
        </Button>
        <h2 className={styles.previewText}>미리보기</h2>
      </nav>

      <main className={styles.vaildationContent}>
        <SelectCategory setInvalidationItems={setInvalidationItems}/>
        <VoteCardSkeleton
          owner={owner}
          title={formData?.title}
          max_choice={formData?.max_choice}
          choice={formData?.choice}
        />
        <SubmitFormBox
          onSubmit={onSubmitForm}
          invalidationItems={invalidationItems}
        />
      </main>
    </div>
  );
};
