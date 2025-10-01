import { Heading, Body } from "@/components/common/Typography";
import styles from "./page.module.css";

export default function ShopPage() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Heading className={styles.heading}>Shop</Heading>
          <Body size="lg" className={styles.text}>
            Coming soon. Merch and exclusive releases.
          </Body>
        </div>
      </main>
    </>
  );
}
