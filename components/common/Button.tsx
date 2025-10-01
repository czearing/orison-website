import styles from "./Button.module.css";
import { ButtonProps } from "./Button.types";

/**
 * A flexible button component that can render as either a button or an anchor tag
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
