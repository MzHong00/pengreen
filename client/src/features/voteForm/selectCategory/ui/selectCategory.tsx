import { Dispatch, useState, type MouseEvent } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

import { type Category } from "entities/vote/vote";
import { RoundButton } from "shared/ui/RoundButton";
import { CategoryBox } from "shared/ui/CategoryBox/categoryBox";
import { useModal } from "shared/hooks/useModal";

import styles from "./selectCategory.module.css";

interface Props {
  setInvalidationItems: Dispatch<React.SetStateAction<string[]>>;
}

export const SelectCategory = ({ setInvalidationItems }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { ref, isOpen, toggleModal } = useModal();

  const selectCategoryHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const targetText = event.currentTarget.innerText as Category;

    setSelectedCategory(targetText);
    toggleModal(event);
    if (setInvalidationItems)
      setInvalidationItems((prev) =>
        prev.filter((item) => item !== "카테고리")
      );
  };

  return (
    <div className={styles.categoryContainer}>
      <RoundButton
        className={`hover:bg-gray-200 ${styles.categoryItem}`}
        onClick={toggleModal}
      >
        {selectedCategory || "카테고리"}
        <FiPlus />
      </RoundButton>
      <input type="hidden" name="category" value={selectedCategory || ""} />
      {isOpen && (
        <CategoryBox
          ref={ref}
          className={`${styles.categoryContainer} ${styles.categoryBoxModal}`}
          selectedCategories={selectedCategory && [selectedCategory]}
          buttonHandler={selectCategoryHandler}
        />
      )}
    </div>
  );
};
