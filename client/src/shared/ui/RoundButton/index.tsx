import { HTMLAttributes } from "react";

import styles from './index.module.css'

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export const RoundButton = ({ children, className, ...props }: Props) => {
    return (
      <button
        type="button"
        className={`${styles.round} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  