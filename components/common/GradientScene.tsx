"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";

export function GradientScene() {
  const groupRef = useRef<Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire group (circle with node) for orbit animation
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  // Scale based on viewport size - use smaller dimension to ensure it fits
  const scale = Math.min(viewport.width, viewport.height) * 0.3;
  const circleRadius = 1;
  const nodeRadius = circleRadius * 0.08;

  // 2 o'clock position: 60 degrees (π/3 radians) from top
  const nodeAngle = -Math.PI / 6; // -30 degrees (60 degrees clockwise from 12 o'clock)
  const nodeX = Math.sin(nodeAngle) * circleRadius;
  const nodeY = Math.cos(nodeAngle) * circleRadius;

  return (
    <>
      {/* White background */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      <group ref={groupRef} scale={[scale, scale, 1]}>
        {/* Main circle - thin black stroke */}
        <mesh>
          <ringGeometry args={[circleRadius - 0.015, circleRadius + 0.015, 128]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Node - small filled circle at 2 o'clock */}
        <mesh position={[nodeX, nodeY, 0]}>
          <circleGeometry args={[nodeRadius, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </>
  );
}
