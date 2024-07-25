import { FaUser } from "@react-icons/all-files/fa/FaUser";

import styles from "./participant.module.css";

const PARTICIPANT_ICON_SIZE = 16;

interface Props {
  participant?: number;
}

export const Participant = ({ participant = 0 }: Props) => {
  return (
    <div className={styles.contentBox}>
      <div className={styles.content}>
        <FaUser size={PARTICIPANT_ICON_SIZE} />
        <span>{participant}</span>
      </div>
    </div>
  );
};
