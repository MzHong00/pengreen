import { useState, type MouseEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "entities/user";
import { VoteFormDto } from "entities/voteForm";
import { TitleBar } from "features/voteForm/setTitle";
import { SelectFormPage } from "features/voteForm/selectFormPage";
import {
  getEmptyFieldsFromForm,
  getVoteFormData,
} from "features/voteForm/validateForm";
import { VoteFormValidation } from "widgets/voteFormValidation";

import styles from "./voteForm.module.css";

export const VoteForm = () => {
  const user = useQueryClient().getQueryData(["user"]) as User | undefined;

  const [formData, setFormData] = useState<Omit<VoteFormDto, "owner">>();
  const [isOpenSubmit, setIsOpenSubmit] = useState<boolean>(false);
  const [emptyVoteFields, setEmptyVoteFields] = useState<string[]>([]);

  const changePageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpenSubmit((prev) => !prev);
  };

  const moveToSubmitPageHandler = (e: MouseEvent<HTMLInputElement>) => {
    const formData = getVoteFormData(e);
    const emptyVoteFields = getEmptyFieldsFromForm(formData);

    setFormData(formData);
    setEmptyVoteFields(emptyVoteFields);
    setIsOpenSubmit((prev) => !prev);
  };
  
  return (
    <form className={styles.formContainer}>
      <div className={styles.formContent}>
        <TitleBar picture={user?.picture} />
        <SelectFormPage />
        <input
          type="button"
          value="다음"
          className={styles.toConfirmPageButton}
          onClick={moveToSubmitPageHandler}
        />
      </div>

      <VoteFormValidation
        owner={user}
        formData={formData}
        emptyVoteFields={emptyVoteFields}
        setEmptyVoteFields={setEmptyVoteFields}
        goBackHandler={changePageHandler}
        className={`${styles.vaildationContent} ${
          isOpenSubmit && styles.leftTransform
        }`}
      />

    </form>
  );
};
