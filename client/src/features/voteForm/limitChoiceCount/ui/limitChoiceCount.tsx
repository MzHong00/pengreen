import { useState, type ChangeEvent } from "react";

import styles from "./limitChoiceCount.module.css";

interface Props {
  choiceList: string[];
}

export const LimitChoiceCount = ({ choiceList }: Props) => {
  const [maxChoice, setMaxChoice] = useState<number>(1);

  const rangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxChoice(parseInt(event.target.value));
  };

  return (
    <>
      <label className={styles.label}>
        선택 개수:
        <span className={styles.innerDiv}>{maxChoice}</span>
      </label>
          <input
            type="range"
            name="max_choice"
            min="1"
            max={choiceList.length}
            value={maxChoice}
            className={styles.input}
            onChange={rangeHandler}
          />
    </>
  );
};
