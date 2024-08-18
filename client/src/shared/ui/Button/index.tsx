import styles from "./index.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ type="button", children, className, ...props }: Props) => {
  return (
    <button
      type={type}
      {...props}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};
