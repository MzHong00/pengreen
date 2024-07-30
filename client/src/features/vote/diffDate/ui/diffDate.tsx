import { IconBox } from "shared/ui/IconBox";
import { VoteDto } from "entities/vote/vote";

import styles from "./diffDate.module.css";
import { calcTimeDifference } from "../model/calcTimeDifference";

interface Props {
  start_time: VoteDto["start_time"];
}

export const DiffDate = ({ start_time }: Props) => {
  const diffTime = calcTimeDifference(new Date(start_time));

  return <IconBox count={`${diffTime} 전`} className={styles.diffDateText} />;
};
