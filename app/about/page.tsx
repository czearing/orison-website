import Image from "next/image";
import { Heading, Body } from "@/components/common/Typography";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/bio-pic.png"
              alt="ORISON"
              width={400}
              height={400}
              className={styles.bioPic}
              priority
            />
          </div>
          <div className={styles.content}>
            <Body size="lg" className={styles.text}>
              Seattle producer ORISON makes music for the space between memory and motion—felt piano and close-mic&apos;d strings woven into hypnotic, driving rhythms.
            </Body>
            <Body size="lg" className={styles.text}>
              Born from creative claustrophobia with repetitive loops, he returned to his classical piano roots and discovered something urgent: what happens when raw, emotional storytelling meets unrelenting forward momentum.
            </Body>
            <div className={styles.pullQuote}>
              The result feels like nostalgia for a future you haven&apos;t lived yet.
            </div>
            <Body size="lg" className={styles.text}>
              His tracks mirror Seattle itself: rain-soaked melancholy in the melodies, relentless pulse in the beats. People listen during late-night drives and sunrise dance floors, anywhere the inner world needs to meet the outer one.
            </Body>
            <Body size="lg" className={styles.text}>
              Music that moves you while making you feel.
            </Body>
          </div>
        </div>
      </main>
    </>
  );
}
