import { forwardRef, HTMLAttributes, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { sortTypes } from "../../consts/sortTypes";
import { Button } from "shared/ui/Button";

import styles from "./selectSortItems.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const SelectSortItems = forwardRef<HTMLDivElement, Props>(
  ({ ...props }, ref) => {
    let [searchParams, setSearchParams] = useSearchParams();

    const setSortParams = (event: MouseEvent<HTMLElement>) => {
      searchParams.set('sort', `${event.currentTarget.dataset.sortType}`)
      setSearchParams(searchParams);
    };

    return (
      <div ref={ref} className={`${styles.container}`} {...props}>
        <label className={styles.title}>Select order</label>
        {sortTypes.map((type, idx) => (
          <Button
            key={idx}
            onClick={setSortParams}
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
