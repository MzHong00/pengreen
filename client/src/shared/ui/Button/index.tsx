import styles from "./index.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      type="button"
      {...props}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};
