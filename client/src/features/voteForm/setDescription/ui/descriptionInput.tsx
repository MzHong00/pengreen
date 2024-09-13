import styles from "./descriptionInput.module.css";

export const DescriptionInput = () => {
  return (
    <>
      <label>
        설명:
        <textarea
          name="description"
          className={styles.voteDescript}
          maxLength={100}
        />
      </label>
    </>
  );
};
