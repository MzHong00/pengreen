import { HTMLAttributes } from "react";

import styles from "./index.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  count: number | string;
}

export const IconBox = ({ count, children, ...props }: Props) => {
  return (
    <div className={styles.iconBox} {...props}>
      {children}
      <span>{count}</span>
    </div>
  );
};
