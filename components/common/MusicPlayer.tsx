"use client";

import { useMemo } from "react";
import { MusicPlayerProps, PlayerType } from "./MusicPlayer.types";
import styles from "./MusicPlayer.module.css";

export function MusicPlayer({
  spotifyEmbedUrl,
  soundcloudEmbedUrl,
  audioPreviewUrl,
  trackTitle = "Track preview",
  className = "",
}: MusicPlayerProps) {
  // Determine which player type to use based on available sources
  const playerType: PlayerType = useMemo(() => {
    if (spotifyEmbedUrl) return 'spotify';
    if (soundcloudEmbedUrl) return 'soundcloud';
    if (audioPreviewUrl) return 'audio';
    return 'none';
  }, [spotifyEmbedUrl, soundcloudEmbedUrl, audioPreviewUrl]);

  if (playerType === 'none') {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {playerType === 'spotify' && (
        <iframe
          src={spotifyEmbedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Spotify player - ${trackTitle}`}
          className={styles.spotifyPlayer}
        />
      )}

      {playerType === 'soundcloud' && (
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={soundcloudEmbedUrl}
          title={`SoundCloud player - ${trackTitle}`}
          className={styles.soundcloudPlayer}
        />
      )}

      {playerType === 'audio' && (
        <audio
          controls
          preload="none"
          className={styles.audioPlayer}
          aria-label={`Audio player - ${trackTitle}`}
        >
          <source src={audioPreviewUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
