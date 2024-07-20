import { useRef, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";

import { type Category } from "entities/vote/vote";
import { CategoryBox } from "shared/ui/CategoryBox/categoryBox";
import { Button } from "shared/ui/Button";

import styles from "./selectCategory.module.css";

const ARROW_SIZE = 20;
const MOVE_DISTANCE = 250;

export const SelectCategory = () => {
  const boxRef = useRef<HTMLUListElement>(null);
  let [searchParams, setSearchParams] = useSearchParams();

  const setCateParamstHandler = (event: MouseEvent<HTMLElement>) => {
    searchParams.set("category", event.currentTarget.innerHTML);
    setSearchParams(searchParams);
  };

  const leftArrowHandler = () => {
    boxRef.current?.scrollBy({ left: -MOVE_DISTANCE });
  };

  const rightArrowHandler = () => {
    boxRef.current?.scrollBy({ left: MOVE_DISTANCE });
  };

  return (
    <nav className={styles.categoryCotainer}>
      <Button className={styles.arrowButton} onClick={leftArrowHandler}>
        <IoIosArrowBack size={ARROW_SIZE} />
      </Button>
      <CategoryBox
        ref={boxRef}
        className={styles.category}
        selectedCategories={searchParams.getAll("category") as Category[]}
        buttonHandler={setCateParamstHandler}
      />
      <Button className={styles.arrowButton} onClick={rightArrowHandler}>
        <IoIosArrowForward size={ARROW_SIZE} />
      </Button>
    </nav>
  );
};
