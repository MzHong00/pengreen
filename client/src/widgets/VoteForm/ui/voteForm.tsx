import { useState, type MouseEvent } from "react";

import { User } from "entities/user";
import { VoteFormDto } from "entities/voteForm";
import { SetTitle } from "features/voteForm/setTitle";
import { SelectFormPage } from "features/voteForm/selectOptionForm";
import {
  getFormData,
  getInvalidationItems,
} from "features/voteForm/submitForm";
import { VoteFormValidation } from "widgets/voteFormValidation";

import styles from "./voteForm.module.css";
import { useQueryClient } from "@tanstack/react-query";

export const VoteForm = () => {
  const user = useQueryClient().getQueryData(["user"]) as User | undefined;

  const [isOpenValidation, setIsOpenValidation] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<VoteFormDto, "owner">>();
  const [invalidationItems, setInvalidationItems] = useState<string[]>([]);

  const changePageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpenValidation((prev) => !prev);
  };

  const validateFormHandler = (e: MouseEvent<HTMLInputElement>) => {
    const formData = getFormData(e);
    const invalidationItems = getInvalidationItems(formData);

    setFormData(formData);
    setInvalidationItems(invalidationItems);
    setIsOpenValidation((prev) => !prev);
  };

  return (
    <form className={styles.formContainer}>
      <div className={styles.formContent}>
        <SetTitle picture={user?.picture} />
        <SelectFormPage />
        <input
          type="button"
          value="생성하기"
          className={styles.toConfirmPageButton}
          onClick={validateFormHandler}
        />
      </div>
      <VoteFormValidation
        owner={user}
        formData={formData}
        invalidationItems={invalidationItems}
        setInvalidationItems={setInvalidationItems}
        goBackHandler={changePageHandler}
        className={`${styles.vaildationContent} ${
          isOpenValidation && styles.leftTransform
        }`}
      />
    </form>
  );
};
