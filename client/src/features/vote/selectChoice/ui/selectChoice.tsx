import { useState, type MouseEvent } from "react";

import styles from "./selectChoice.module.css";
import { VoteDto } from "entities/vote";

interface Props extends Pick<VoteDto, "choice" | "max_choice"> {}

export const SelectChoice = ({ choice, max_choice }: Props) => {
  const [count, setCount] = useState(0);
  const limitCheckHandler = (e: MouseEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;

    if (isChecked && count < max_choice) {
      setCount((prev) => prev + 1);
    } else if (!isChecked) {
      setCount((prev) => prev - 1);
    } else {
      e.preventDefault(); // 선택 제한 조건을 충족하지 않으면 체크박스 변경을 취소합니다.
    }
  };

  return (
    <div className={styles.container}>
      {choice.map((value: any, idx) => (
        <div key={idx} className="w-fit flex items-center gap-2">
          <input
            type="checkbox"
            onClick={limitCheckHandler}
            className="w-4 h-4"
          />
          <label className={styles.countLabel}>
            {value}
          </label>
        </div>
      ))}
    </div>
  );
};
