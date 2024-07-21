import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";

import styles from "./sliderPagination.module.css";

interface Props {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const ARROW_SIZE = 30;

export const SliderPagination = ({ pageNumber, setPageNumber }: Props) => {
  const leftArrowHandler = () => {
    if (pageNumber < 1) return;
    setPageNumber((prev) => prev - 1);
  };

  const rightArrowHandler = () => {
    setPageNumber((prev) => prev + 1);
  };

  return (
    <nav className={styles.pageNavBox}>
      {pageNumber > 0 && (
        <div
          className={`${styles.sliderBtn} ${styles.sliderLeftBtn} `}
          onClick={leftArrowHandler}
        >
          <IoIosArrowBack color="white" size={ARROW_SIZE} />
        </div>
      )}
      <div
        className={`${styles.sliderBtn} ${styles.sliderRightBtn} `}
        onClick={rightArrowHandler}
      >
        <IoIosArrowForward color="white" size={ARROW_SIZE} />
      </div>
    </nav>
  );
};
