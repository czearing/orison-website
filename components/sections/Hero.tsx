"use client";

import { useEffect, useState } from "react";
import { Display, Label } from "@/components/common/Typography";
import styles from "./Hero.module.css";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={`${styles.content} ${mounted ? styles.visible : ""}`}>
        <div className={styles.titleWrapper}>
          <Display className={styles.title}>
            {"ORISON".split("").map((letter, i) => (
              <span
                key={i}
                className={styles.letter}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {letter}
              </span>
            ))}
          </Display>
          <div className={styles.titleGlow} />
        </div>
        <Label className={styles.subtitle}>Neo-Classical Progressive House</Label>
        <div className={styles.ornament}>
          <div className={styles.ornamentLine} />
          <div className={styles.ornamentDot} />
          <div className={styles.ornamentLine} />
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
