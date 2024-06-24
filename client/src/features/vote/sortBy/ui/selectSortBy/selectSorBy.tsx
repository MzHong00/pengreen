import { forwardRef, HTMLAttributes, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { sortTypes } from "../../consts/sortTypes";
import { Button } from "shared/ui/Button";

import styles from "./selectSorBy.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const SelectSortBy = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    let [, setSearchParams] = useSearchParams();

    const selectSortBy = (event: MouseEvent<HTMLElement>) => {
      setSearchParams({ sort: `${event.currentTarget.dataset.sortType}` });
    };

    return (
      <div ref={ref} className={`${styles.container} ${className}`} {...props}>
        <label className={styles.title}>Select order</label>
        {sortTypes.map((type, idx) => (
          <Button
            key={idx}
            onClick={selectSortBy}
            className={`${styles.sortButton}`}
            data-sort-type={type.queryString}
          >
            {type.sortType}
          </Button>
        ))}
      </div>
    );
  }
);
