import { LimitChoiceCount } from "features/voteForm/limitChoiceCount";
import { SetChoice } from "features/voteForm/setChoice";
import { pageTypes } from "../consts/voteFormPageTypes";
import { useState } from "react";

import styles from "./selectFormPage.module.css";
import { SetDescription } from "features/voteForm/setDescription";

export const SelectFormPage = () => {
  const [page, setPage] = useState("항목 추가");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {pageTypes.map((type) => (
          <div
            key={type}
            className={`${styles.headerItem} ${
              type === page ? styles.headerItemActive : ""
            }`}
            onClick={() => setPage(type)}
          >
            <div className={styles.headerItemText}>
              <span>{type}</span>
            </div>
          </div>
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
