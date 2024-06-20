import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

import { SelectSortBy } from "../selectSortBy/selectSorBy";
import { useStore } from "shared/stores/useStore";
import { Button } from "shared/ui/Button";

import styles from "./sortByButton.module.css";
import { sortTypes } from "../../model/sortTypes";

export const SortByButton = () => {
  let [sortQs] = useSearchParams();
  const { isModalOpen, setModalOpen } = useStore();

  const setModalOpenHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen();
  };

  return (
    <div className={styles.container}>
      <div className={styles.sortText}>
        <span>
          {sortTypes.some((sort) => sortQs.get("sort") === sort.queryString)
            ? sortQs.get("sort")
            : "latest"}
        </span>
      </div>

      <Button onClick={setModalOpenHandler} className={styles.sortButton}>
        <IoIosArrowDown size={12} />
        Sort By
      </Button>

      {isModalOpen && <SelectSortBy />}
    </div>
  );
};
