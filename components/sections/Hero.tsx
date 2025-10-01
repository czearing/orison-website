"use client";

import { useEffect, useState } from "react";
import { Display } from "@/components/common/Typography";
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
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
