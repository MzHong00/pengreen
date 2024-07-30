import { type MouseEventHandler, useRef } from "react";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";

import { type Category } from "entities/vote/vote";
import { CategoryBox } from "shared/ui/CategoryBox/categoryBox";
import { Button } from "shared/ui/Button";
import { RoundButton } from "shared/ui/RoundButton";

import styles from "./selectCategory.module.css";

const ARROW_SIZE = 20;
const MOVE_DISTANCE = 250;

interface Props {
  selectedCategory: Category;
  selectHandler: MouseEventHandler;
  removeSelectHandler: MouseEventHandler;
}

export const SelectCategory = ({
  selectedCategory,
  selectHandler,
  removeSelectHandler,
}: Props) => {
  const boxRef = useRef<HTMLUListElement>(null);

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
        selectedCategory={selectedCategory}
        buttonHandler={selectHandler}
      >
        <RoundButton
          className={`${styles.categoryButton} ${
            !selectedCategory && styles.selectedButton
          }`}
          onClick={removeSelectHandler}
        >
          전체
        </RoundButton>
      </CategoryBox>
      <Button className={styles.arrowButton} onClick={rightArrowHandler}>
        <IoIosArrowForward size={ARROW_SIZE} />
      </Button>
    </nav>
  );
};
