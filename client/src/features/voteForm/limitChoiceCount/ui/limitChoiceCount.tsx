import { type ChangeEvent } from "react";
import { useGlobalStore } from "shared/stores/useStore";

import styles from "./limitChoiceCount.module.css";

export const LimitChoiceCount = () => {
  const choiceList = useGlobalStore((state) => state.formData.choice);
  const maxChoice = useGlobalStore((state) => state.formData.max_choice);
  const setFormData = useGlobalStore((state) => state.setFormData);

  const rangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ max_choice: parseInt(event.target.value) });
  };

  return (
    <>
      <label htmlFor="limitChoice" className={styles.label}>
        선택 개수:
        <span className={styles.innerDiv}>{maxChoice}</span>
      </label>
      <div className={styles.relativeContainer}>
        <input
          id="limitChoice"
          type="range"
          min="1"
          max={choiceList.length}
          value={maxChoice}
          className={styles.input}
          onChange={rangeHandler}
        />
      </div>
    </>
  );
};
