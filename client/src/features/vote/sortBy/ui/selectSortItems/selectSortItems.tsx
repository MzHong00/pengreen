import { forwardRef, HTMLAttributes } from "react";

import { sortTypes } from "../../consts/sortTypes";
import { Button } from "shared/ui/Button";

import styles from "./selectSortItems.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export const SelectSortItems = forwardRef<HTMLDivElement, Props>(
  ({ ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.container}`}>
        <label className={styles.title}>Select order</label>
        {sortTypes.map((type, idx) => (
          <Button
            key={idx}
            className={`${styles.sortButton}`}
            data-sort-type={type.queryString}
            {...props}
          >
            {type.sortType}
          </Button>
        ))}
      </div>
    );
  }
);
