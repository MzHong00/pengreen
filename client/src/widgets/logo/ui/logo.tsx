import { HTMLAttributes } from "react";
import styles from "./logo.module.css";

interface Props extends HTMLAttributes<HTMLSpanElement> {}

export const Logo = ({ className, ...props }: Props) => {
  return (
    <span className={`${styles.logoTitle} ${className}`} {...props}>
      pengreen
    </span>
  );
};
