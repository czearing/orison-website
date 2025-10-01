"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Caption } from "@/components/common/Typography";
import styles from "./Presence.module.css";

interface PlatformLink {
  name: string;
  url: string;
  icon: string;
}

const platforms: PlatformLink[] = [
  { name: "Spotify", url: "https://open.spotify.com/artist/your-id", icon: "/icons/SpotifyLogo.svg" },
  { name: "Apple Music", url: "https://music.apple.com/artist/your-id", icon: "/icons/AppleMusicLogo.svg" },
  { name: "SoundCloud", url: "https://soundcloud.com/your-id", icon: "/icons/SoundcloudLogo.svg" },
  { name: "YouTube", url: "https://youtube.com/@your-id", icon: "/icons/YouTubeLogo.svg" },
];

export function Presence() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`${styles.container} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.platforms}>
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label={platform.name}
            >
              <Image
                src={platform.icon}
                alt={platform.name}
                width={24}
                height={24}
                className={styles.icon}
              />
            </a>
          ))}
        </div>

        <Caption className={styles.contact}>
          contact: <a href="mailto:management@orison.band" className={styles.email}>management@orison.band</a>
        </Caption>
      </div>
    </section>
  );
}
