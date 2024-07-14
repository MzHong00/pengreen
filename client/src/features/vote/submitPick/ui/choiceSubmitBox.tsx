import { type VoteFormDto } from "entities/voteForm";
import { type User } from "entities/user";

import styles from "./choice.module.css";

interface Props extends User, Pick<VoteFormDto, "choice" | "max_choice"> {
  isOpenSubmit: boolean;
  onClickSubmit: (event: React.MouseEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export const ChoiceSubmitBox = ({
  isOpenSubmit = false,
  onClickSubmit,
  name: userName,
  choice: userPick,
  max_choice: maxChoice = 0,
  disabled = true,
}: Partial<Props>) => {
  return (
    <section className={styles.choiceSubmitBox}>
      <span
        className={`flex ${userPick && styles.console}`}
        data-username={userName}
        data-pick={userPick && userPick.join("\n")}
      >
        <input
          type="submit"
          value={`${isOpenSubmit ? "참여" : "제출"}`}
          onClick={onClickSubmit}
          className={`${styles.actionButton} ${
            userPick ? "bg-green-300" : "bg-sky-300"
          } `}
          disabled={disabled}
        />
      </span>
      <div className={styles.maxChoiceButton}>
        <span>{`선택: ${maxChoice}`}</span>
      </div>
    </section>
  );
};
