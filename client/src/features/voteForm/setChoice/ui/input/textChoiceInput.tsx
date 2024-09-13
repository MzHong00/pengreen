import { Button } from "shared/ui/Button";

import styles from "./choiceInput.module.css";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element;
  onClickIcon: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dataIndex?: number;
}

export const TextChoiceInput = ({
  icon,
  onClickIcon,
  dataIndex,
  className,
  children,
  ...props
}: Props) => {
  return (
    <div className={styles.textContainer}>
      <Button onClick={onClickIcon} data-index={dataIndex}>{icon}</Button>
      <input className={`${styles.textInput} ${className}`} data-index={dataIndex} {...props} />
      {children}
    </div>
  );
};
