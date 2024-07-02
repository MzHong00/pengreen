import { CategoryBox } from "shared/ui/CategoryBox/categoryBox";

import styles from "./selectCategory.module.css";

export const SelectCategory = () => {
  return (
    <nav className={styles.categoryCotainer}>
      <CategoryBox className={styles.category} />
    </nav>
  );
};
