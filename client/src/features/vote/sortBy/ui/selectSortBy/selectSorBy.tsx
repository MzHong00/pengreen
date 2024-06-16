import { HTMLAttributes, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "shared/ui/Button/Button";
import { sortTypes } from "../../model/sortTypes";

import styles from "./selectSorBy.module.css";
import { useModalClose } from "shared/hooks/useModalClose";
import { useStoreModalOpen } from "../../../../../shared/stores/useStoreModalOpen";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const SelectSortBy = ({ className, ...props }: Props) => {
  let [, setSearchParams] = useSearchParams();
  const { setModalOpen } = useStoreModalOpen();
  const ref = useModalClose(setModalOpen);

  const sortSelection = (event: MouseEvent<HTMLElement>) => {
    setSearchParams({ sort: event.currentTarget.innerText });
  };

  return (
    <div ref={ref} className={`${styles.container} ${className}`} {...props}>
      <label className={styles.title}>Select order</label>
      {sortTypes.map((type, idx) => (
        <Button key={idx} onClick={sortSelection} className={`${styles.sortButton}`}>
          {type.text}
        </Button>
      ))}
    </div>
  );
};
