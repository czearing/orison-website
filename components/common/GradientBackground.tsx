"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GradientScene } from "./GradientScene";
import styles from "./GradientBackground.module.css";

export function GradientBackground() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pause animation when canvas is off-screen for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px' } // Start animating slightly before visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
        style={{ pointerEvents: 'none', background: '#FFFEF8' }}
        frameloop={isVisible ? 'always' : 'never'}
        events={() => null as any}
      >
        <GradientScene />
      </Canvas>
    </div>
  );
}
