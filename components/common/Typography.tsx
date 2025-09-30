import { ReactNode } from "react";
import styles from "./Typography.module.css";

interface DisplayProps {
  children: ReactNode;
  className?: string;
}

export function Display({ children, className = "" }: DisplayProps) {
  return <h1 className={`${styles.display} ${className}`}>{children}</h1>;
}

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Heading({ children, level = 2, className = "" }: HeadingProps) {
  const combinedClassName = `${styles.heading} ${className}`;

  switch (level) {
    case 1:
      return <h1 className={combinedClassName}>{children}</h1>;
    case 3:
      return <h3 className={combinedClassName}>{children}</h3>;
    case 4:
      return <h4 className={combinedClassName}>{children}</h4>;
    default:
      return <h2 className={combinedClassName}>{children}</h2>;
  }
}

interface BodyProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Body({ children, size = "md", className = "" }: BodyProps) {
  return (
    <p className={`${styles.body} ${styles[`body${size.charAt(0).toUpperCase() + size.slice(1)}`]} ${className}`}>
      {children}
    </p>
  );
}

interface LabelProps {
  children: ReactNode;
  className?: string;
}

export function Label({ children, className = "" }: LabelProps) {
  return <span className={`${styles.label} ${className}`}>{children}</span>;
}

interface CaptionProps {
  children: ReactNode;
  className?: string;
}

export function Caption({ children, className = "" }: CaptionProps) {
  return <p className={`${styles.caption} ${className}`}>{children}</p>;
}
