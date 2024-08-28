import { Button } from "shared/ui/Button";

import styles from "./submitFormBox.module.css";

interface Props {
  onSubmit: (e: React.MouseEvent<HTMLInputElement>) => void;
  invalidationItems: string[];
}

export const SubmitFormBox = ({ onSubmit, invalidationItems }: Props) => {
  return (
    <div>
      <h2 className={styles.title}>투표를 생성 하시겠습니까?</h2>
      <section className={styles.validationCheckBar}>
        {invalidationItems.length === 0 ? (
          <>
            <p className={`${styles.vaildationText} ${styles.passText}`}>
              *투표를 생성할 수 있습니다.
            </p>
            <input
              type="button"
              value="예"
              className={`${styles.createButton} ${styles.activeButton}`}
              onClick={onSubmit}
            />
          </>
        ) : (
          <>
            {invalidationItems.map((item) => (
              <p
                key={item}
                className={`${styles.vaildationText} ${styles.failText}`}
              >
                *{item} 입력이 올바르지 않습니다.
              </p>
            ))}
            <Button
              className={`${styles.createButton} ${styles.inActiveButton}`}
              disabled
            >
              예
            </Button>
          </>
        )}
      </section>
    </div>
  );
};
