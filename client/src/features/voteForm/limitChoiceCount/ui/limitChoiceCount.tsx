import { type ChangeEvent } from "react";
import { useGlobalStore } from "shared/stores/useStore";

import styles from "./limitChoiceCount.module.css";

export const LimitChoiceCount = () => {
  const { formData, setFormData } = useGlobalStore();

  const rangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ max_choice: parseInt(event.target.value) });
  };

  return (
    <>
      <label htmlFor="limitChoice" className={styles.label}>
        선택 개수:
        <span className={styles.innerDiv}>{formData.max_choice}</span>
      </label>
      <div className={styles.relativeContainer}>
        <input
          id="limitChoice"
          type="range"
          min="1"
          max={formData.choice.length}
          value={formData.max_choice}
          className={styles.input}
          onChange={rangeHandler}
        />
      </div>
    </>
  );
};
