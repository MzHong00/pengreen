import { User } from "entities/user";
import { blockSubmitByEnterKey } from "shared/utils/blockSubmitByEnterKey";

import styles from "./setTitleBar.module.css";

export const SetTitle = ({ picture }: Pick<User, "picture">) => {
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
