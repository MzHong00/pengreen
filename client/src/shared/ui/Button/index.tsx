import styles from './index.module.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...props }: Props) => {

  return (
    <button {...props} className={`${styles.container} ${className}`}>
        {children}
    </button>
  )
};
