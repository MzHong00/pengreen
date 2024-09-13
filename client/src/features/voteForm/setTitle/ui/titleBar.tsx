import { User } from "entities/user";
import { blockSubmitByEnterKey } from "shared/helper/blockSubmitByEnterKey";

import styles from "./titleBar.module.css";

interface Pros {
  picture?: User["picture"];
}

export const TitleBar = ({ picture }: Pros) => {
  return (
    <div className={styles.container}>
      <img src={picture} alt="" className={styles.userImgBox} />
      <input
        name="title"
        placeholder="제목"
        className={styles.titleInput}
        onKeyDown={blockSubmitByEnterKey}
        required
      />
    </div>
  );
};
