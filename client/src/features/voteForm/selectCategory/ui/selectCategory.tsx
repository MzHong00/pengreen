import { FiPlus } from "react-icons/fi";

import { CategoryBox } from "./categoryBox";
import { Button } from "shared/ui/Button";
import { useGlobalStore } from "shared/stores/useStore";

import styles from "./selectCategory.module.css";
import { useToggle } from "shared/hooks/useToggle";

export const SelectCategory = () => {
  const selectedCategories = useGlobalStore((state) => state.formData.category);
  const [isTrue, setIsTrue] = useToggle();

  return (
    <div>
      <ul className={styles.categoriesContainer}>
        <li>
          <Button
            className={`${styles.categoryItem} ${styles.hoverItem}`}
            onClick={() => setIsTrue()}
          >
            카테고리
            <FiPlus />
          </Button>
        </li>
        {selectedCategories.map((category) => (
          <li key={category} className={styles.categoryItem}>
            {category}
          </li>
        ))}
      </ul>
      {isTrue && <CategoryBox />}
    </div>
  );
};
