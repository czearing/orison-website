import { ReactNode } from "react";

/**
 * Props for the Display component
 */
export interface DisplayProps {
  /** The content to display */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Props for the Heading component
 */
export interface HeadingProps {
  /** The content to display */
  children: ReactNode;

  /** The heading level (h1-h4) */
  level?: 1 | 2 | 3 | 4;

  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Props for the Body component
 */
export interface BodyProps {
  /** The content to display */
  children: ReactNode;

  /** The size variant of the body text */
  size?: "sm" | "md" | "lg";

  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Props for the Label component
 */
export interface LabelProps {
  /** The content to display */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Props for the Caption component
 */
export interface CaptionProps {
  /** The content to display */
  children: ReactNode;

  /** Additional CSS classes to apply */
  className?: string;
}
