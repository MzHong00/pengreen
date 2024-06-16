import { sortTypes } from "../../model/sortTypes";
import { Button } from "shared/ui/Button/Button";
import { IoIosArrowDown } from "react-icons/io";
import { SelectSortBy } from "../selectSortBy/selectSorBy";

import styles from "./sortByButton.module.css";
import { useStoreModalOpen } from "../../../../../shared/stores/useStoreModalOpen";

export const SortByButton = () => {
  const { isModalOpen, setModalOpen } = useStoreModalOpen();

  const setModalOpenHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalOpen();
  }

  return (
    <div className={styles.container}>
      <div className={styles.sortItem}>
        {sortTypes[0].img}
        <span>Likes</span>
      </div>

      <Button onClick={setModalOpenHandler} className={styles.sortButton}>
        <IoIosArrowDown size={12} />
        Sort By
      </Button>

      {isModalOpen && <SelectSortBy />}
    </div>
  );
};
