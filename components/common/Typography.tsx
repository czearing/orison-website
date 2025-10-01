import styles from "./Typography.module.css";
import {
  DisplayProps,
  HeadingProps,
  BodyProps,
  LabelProps,
  CaptionProps,
} from "./Typography.types";

/**
 * Large hero title component for primary headings.
 * Uses display font with dramatic sizing for maximum impact.
 */
export function Display({ children, className = "" }: DisplayProps) {
  return <h1 className={`${styles.display} ${className}`}>{children}</h1>;
}

/**
 * Section heading component with configurable heading levels (h1-h4).
 * Defaults to h2. Styled with uppercase and tight letter spacing.
 */
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

/**
 * Body text component with three size variants (sm, md, lg).
 * Used for paragraphs and general content text.
 */
export function Body({ children, size = "md", className = "" }: BodyProps) {
  return (
    <p className={`${styles.body} ${styles[`body${size.charAt(0).toUpperCase() + size.slice(1)}`]} ${className}`}>
      {children}
    </p>
  );
}

/**
 * Small uppercase label component for compact, emphasized text.
 * Uses monospace font with increased letter spacing.
 */
export function Label({ children, className = "" }: LabelProps) {
  return <span className={`${styles.label} ${className}`}>{children}</span>;
}

/**
 * Caption component for metadata, dates, and supplementary information.
 * Rendered in monospace font with uppercase styling.
 */
export function Caption({ children, className = "" }: CaptionProps) {
  return <p className={`${styles.caption} ${className}`}>{children}</p>;
}
