import { Heading } from "@/components/common/Typography";
import { TrackCard } from "@/components/music/TrackCard";
import styles from "./page.module.css";

export default function MusicPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Heading className={styles.pageTitle}>Music</Heading>

          <div className={styles.grid}>
            <TrackCard
              title="Further"
              releaseDate="2025-10-07"
              coverImage="/images/Further.png"
              spotifyUrl="https://open.spotify.com/track/example"
              spotifyEmbedUrl="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp"
            />
          </div>
        </div>
      </main>
    </>
  );
}
