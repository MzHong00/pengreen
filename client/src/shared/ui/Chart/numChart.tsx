import { HTMLAttributes } from "react";

import { type ChoiceDto } from "entities/vote/choice";

import styles from "./numChart.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {
  data?: ChoiceDto[];
}

export const NumChart = ({ data = [], className, ...props }: Props) => {
  return (
    <ul className={`${className} ${styles.itemList}`} {...props}>
      {data.map((value, idx) => (
        <li key={idx} className={styles.item}>
          <strong className={styles.itemCount}>{value.count}</strong>
          <span title={value.content} className={styles.itemText}>
            {value.content}
          </span>
        </li>
      ))}
    </ul>
  );
};
