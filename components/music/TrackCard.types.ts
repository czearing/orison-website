/**
 * Props for the TrackCard component
 */
export interface TrackCardProps {
  /** The title of the track */
  title: string;
  /** The release date in YYYY-MM-DD format (e.g., "2024-10-07") */
  releaseDate: string;
  /** Path to the cover art image */
  coverImage: string;
  /** Optional Spotify embed URL for player */
  spotifyEmbedUrl?: string;
  /** Optional Spotify URL for external link */
  spotifyUrl?: string;
}
