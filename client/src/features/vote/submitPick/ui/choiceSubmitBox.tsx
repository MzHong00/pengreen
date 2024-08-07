import { type VoteFormDto } from "entities/voteForm";
import { type User } from "entities/user";

import styles from "./choice.module.css";

interface Props extends User, Pick<VoteFormDto, "choice" | "max_choice"> {
  isOpenSubmit: boolean;
  onClickSubmit: (event: React.MouseEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export const ChoiceSubmitBox = ({
  disabled = false,
  isOpenSubmit = false,
  onClickSubmit,
  name: userName,
  choice: userPick,
  max_choice = 0,
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
          disabled={disabled}
          className={`${styles.actionButton} ${
            userPick ? "bg-green-300" : "bg-sky-300"
          } `}
        />
      </span>
      <div className={styles.maxChoiceButton}>
        <span>{`선택: ${max_choice}`}</span>
      </div>
    </section>
  );
};
