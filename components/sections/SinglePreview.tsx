"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./SinglePreview.module.css";

interface SinglePreviewProps {
  title: string;
  releaseDate: string;
  description: string;
  coverImage: string;
  spotifyUrl?: string;
  soundcloudUrl?: string;
}

export function SinglePreview({
  title,
  releaseDate,
  description,
  coverImage,
  spotifyUrl,
  soundcloudUrl,
}: SinglePreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
          <span className={styles.label}>Next Single</span>

          <div className={styles.coverWrapper}>
            <div className={styles.coverGlow} />
            <Image
              src={coverImage}
              alt={`${title} cover art`}
              width={400}
              height={400}
              className={styles.coverImage}
              priority
            />
          </div>

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.date}>{releaseDate}</p>

          {(spotifyUrl || soundcloudUrl) && (
            <div className={styles.playerContainer}>
              <div className={styles.playerPlaceholder}>
                <p className={styles.playerText}>
                  Embedded Spotify/SoundCloud player when available
                </p>
              </div>
            </div>
          )}

          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
}
