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
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`${styles.heading} ${className}`}>{children}</Tag>;
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
