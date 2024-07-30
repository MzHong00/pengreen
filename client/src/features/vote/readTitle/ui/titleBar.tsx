import { User } from "entities/user";
import { VoteDto } from "entities/vote/vote";
import { DiffDate } from "features/vote/diffDate";

import styles from "./titleBar.module.css";

interface Props
  extends Pick<VoteDto, "title" | "start_time">,
    Pick<User, "picture"> {}

export const TitleBar = ({ title, picture, start_time }: Partial<Props>) => {
  return (
    <div className={styles.titleBar}>
      <img alt="사진" src={picture} className={styles.profilesPicture} />
      <h1 title={title} className={styles.titleText}>
        {title}
      </h1>
      {start_time && <DiffDate start_time={start_time} />}
    </div>
  );
};
