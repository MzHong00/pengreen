import { User } from "entities/user";
import { useGlobalStore } from "shared/stores/useStore";

import styles from "./setTitleBar.module.css";

export const SetTitle = ({
    picture
}: Pick<User, 'picture'>) => {
  const title = useGlobalStore((state) => state.formData.title);
  const setFormData = useGlobalStore((state) => state.setFormData);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ title: event.currentTarget.value });
  };

  return (
    <div className={styles.container}>
      <img src={picture} alt="" className={styles.userImgBox} />
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={titleHandler}
        className={styles.titleInput}
      />
    </div>
  );
};
