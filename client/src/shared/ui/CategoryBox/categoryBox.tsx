import { forwardRef, HTMLAttributes, MouseEvent } from "react";
import { Category, categories } from "entities/vote/vote";
import { RoundButton } from "shared/ui/RoundButton";

import styles from "./categoryBox.module.css";

interface Props extends HTMLAttributes<HTMLUListElement> {
  selectedCategory?: Category;
  buttonHandler?: (props: MouseEvent<HTMLButtonElement>) => void;
}

export const CategoryBox = forwardRef<HTMLUListElement, Props>(
  ({ selectedCategory, buttonHandler, children, ...props }, ref) => {
    return (
      <ul {...props} ref={ref}>
        {children}
        {categories.map((category) => (
          <li key={category}>
            <RoundButton
              onClick={buttonHandler}
              className={`${styles.categoryButton} ${
                selectedCategory === category && styles.selectedButton
              }`}
            >
              {category}
            </RoundButton>
          </li>
        ))}
      </ul>
    );
  }
);

CategoryBox.displayName = "CategoryBox";
