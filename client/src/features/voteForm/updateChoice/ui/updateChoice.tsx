import { type FocusEvent, type MouseEvent } from "react";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";

import { ChoiceInput } from "./choiceInput";
import { AddChoice } from "features/voteForm/addChoice";
import { useGlobalStore } from "shared/stores/useStore";
import { Button } from "shared/ui/Button";

import styles from "./setChoice.module.css";

export const UpdateChoice = () => {
  const choiceData = useGlobalStore((state) => state.formData.choice);
  const setFormData = useGlobalStore((state) => state.setFormData);

  const updateChoiceHandler = (event: FocusEvent<HTMLInputElement>) => {
    const selectedInputIndex = parseInt(`${event.target.dataset.index}`);
    choiceData.splice(selectedInputIndex, 1, event.target.value);

    setFormData({ choice: choiceData.filter((item) => !!item) });
  };

  const removeChoiceHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const selectedInputIndex = parseInt(`${event.currentTarget.dataset.index}`);
    choiceData.splice(selectedInputIndex, 1, event.currentTarget.value);

    setFormData({ choice: choiceData.filter((item) => !!item) });
  };

  return (
    <>
      {choiceData.map((choice, idx) => (
        <div key={choice} className={styles.choiceContainer}>
          <Button data-index={idx} onClick={removeChoiceHandler}>
            <IoMdClose color="red" size={18} />
          </Button>
          <ChoiceInput
            data-index={idx}
            text={choice}
            onBlur={updateChoiceHandler}
            className={styles.choiceInput}
          />
        </div>
      ))}
      <AddChoice />
    </>
  );
};
