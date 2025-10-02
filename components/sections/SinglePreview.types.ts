/**
 * Props for the SinglePreview component
 */
export interface SinglePreviewProps {
  /** The title of the single/track */
  title: string;
  /** The release date of the single */
  releaseDate: string;
  /** A brief description or tagline for the single */
  description: string;
  /** Path to the cover art image */
  coverImage: string;
  /** Optional Spotify URL for pre-save or listening */
  spotifyUrl?: string;
  /** Optional SoundCloud URL for listening */
  soundcloudUrl?: string;
  /** Optional Spotify embed URL for player (e.g., https://open.spotify.com/embed/track/...) */
  spotifyEmbedUrl?: string;
  /** Optional SoundCloud embed URL for player */
  soundcloudEmbedUrl?: string;
  /** Optional direct audio file URL for custom HTML5 player */
  audioPreviewUrl?: string;
}
