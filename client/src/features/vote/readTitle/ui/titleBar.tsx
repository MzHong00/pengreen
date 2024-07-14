import { VoteFormDto } from "entities/voteForm";
import styles from "./titleBar.module.css";
import { User } from "entities/user";

interface Props extends Pick<VoteFormDto, "title">, Pick<User, "picture"> {}

export const TitleBar = ({
  picture: profilesPicture,
  title,
}: Partial<Props>) => {
  return (
    <div className={styles.titleBar}>
      <img
        className={styles.profilesPicture}
        src={profilesPicture}
        alt="사진"
      />
      <h1 className={styles.titleText}>{title}</h1>
    </div>
  );
};
