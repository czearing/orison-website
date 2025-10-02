"use client";

import { Canvas } from "@react-three/fiber";
import { GradientScene } from "./GradientScene";
import styles from "./GradientBackground.module.css";

export function GradientBackground() {
  return (
    <div className={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      >
        <GradientScene />
      </Canvas>
    </div>
  );
}
