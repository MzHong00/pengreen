import { memo, MouseEventHandler, MouseEvent } from "react";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";

import { SelectSortItems } from "../selectSortItems/selectSortItems";
import { Button } from "shared/ui/Button";
import { useModal } from "shared/hooks/useModal";

import styles from "./sortByButton.module.css";

interface Props {
  currentSort?: string;
  sortParamsHandler: MouseEventHandler;
}

export const SortByButton = memo(
  ({ currentSort = "latest", sortParamsHandler }: Props) => {
    const { ref, isOpen, toggleModal } = useModal();

    const selectSortHandler = (e: MouseEvent<HTMLButtonElement>) => {
      sortParamsHandler(e);
      toggleModal(e);
    };

    return (
      <div className={styles.sortContainer}>
        <Button className={styles.sortByButton} onClick={toggleModal}>
          <span className={styles.curSortText}>{currentSort}</span>

          <span className={styles.sortText}>
            <IoIosArrowDown size={12} />
            Sort By
          </span>
        </Button>
        {isOpen && <SelectSortItems ref={ref} onClick={selectSortHandler} />}
      </div>
    );
  }
);
