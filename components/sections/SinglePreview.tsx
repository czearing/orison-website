"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Heading, Label, Body, Caption } from "@/components/common/Typography";
import { Button } from "@/components/common/Button";
import styles from "./SinglePreview.module.css";
import { SinglePreviewProps } from "./SinglePreview.types";

/**
 * Component to preview an upcoming or recently released single.
 * Displays cover art, release information, and streaming links.
 */
export function SinglePreview({
  title,
  releaseDate,
  description,
  coverImage,
  spotifyUrl,
  soundcloudUrl,
}: SinglePreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first intersection for performance
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!coverRef.current) return;

    // Throttle using requestAnimationFrame for smooth 60fps updates
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = undefined;

      if (!coverRef.current) return;

      const rect = coverRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 5;

      setTransform({ rotateX, rotateY });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section ref={sectionRef} className={styles.section} data-dark-section>
      <div className={styles.container}>
        <div className={`${styles.grid} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.header}>
            <Label className={styles.label}>Next Single</Label>
          </div>

          <div className={styles.coverArea}>
            <div
              ref={coverRef}
              className={styles.coverWrapper}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
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
