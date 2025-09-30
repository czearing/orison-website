"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Heading, Label, Body, Caption } from "@/components/common/Typography";
import { Button } from "@/components/common/Button";
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
        <div className={`${styles.grid} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.header}>
            <Label className={styles.label}>Next Single</Label>
          </div>

          <div className={styles.coverArea}>
            <div className={styles.coverWrapper}>
              <div className={styles.coverGlow} />
              <Image
                src={coverImage}
                alt={`${title} cover art`}
                width={500}
                height={500}
                className={styles.coverImage}
                priority
              />
            </div>
          </div>

          <div className={styles.infoArea}>
            <Heading className={styles.title}>{title}</Heading>
            <Caption className={styles.date}>{releaseDate}</Caption>
            <Body size="lg" className={styles.description}>
              {description}
            </Body>

            <div className={styles.ctaContainer}>
              <Button href={spotifyUrl || "#"} variant="primary">
                Pre-Save on Spotify
              </Button>
              {soundcloudUrl && (
                <Button href={soundcloudUrl} variant="secondary">
                  Listen on SoundCloud
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
