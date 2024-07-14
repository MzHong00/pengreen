import { type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { CategoryBox } from "shared/ui/CategoryBox/categoryBox";

import styles from "./selectCategory.module.css";

export const SelectCategory = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const setCateParamstHandler = (event: MouseEvent<HTMLElement>) => {
    searchParams.append('category',event.currentTarget.innerHTML)
    setSearchParams(searchParams);
  };

  return (
    <nav className={styles.categoryCotainer}>
      <CategoryBox
        className={styles.category}
        buttonHandler={setCateParamstHandler}
      />
    </nav>
  );
};
