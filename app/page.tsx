import { GradientBackground } from "@/components/common/GradientBackground";
import { Hero } from "@/components/sections/Hero";
import { SinglePreview } from "@/components/sections/SinglePreview";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <GradientBackground />
      <main className={styles.main}>
        <Hero />
        <SinglePreview
          title="Further"
          releaseDate="October 7, 2024"
          description="Electronic prayers for modern souls"
          coverImage="/images/Further.png"
        />
      </main>
    </>
  );
}
