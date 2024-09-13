import { User } from "entities/user";
import { Participant, VoteDto } from "entities/vote/vote";
import { NumChart } from "shared/ui/Chart/numChart";

import { useLimitChoiceCount } from "../model/useLimitMaxChoice";
import styles from "./choiceBox.module.css";

interface Props extends Pick<VoteDto, "choice" | "max_choice"> {
  userName: User["name"];
  myPick: Participant["pick"];
  isOpenSubmit: boolean;
  onClickSubmit: (event: React.MouseEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export const ChoiceBox = ({
  userName,
  myPick,
  max_choice = 1,
  choice: choiceList = [],
  isOpenSubmit = false,
  onClickSubmit,
  disabled = false,
}: Partial<Props>) => {
  const { selectedChoices, limitChoiceCount } = useLimitChoiceCount(max_choice);

  return (
    <div>
      <section className={styles.choiceSubmitBox}>
        <span
          className={`${myPick && styles.console} ${styles.submitContainer}`}
          data-username={userName}
          data-pick={myPick && myPick.join("\n")}
        >
          <input
            type="submit"
            value={`${isOpenSubmit ? "제출" : "참여"}`}
            onClick={onClickSubmit}
            className={`${styles.submitButton} ${
              myPick ? styles.baseGreen : styles.baseBlue
            } `}
            disabled={disabled}
          />
        </span>
        <div className={styles.maxChoiceButton}>
          <p>{`선택: ${max_choice}`}</p>
        </div>
      </section>
      
      <section className={styles.contentBox}>
        {isOpenSubmit ? (
          choiceList.map((choice) => (
            <div key={choice.content} className={styles.contentItem}>
              <input
                type="checkbox"
                name="choice"
                value={choice.content}
                className={styles.choiceInput}
                checked={selectedChoices.includes(choice.content)}
                onChange={() => limitChoiceCount(choice.content)}
              />
              <label className={styles.contentItemLabel}>
                {choice.content}
              </label>
            </div>
          ))
        ) : (
          <NumChart data={choiceList} />
        )}
      </section>
    </div>
  );
};
