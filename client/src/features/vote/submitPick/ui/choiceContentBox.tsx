import { useState } from "react";

import { VoteDto } from "entities/vote/vote";
import { ChoiceDto } from "entities/vote/choice";
import { NumChart } from "shared/ui/Chart/numChart";

import styles from "./choice.module.css";

interface Props extends Pick<VoteDto, "choice" | "max_choice"> {
  isOpenSubmit: boolean;
  choiceListIncludedCount: ChoiceDto[];
}

export const ChoiceContentBox = ({
  isOpenSubmit = false,
  choice: choiceList = [],
  choiceListIncludedCount = [],
  max_choice = 1,
}: Partial<Props>) => {
  const [selectedChoices, setSelectedChoices] = useState<
    ChoiceDto["content"][]
  >([]);

  const limitCheckHandler = (value: ChoiceDto["content"]) => {
    setSelectedChoices((prevSelectedChoices) => {
      if (prevSelectedChoices.includes(value)) {
        // 선택을 해제
        return prevSelectedChoices.filter((choice) => choice !== value);
      }

      return prevSelectedChoices.length >= max_choice
        ? [...prevSelectedChoices.slice(1), value]
        : [...prevSelectedChoices, value];
    });
  };

  return (
    <div className={styles.contentBox}>
      {isOpenSubmit ? (
          choiceList.map((choice) => (
            <div key={choice} className={styles.contentItem}>
              <input
                type="checkbox"
                name="choice"
                value={choice}
                className={styles.choiceInput}
                checked={selectedChoices.includes(choice)}
                onChange={() => limitCheckHandler(choice)}
              />
              <label className={styles.contentItemLabel}>{choice}</label>
            </div>
          ))
      ) : (
        <NumChart data={choiceListIncludedCount} />
      )}
    </div>
  );
};
