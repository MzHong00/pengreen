import { useCallback, useState, type MouseEvent } from "react";

import { useUserFetch } from "entities/user";
import { VoteFormDto } from "entities/voteForm";
import { SetTitle } from "features/voteForm/setTitle";
import { SelectFormPage } from "features/voteForm/selectOptionForm";
import { SelectCategory } from "features/voteForm/selectCategory";
import {
  SubmitAfterValidation,
  getFormData,
  getInvalidationItems,
} from "features/voteForm/submitAfterValidation";

import styles from "./voteForm.module.css";

export const VoteForm = () => {
  const { data: user } = useUserFetch();
  const [formData, setFormData] = useState<VoteFormDto>();
  const [isOpenValidation, setIsOpenValidation] = useState<boolean>(false);
  const [invalidationItems, setInvalidationItems] = useState<string[]>([]);

  const setFormDataHandler = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!user) return;

      const formData = getFormData(e);
      const invalidationItems = getInvalidationItems(formData);

      setFormData(formData);
      setInvalidationItems(invalidationItems);
      setIsOpenValidation((prev) => !prev);
    },
    [user, setFormData, setIsOpenValidation]
  );

  const changePageHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsOpenValidation((prev) => !prev);
    },
    [setIsOpenValidation]
  );

  return (
    <form className={styles.formContainer}>
      <div className={styles.formContent}>
        <SetTitle picture={user?.picture} />
        <SelectCategory />
        <SelectFormPage />
        <input
          type="submit"
          value="생성하기"
          className={styles.toConfirmPageButton}
          onClick={setFormDataHandler}
        />
      </div>
      <SubmitAfterValidation
        className={`${styles.vaildationContent} ${
          isOpenValidation && styles.leftTransform
        }`}
        formData={formData}
        invalidationItems={invalidationItems}
        goBackHandler={changePageHandler}
        owner={user}
      />
    </form>
  );
};
