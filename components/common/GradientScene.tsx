"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Mesh } from "three";

export function GradientScene() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;

    // Cold, reflective color palette with icy blues and silvers
    vec3 palette(float t) {
      vec3 a = vec3(0.15, 0.2, 0.3);
      vec3 b = vec3(0.2, 0.3, 0.4);
      vec3 c = vec3(0.3, 0.4, 0.6);
      vec3 d = vec3(0.5, 0.65, 0.85);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);

      // Create flowing, reflective patterns
      for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.3) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i * 0.3 + uTime * 0.05);

        // Slower, more contemplative movement
        d = sin(d * 6.0 + uTime * 0.15) / 6.0;
        d = abs(d);
        d = pow(0.015 / d, 1.4);

        finalColor += col * d;
      }

      // Reduced intensity for minimal aesthetic
      gl_FragColor = vec4(finalColor * 0.12, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
        }}
        transparent
      />
    </mesh>
  );
}
