import styles from './setDescription.module.css'

export const SetDescription = () => {
  return (
    <>
      <label htmlFor="story">설명:</label>
      <textarea id='story' className={styles.voteDescript} maxLength={100}/>
    </>
  );
};
