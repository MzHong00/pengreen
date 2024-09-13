import { useState } from "react";

import { LimitChoiceCount } from "features/voteForm/limitChoiceCount";
import { DescriptionInput } from "features/voteForm/setDescription";
import { DraggableChoiceList } from "features/voteForm/setChoice";
import { Button } from "shared/ui/Button";
import { useGlobalStore } from "shared/stores/useStore";

import styles from "./selectFormPage.module.css";

export const SelectFormPage = () => {
  const { choiceList } = useGlobalStore();
  const [isChoicePage, setIsChoicePage] = useState<boolean>(true);
  const [isVoteText, setIsVoteText] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          onClick={() => setIsChoicePage(true)}
          className={`${styles.headerItem} ${isChoicePage && styles.bgWhite}`}
        >
          <div className={styles.headerItemText}>
            <span>항목 추가</span>
          </div>
        </Button>
        <Button
          onClick={() => setIsChoicePage(false)}
          className={`${styles.headerItem} ${!isChoicePage && styles.bgWhite}`}
        >
          <div className={styles.headerItemText}>
            <span>설정</span>
          </div>
        </Button>
      </div>

      <div className={styles.page}>
        <div className={`${styles.content} ${!isChoicePage && styles.hidden}`}>
          <div className={styles.voteTypeContainer}>
            <div className={styles.voteTypeContent}>
              <Button
                onClick={() => setIsVoteText(true)}
                className={`${styles.voteTypeButton} ${
                  isVoteText && styles.activeTypeButton
                }`}
              >
                텍스트
              </Button>
              <Button
                onClick={() => setIsVoteText(false)}
                className={`${styles.voteTypeButton} ${
                  !isVoteText && styles.activeTypeButton
                }`}
              >
                이미지
              </Button>
            </div>
          </div>
          <DraggableChoiceList isVoteText={isVoteText}/>
        </div>

        <div className={`${styles.content} ${isChoicePage && styles.hidden}`}>
          <DescriptionInput />
          <LimitChoiceCount limitCount={choiceList.length} />
        </div>
      </div>
    </div>
  );
};
