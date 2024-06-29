import { categories } from "..";

import styles from "./selectCategory.module.css";

export const SelectCategory = () => {
  return (
    <ul className={styles.categoriesContainer}>
        {categories.map((category) => (
            <li className={styles.categoryItem}>{category}</li>
        ))}
    </ul>
  );
};
