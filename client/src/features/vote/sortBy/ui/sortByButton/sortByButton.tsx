import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { useSearchParams } from "react-router-dom";

import { SelectSortBy } from "../selectSortBy/selectSorBy";
import { Button } from "shared/ui/Button";

import styles from "./sortByButton.module.css";
import { sortTypes } from "../../consts/sortTypes";
import { useModal } from "shared/hooks/useModal";
import { firstLetterUpperCase } from "shared/utils/firstLetterUpperCase";

export const SortByButton = () => {
  let [sortQs] = useSearchParams();
  const { ref, isOpen, toggleModal } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.sortText}>
        <span>
          {firstLetterUpperCase(
            sortTypes.some((sort) => sortQs.get("sort") === sort.queryString)
              ? sortQs.get("sort")
              : "latest"
          )}
        </span>
      </div>

      <Button onClick={toggleModal} className={styles.sortButton}>
        <IoIosArrowDown size={12} />
        Sort By
      </Button>

      {isOpen && <SelectSortBy ref={ref} />}
    </div>
  );
};
