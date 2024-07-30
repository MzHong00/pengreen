import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";

import { GoToPageButton } from "./goToPageButton";

import styles from "./paginationSlider.module.css";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isShowLeftArrow: boolean;
  isShowRightArrow: boolean;
  leftSlideHandler: () => void;
  rightSlideHandler: () => void;
}

const ARROW_SIZE = 30;

export const PaginationSlider = ({
  page = 1,
  setPage,
  isShowLeftArrow = true,
  isShowRightArrow = true,
  leftSlideHandler,
  rightSlideHandler,
}: Partial<Props>) => {
  return (
    <nav className={styles.pageNavBox}>
      {isShowLeftArrow && (
        <div className={`${styles.sliderBtn} ${styles.sliderLeftBtn}`}>
          <IoIosArrowBack
            color="white"
            size={ARROW_SIZE}
            onClick={leftSlideHandler}
          />
          <GoToPageButton
            page={page - 1}
            setPage={setPage}
          />
        </div>
      )}

      {isShowRightArrow && (
        <div className={`${styles.sliderBtn} ${styles.sliderRightBtn}`}>
          <IoIosArrowForward
            color="white"
            size={ARROW_SIZE}
            onClick={rightSlideHandler}
          />
          <GoToPageButton
            page={page + 1}
            setPage={setPage}
          />
        </div>
      )}
    </nav>
  );
};
