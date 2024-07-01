import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

import { CategoryBox } from "./categoryBox";
import { useGlobalStore } from "shared/stores/useStore";

import styles from "./selectCategory.module.css";
import { useToggle } from "shared/hooks/useToggle";
import { RoundButton } from "shared/ui/RoundButton";

export const SelectCategory = () => {
  const selectedCategories = useGlobalStore((state) => state.formData.category);
  const [isTrue, setIsTrue] = useToggle();

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
        <CategoryBox className={`${styles.categoriesContainer} mt-3`} />
      )}
    </div>
  );
};
