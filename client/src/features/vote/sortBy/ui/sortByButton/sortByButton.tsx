import { IoIosArrowDown } from "react-icons/io";

import { Button } from "shared/ui/Button/Button";
import { SelectSortBy } from "../selectSortBy/selectSorBy";
import { useStore } from "shared/stores/useStore";

import styles from "./sortByButton.module.css";
import { useSearchParams } from "react-router-dom";

export const SortByButton = () => {
  let [sortQs] = useSearchParams();
  const { isModalOpen, setModalOpen } = useStore();
  
  const setModalOpenHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen();
  }

  return (
    <div className={styles.container}>
      <div className={styles.sortText}>
        <span>{sortQs.get('sort')}</span>
      </div>

      <Button onClick={setModalOpenHandler} className={styles.sortButton}>
        <IoIosArrowDown size={12} />
        Sort By
      </Button>

      {isModalOpen && <SelectSortBy />}
    </div>
  );
};
