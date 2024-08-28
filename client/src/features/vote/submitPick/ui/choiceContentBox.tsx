import { useState } from "react";

import { VoteDto } from "entities/vote/vote";
import { ChoiceDto } from "entities/vote/choice";
import { NumChart } from "shared/ui/Chart/numChart";

import styles from "./choice.module.css";

interface Props extends Pick<VoteDto, "choice" | "max_choice"> {
  isOpenSubmit: boolean;
}

export const ChoiceContentBox = ({
  isOpenSubmit = false,
  choice: choiceList = [],
  max_choice = 1,
}: Partial<Props>) => {
  const [selectedChoices, setSelectedChoices] = useState<
    ChoiceDto["content"][]
  >([]);

  const limitCheckHandler = (value: ChoiceDto["content"]) => {
    setSelectedChoices((prevSelectedChoices) => {
      // 선택을 해제
      if (prevSelectedChoices.includes(value)) {
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
          <div key={choice.content} className={styles.contentItem}>
            <input
              type="checkbox"
              name="choice"
              value={choice.content}
              className={styles.choiceInput}
              checked={selectedChoices.includes(choice.content)}
              onChange={() => limitCheckHandler(choice.content)}
            />
            <label className={styles.contentItemLabel}>{choice.content}</label>
          </div>
        ))
      ) : (
        <NumChart data={choiceList} />
      )}
    </div>
  );
};
