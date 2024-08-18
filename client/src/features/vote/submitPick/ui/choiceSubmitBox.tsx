import { type VoteFormDto } from "entities/voteForm";
import { type User } from "entities/user";
import { Participant } from "entities/vote/vote";

import styles from "./choice.module.css";

interface Props extends User, Pick<VoteFormDto, "choice" | "max_choice"> {
  isOpenSubmit: boolean;
  onClickSubmit: (event: React.MouseEvent<HTMLInputElement>) => void;
  myPick: Participant["pick"];
  disabled: boolean;
}

export const ChoiceSubmitBox = ({
  disabled = false,
  isOpenSubmit = false,
  myPick,
  onClickSubmit,
  name: userName,
  max_choice = 0,
}: Partial<Props>) => {
  return (
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
  );
};
