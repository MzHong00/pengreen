import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";

import styles from "./paginationSlider.module.css";

interface Props {
  pageNumber: number;
  leftSlideHandler: () => void;
  rightSlideHandler: () => void;
}

const ARROW_SIZE = 30;

export const PaginationSlider = ({
  pageNumber,
  leftSlideHandler,
  rightSlideHandler,
}: Props) => {
  return (
    <nav className={styles.pageNavBox}>
      {pageNumber > 1 && (
        <div
          className={`${styles.sliderBtn} ${styles.sliderLeftBtn}`}
          onClick={leftSlideHandler}
        >
          <IoIosArrowBack color="white" size={ARROW_SIZE} />
        </div>
      )}
      <div
        className={`${styles.sliderBtn} ${styles.sliderRightBtn}`}
        onClick={rightSlideHandler}
      >
        <IoIosArrowForward color="white" size={ARROW_SIZE} />
      </div>
    </nav>
  );
};
