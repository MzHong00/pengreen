import { type FocusEvent } from "react";
import { FaCheck } from "react-icons/fa";

import { useGlobalStore } from "shared/stores/useStore";
import { ChoiceInput } from "./choiceInput";

import styles from "./setChoice.module.css";

export const SetChoice = () => {
  const choiceData = useGlobalStore((state) => state.formData.choice);
  const setFormData = useGlobalStore((state) => state.setFormData);

  const changeChoice = (event: FocusEvent<HTMLInputElement>) => {
    const selectedInputIndex = parseInt(`${event.target.dataset.index}`);
    choiceData.splice(selectedInputIndex, 1, event.target.value);

    setFormData({ choice: choiceData.filter((item) => !!item) });
  };

  return (
    <>
      {choiceData.map((choice, idx) => (
        <div key={idx} className={styles.choiceContainer}>
          <FaCheck color="#0099FF" />
          <ChoiceInput
            data-index={idx}
            text={choice}
            onBlur={changeChoice}
            className={styles.choiceInput}
          />
        </div>
      ))}
    </>
  );
};
