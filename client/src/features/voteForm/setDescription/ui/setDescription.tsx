import styles from "./setDescription.module.css";

export const SetDescription = () => {
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
