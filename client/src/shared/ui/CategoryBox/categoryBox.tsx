import React, { forwardRef, HTMLAttributes, MouseEvent } from "react";
import { Category, categories } from "entities/vote/vote";
import { RoundButton } from "shared/ui/RoundButton";
import styles from "./categoryBox.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {
  selectedCategories?: Category[];
  buttonHandler?: (props: MouseEvent<HTMLButtonElement>) => void;
}

export const CategoryBox = forwardRef<HTMLUListElement, Props>(
  ({ selectedCategories, buttonHandler, ...props }, ref) => {
    return (
      <ul {...props} ref={ref}>
        {categories.map((category) => (
            <RoundButton
            key={category}
              className={`${styles.categoryButton} ${
                selectedCategories?.includes(category) && styles.selectedButton
              }`}
              onClick={buttonHandler}
            >
              {category}
            </RoundButton>
        ))}
      </ul>
    );
  }
);

CategoryBox.displayName = "CategoryBox";
