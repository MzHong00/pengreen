import { FaUser } from "@react-icons/all-files/fa/FaUser";
import styles from "./participant.module.css";

interface Props {
  participant: number | undefined;
}

export const Participant = ({ participant = 0 }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <FaUser size={15} />
        <span>{participant}</span>
      </div>
    </div>
  );
};
