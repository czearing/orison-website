import { ReactNode } from "react";

/**
 * Props for the Button component
 */
export interface ButtonProps {
  /** The content to display inside the button */
  children: ReactNode;

  /** Optional URL - if provided, renders as a link instead of a button */
  href?: string;

  /** Click handler - only used when href is not provided */
  onClick?: () => void;

  /** Visual style variant of the button */
  variant?: "primary" | "secondary";

  /** Additional CSS classes to apply */
  className?: string;
}
