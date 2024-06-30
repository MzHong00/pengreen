import { ChangeEvent } from "react";

import { useGlobalStore } from "shared/stores/useStore";

import styles from "./setDescription.module.css";

export const SetDescription = () => {
  const setFormData = useGlobalStore((state) => state.setFormData);

  const textOnChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      description: event.target.value,
    });
  };

  return (
    <>
      <label htmlFor="story">설명:</label>
      <textarea
        id="story"
        className={styles.voteDescript}
        onChange={textOnChangeHandler}
        maxLength={100}
      />
    </>
  );
};
