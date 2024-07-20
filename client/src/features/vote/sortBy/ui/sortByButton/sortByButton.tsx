import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";

import { SelectSortItems } from "../selectSortItems/selectSortItems";
import { Button } from "shared/ui/Button";
import { useModal } from "shared/hooks/useModal";

import styles from "./sortByButton.module.css";

interface Props {
  currentSort: string | undefined;
}

export const SortByButton = ({ currentSort = "latest" }: Props) => {
  const { ref, isOpen, toggleModal } = useModal();

  return (
    <div className={styles.container}>
      <span className={styles.sortText}>{currentSort}</span>

      <Button onClick={toggleModal} className={styles.sortButton}>
        <IoIosArrowDown size={12} />
        Sort By
      </Button>

      {isOpen && <SelectSortItems ref={ref} />}
    </div>
  );
};
