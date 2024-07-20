import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";

import styles from "./votePagination.module.css";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ARROW_SIZE = 30;

export const SliderPagination = ({ setPage }: Props) => {
  const leftArrowHandler = () => {
    setPage((prev) => prev - 1);
  };

  const rightArrowHandler = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <nav className={styles.pageNavBox}>
      <div
        className={`${styles.sliderBtn} ${styles.sliderLeftBtn} `}
        onClick={leftArrowHandler}
      >
        <IoIosArrowBack color="white" size={ARROW_SIZE} />
      </div>
      <div
        className={`${styles.sliderBtn} ${styles.sliderRightBtn} `}
        onClick={rightArrowHandler}
      >
        <IoIosArrowForward color="white" size={ARROW_SIZE} />
      </div>
    </nav>
  );
};
