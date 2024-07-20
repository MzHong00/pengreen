import { VoteFormDto } from "entities/voteForm";
import { User } from "entities/user";

import styles from "./titleBar.module.css";

interface Props extends Pick<VoteFormDto, "title">, Pick<User, "picture"> {}

export const TitleBar = ({
  picture: profilesPicture,
  title,
}: Partial<Props>) => {
  return (
    <div className={styles.titleBar}>
      <img
        alt="사진"
        src={profilesPicture}
        className={styles.profilesPicture}
      />
      <h1 title={title} className={styles.titleText}>{title}</h1>
    </div>
  );
};
