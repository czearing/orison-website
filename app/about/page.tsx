import { Heading, Body } from "@/components/common/Typography";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Heading className={styles.heading}>About</Heading>
          <div className={styles.content}>
            <Body size="lg" className={styles.text}>
              Seattle producer ORISON creates music that shouldn't exist: neo-classical piano and strings woven into the hypnotic drive of progressive house.
            </Body>
            <Body size="lg" className={styles.text}>
              Born from creative claustrophobia with repetitive electronic loops, he returned to his classical piano roots and discovered something urgent—what happens when raw, emotional storytelling meets unrelenting forward momentum. The result feels like nostalgia for a future you haven't lived yet.
            </Body>
            <Body size="lg" className={styles.text}>
              His tracks mirror Seattle itself: rain-soaked melancholy in the melodies, relentless technological pulse in the beats. People listen during late-night drives and sunrise dance floors, anywhere the inner world needs to meet the outer one. They say specific phrases get stuck in their heads, attaching to their own memories and moments.
            </Body>
            <Body size="lg" className={styles.text}>
              Currently unreleased but quietly circulating among DJs and friends, ORISON's music moves through the dark like rumor—photographs in an attic that burst into motion when touched.
            </Body>
          </div>
        </div>
      </main>
    </>
  );
}
