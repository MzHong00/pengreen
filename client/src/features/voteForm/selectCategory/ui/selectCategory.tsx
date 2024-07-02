import { type MouseEvent } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

import { Category } from "entities/vote/vote";
import { useGlobalStore } from "shared/stores/useStore";
import { useToggle } from "shared/hooks/useToggle";
import { RoundButton } from "shared/ui/RoundButton";
import { CategoryBox } from "shared/ui/CategoryBox/categoryBox";

import styles from "./selectCategory.module.css";

export const SelectCategory = () => {
  const selectedCategories = useGlobalStore((state) => state.formData.category);
  const [isTrue, setIsTrue] = useToggle();
  const setFormData = useGlobalStore((state) => state.setFormData);

  const selectCategoryHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const targetText = event.currentTarget.innerText as Category;

    if (selectedCategories.includes(targetText)) {
      setFormData({
        category: selectedCategories.filter((item) => item !== targetText),
      });
    } else {
      if (selectedCategories.length >= 3) selectedCategories.shift();

      setFormData({
        category: [...selectedCategories, targetText],
      });
    }
  };
  return (
    <div>
      <ul className={styles.categoriesContainer}>
        <li>
          <RoundButton
            className={`hover:bg-gray-200 ${styles.categoryItem}`}
            onClick={() => setIsTrue()}
          >
            카테고리
            <FiPlus />
          </RoundButton>
        </li>
        {selectedCategories.map((category) => (
          <li key={category}>
            <RoundButton className={`${styles.categoryItem} cursor-default`}>
              {category}
            </RoundButton>
          </li>
        ))}
      </ul>
      {isTrue && (
        <CategoryBox
          className={`${styles.categoriesContainer} mt-3`}
          selectedCategories={selectedCategories}
          buttonHandler={selectCategoryHandler}
        />
      )}
    </div>
  );
};
