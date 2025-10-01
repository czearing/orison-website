"use client";

import { useEffect, useState, useMemo } from "react";
import { Display } from "@/components/common/Typography";
import styles from "./Hero.module.css";

// Memoize the letter array outside component to avoid recreation on every render
const TITLE_LETTERS = "ORISON".split("");

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smoother initial animation
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Memoize the letter elements to avoid recreating on every render
  const letterElements = useMemo(
    () =>
      TITLE_LETTERS.map((letter, i) => (
        <span
          key={i}
          className={styles.letter}
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          {letter}
        </span>
      )),
    []
  );

  return (
    <section className={styles.hero}>
      <div className={`${styles.content} ${mounted ? styles.visible : ""}`}>
        <div className={styles.titleWrapper}>
          <Display className={styles.title}>{letterElements}</Display>
          <div className={styles.titleGlow} />
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
