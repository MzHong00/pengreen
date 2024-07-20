import styles from "./profilesCard.module.css";

interface Props {
  onClick?: any;
  picture?: string;
}

export function ProfilesCard({ onClick, picture }: Props) {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        {picture ? (
          <img src={picture} alt="" className={styles.picture} />
        ) : (
          <span>로그인</span>
        )}
      </button>
    </div>
  );
}
