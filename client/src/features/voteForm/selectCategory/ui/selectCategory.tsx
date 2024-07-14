import { useState, type MouseEvent } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

import { Category } from "entities/vote/vote";
import { RoundButton } from "shared/ui/RoundButton";
import { CategoryBox } from "shared/ui/CategoryBox/categoryBox";

import styles from "./selectCategory.module.css";

export const SelectCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isShowCategories, setIsShowCategories] = useState<boolean>(false);

  const selectCategoryHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const targetText = event.currentTarget.innerText as Category;

    if (selectedCategories.includes(targetText)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== targetText)
      );
    } else {
      if (selectedCategories.length >= 3) selectedCategories.shift();
      setSelectedCategories([...selectedCategories, targetText]);
    }
  };
  return (
    <div>
      <ul className={styles.categoriesContainer}>
        <li>
          <RoundButton
            className={`hover:bg-gray-200 ${styles.categoryItem}`}
            onClick={() => setIsShowCategories((prev) => !prev)}
          >
            카테고리
            <FiPlus />
          </RoundButton>
        </li>
        {selectedCategories.map((category) => (
          <li key={category}>
            <RoundButton
              className={`hover:bg-gray-200 ${styles.categoryItem}`}
              onClick={() => setIsShowCategories((prev) => !prev)}
            >
              {category}
            </RoundButton>
            <input
              type="hidden"
              name="category"
              value={category}
              className={`${styles.categoryItem} cursor-default`}
            />
          </li>
        ))}
      </ul>
      {isShowCategories && (
        <CategoryBox
          className={`${styles.categoriesContainer} mt-3`}
          selectedCategories={selectedCategories}
          buttonHandler={selectCategoryHandler}
        />
      )}
    </div>
  );
};
