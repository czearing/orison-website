"use client";

import Image from "next/image";
import { Heading, Caption } from "@/components/common/Typography";
import { TrackCardProps } from "./TrackCard.types";
import styles from "./TrackCard.module.css";

export function TrackCard({
  title,
  releaseDate,
  coverImage,
  spotifyEmbedUrl,
  spotifyUrl,
}: TrackCardProps) {
  // Parse date as local time (not UTC) by splitting and creating date
  const [year, month, day] = releaseDate.split('-').map(Number);
  const releaseDateObj = new Date(year, month - 1, day); // month is 0-indexed
  const now = new Date();
  const isUnreleased = releaseDateObj > now;

  // Format the date for display
  const formattedDate = releaseDateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  const handleClick = () => {
    // Only open Spotify if the track is released
    if (spotifyUrl && !isUnreleased) {
      window.open(spotifyUrl, '_blank');
    }
  };

  return (
    <div
      className={`${styles.card} ${isUnreleased ? styles.unreleased : ''}`}
      onClick={handleClick}
      role={spotifyUrl && !isUnreleased ? "button" : undefined}
      tabIndex={spotifyUrl && !isUnreleased ? 0 : undefined}
    >
      <div className={styles.coverWrapper}>
        <Image
          src={coverImage}
          alt={`${title} cover art`}
          width={400}
          height={400}
          className={styles.coverImage}
        />
        {isUnreleased ? (
          <div className={styles.comingSoonOverlay}>
            <Caption className={styles.comingSoonText}>Coming Soon</Caption>
          </div>
        ) : spotifyEmbedUrl ? (
          <div className={styles.playOverlay}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.playIcon}
            >
              <circle cx="24" cy="24" r="24" fill="rgba(0, 0, 0, 0.6)" />
              <path
                d="M18 14L34 24L18 34V14Z"
                fill="white"
              />
            </svg>
          </div>
        ) : null}
      </div>

      <div className={styles.info}>
        <Heading className={styles.title}>{title}</Heading>
        <Caption className={styles.date}>{formattedDate}</Caption>
      </div>
    </div>
  );
}
