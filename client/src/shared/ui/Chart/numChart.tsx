import { type ChoiceDto } from "entities/vote/choice";

import styles from "./numChart.module.css";

interface Props {
  data: ChoiceDto[];
}

export const NumChart = ({ data = [], ...props }: Props) => {
  return (
    <>
      {data.map((value, idx) => (
        <div key={idx} className={styles.itemBox}>
          <b className={styles.itemCount}>{value.count}</b>
          <p title={value.content} className={styles.itemText}>{value.content}</p>
        </div>
      ))}
    </>
  );
};
