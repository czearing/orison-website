"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";

// Constants - calculate once
const CIRCLE_RADIUS = 1;
const NODE_RADIUS = CIRCLE_RADIUS * 0.08;
const NODE_ANGLE = Math.PI / 6; // 2 o'clock position
const NODE_X = Math.sin(NODE_ANGLE) * CIRCLE_RADIUS;
const NODE_Y = Math.cos(NODE_ANGLE) * CIRCLE_RADIUS;
const RING_ANGLE = Math.PI / 2 - NODE_ANGLE;
const GAP_SIZE = 0.25;

export function GradientScene() {
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire group (circle with node) for orbit animation
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  // Scale based on viewport size - use smaller dimension to ensure it fits
  const scale = Math.min(viewport.width, viewport.height) * 0.3;

  return (
    <>
      <group ref={groupRef} scale={[scale, scale, 1]}>
        {/* Main circle - thin black stroke with gap */}
        <mesh>
          <ringGeometry args={[CIRCLE_RADIUS - 0.015, CIRCLE_RADIUS + 0.015, 128, 1, RING_ANGLE + GAP_SIZE / 2, Math.PI * 2 - GAP_SIZE]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Node - small filled circle at 2 o'clock */}
        <mesh position={[NODE_X, NODE_Y, 0]}>
          <circleGeometry args={[NODE_RADIUS, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </>
  );
}
