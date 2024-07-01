import { HTMLAttributes, MouseEvent } from "react";

import { type Category, categories } from "entities/vote/vote";
import { useGlobalStore } from "shared/stores/useStore";
import { RoundButton } from "shared/ui/RoundButton";

import styles from "./selectCategory.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {}

export const CategoryBox = (props: Props) => {
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
    <ul {...props}>
      {categories.map((category) => (
        <li key={category}>
          <RoundButton
            className={`hover:bg-gray-200 ${styles.categoryItem} ${
              selectedCategories.includes(category) && `bg-gray-200`
            }`}
            onClick={selectCategoryHandler}
          >
            {category}
          </RoundButton>
        </li>
      ))}
    </ul>
  );
};
