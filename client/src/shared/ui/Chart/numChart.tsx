import { type ChoiceDto } from "entities/vote/choice";

import styles from "./numChart.module.css";

interface Props {
  data?: ChoiceDto[];
}

export const NumChart = ({ data = [] }: Props) => {
  return (
    <ul className={styles.listContainer}>
      {data.map((value, idx) => (
        <li key={idx} className={styles.itemBox}>
          <strong className={styles.itemCount}>{value.count}</strong>
          <span title={value.content} className={styles.itemText}>
            {value.content}
          </span>
        </li>
      ))}
    </ul>
  );
};
