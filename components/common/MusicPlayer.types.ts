/**
 * Props for the MusicPlayer component
 */
export interface MusicPlayerProps {
  /** Spotify embed URL (e.g., https://open.spotify.com/embed/track/...) */
  spotifyEmbedUrl?: string;
  /** SoundCloud embed URL */
  soundcloudEmbedUrl?: string;
  /** Direct audio file URL for custom HTML5 player */
  audioPreviewUrl?: string;
  /** Track title for accessibility */
  trackTitle?: string;
  /** Optional class name for styling */
  className?: string;
}

/**
 * Player type based on available sources
 */
export type PlayerType = 'spotify' | 'soundcloud' | 'audio' | 'none';
