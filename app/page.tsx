import { GradientBackground } from "@/components/common/GradientBackground";
import { Hero } from "@/components/sections/Hero";
import { SinglePreview } from "@/components/sections/SinglePreview";
import { EmailCapture } from "@/components/sections/EmailCapture";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <GradientBackground />
      <main className={styles.main}>
        <Hero />
        <SinglePreview
          title="Further"
          releaseDate="7 OCT 2024"
          description="There is only forward"
          coverImage="/images/Further.png"
          spotifyUrl=""
        />
        <EmailCapture />
      </main>
    </>
  );
}
