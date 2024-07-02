import { HTMLAttributes, type MouseEvent } from "react";

import { type Category, categories } from "entities/vote/vote";
import { RoundButton } from "shared/ui/RoundButton";

import styles from "./categoryBox.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {
  selectedCategories: Category[];
  buttonHandler: (props: MouseEvent<HTMLButtonElement>) => void;
}

export const CategoryBox = ({
  selectedCategories,
  buttonHandler,
  ...props
}: Partial<Props>) => {
  return (
    <ul {...props}>
      {categories.map((category) => (
        <li key={category}>
          <RoundButton
            className={`hover:bg-gray-200 ${styles.categoryItem} ${
              selectedCategories?.includes(category) && `bg-gray-200`
            }`}
            onClick={buttonHandler}
          >
            {category}
          </RoundButton>
        </li>
      ))}
    </ul>
  );
};
