import { useState } from "react";

import { pageTypes } from "../consts/voteFormPageTypes";
import { LimitChoiceCount } from "features/voteForm/limitChoiceCount";
import { SetChoice } from "features/voteForm/setChoice";
import { SetDescription } from "features/voteForm/setDescription";
import { Button } from "shared/ui/Button";

import styles from "./selectFormPage.module.css";

export const SelectFormPage = () => {
  const [page, setPage] = useState("항목 추가");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {pageTypes.map((type) => (
          <Button
            key={type}
            className={`${styles.headerItem} ${
              type === page && 'bg-white'}`}
            onClick={() => setPage(type)}
          >
            <div className={styles.headerItemText}>
              <span>{type}</span>
            </div>
          </Button>
        ))}
      </div>
      <div className={styles.page}>
        {page === pageTypes[0] && (
          <div className={styles.pageInner}>
            <SetChoice />
          </div>
        )}
        {page === pageTypes[1] && (
          <div className={styles.pageInner}>
            <SetDescription />
            <LimitChoiceCount />
          </div>
        )}
      </div>
    </div>
  );
};
