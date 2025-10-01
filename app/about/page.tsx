import { Heading, Body } from "@/components/common/Typography";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Heading className={styles.heading}>About ORISON</Heading>
          <div className={styles.content}>
            <Body size="lg" className={styles.text}>
              ORISON is a music project exploring the intersection of classical composition
              and modern electronic production.
            </Body>
            <Body size="lg" className={styles.text}>
              Through carefully crafted soundscapes and emotive progressions, ORISON creates
              immersive musical experiences that transcend genre boundaries.
            </Body>
          </div>
        </div>
      </main>
    </>
  );
}
