import { useState } from "react";

import { LimitChoiceCount } from "features/voteForm/limitChoiceCount";
import { SetChoice } from "features/voteForm/setChoice";
import { SetDescription } from "features/voteForm/setDescription";
import { AddChoice } from "features/voteForm/setChoice/ui/addChoice";
import { Button } from "shared/ui/Button";

import styles from "./selectFormPage.module.css";

export const SelectFormPage = () => {
  const pageTypes = ["항목 추가", "설정"];
  const [page, setPage] = useState("항목 추가");
  const [choiceList, setChoiceList] = useState<string[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {pageTypes.map((type) => (
          <Button
            key={type}
            className={`${styles.headerItem} ${
              type === page && styles.backgroundWhite
            }`}
            onClick={() => setPage(type)}
          >
            <div className={styles.headerItemText}>
              <span>{type}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className={styles.page}>
        <div
          className={`${styles.pageInner} ${
            page === pageTypes[1] && styles.hidden
          }`}
        >
          <SetChoice choiceList={choiceList} setChoiceList={setChoiceList} />
          <AddChoice choiceList={choiceList} setChoiceList={setChoiceList} />
        </div>
        <div
          className={`${styles.pageInner}  ${
            page === pageTypes[0] && styles.hidden
          }`}
        >
          <SetDescription />
          <LimitChoiceCount choiceList={choiceList} />
        </div>
      </div>
    </div>
  );
};
