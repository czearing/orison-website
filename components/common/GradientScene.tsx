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

    // Monochromatic noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    // Smooth noise for organic movement
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));

      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = vUv;
      vec3 finalColor = vec3(0.0);

      // Base dark gray
      finalColor = vec3(0.06, 0.065, 0.07);

      // Very slow, subtle rain streaks - barely visible
      for (float i = 0.0; i < 20.0; i++) {
        float x = fract(i * 0.051);
        float speed = 0.08 + noise(vec2(x, i)) * 0.12;
        float y = fract(uv.y - uTime * speed + i * 0.214);
        float streak = smoothstep(0.015, 0.0, abs(uv.x - x)) * smoothstep(1.0, 0.97, y);
        finalColor += vec3(0.09, 0.095, 0.1) * streak * 0.15;
      }

      // Extremely subtle atmospheric variation - almost static
      float atmosphere = smoothNoise(uv * 2.0 + uTime * 0.01);
      atmosphere += smoothNoise(uv * 4.0 - uTime * 0.008) * 0.5;
      finalColor += vec3(0.02, 0.022, 0.025) * atmosphere * 0.3;

      // Gentle vertical gradient (darker at top, slightly lighter at bottom)
      float verticalGrad = smoothstep(0.0, 1.0, uv.y);
      finalColor += vec3(0.015, 0.017, 0.02) * verticalGrad * 0.5;

      gl_FragColor = vec4(finalColor, 1.0);
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
