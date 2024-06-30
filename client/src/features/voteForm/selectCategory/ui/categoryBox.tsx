import { MouseEvent } from "react";

import { type Category, categories } from "entities/vote/vote";
import { useGlobalStore } from "shared/stores/useStore";
import { Button } from "shared/ui/Button";

import styles from "./selectCategory.module.css";

export const CategoryBox = () => {
  const selectedCategories = useGlobalStore((state) => state.formData.category);
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
    <ul className={`${styles.categoriesContainer} mt-3`}>
      {categories.map((category) => (
        <li key={category}>
          <Button
            className={`${styles.categoryItem} ${styles.hoverItem} ${
              selectedCategories.includes(category) &&
              styles.categoryItemSelected
            }`}
            onClick={selectCategoryHandler}
          >
            {category}
          </Button>
        </li>
      ))}
    </ul>
  );
};
