import { HTMLAttributes, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { sortTypes } from "../../model/sortTypes";
import styles from "./selectSorBy.module.css";
import { useModalClose } from "shared/hooks/useModalClose";
import { Button } from "shared/ui/Button";
import { useStore } from "shared/stores/useStore";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const SelectSortBy = ({ className, ...props }: Props) => {
  let [, setSearchParams] = useSearchParams();
  const { setModalOpen } = useStore();
  const ref = useModalClose(setModalOpen);

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
};
