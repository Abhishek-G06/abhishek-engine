import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const SmallAccent = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#64B5A0"
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
    </Float>
  );
};

interface DecorativeAccentProps {
  className?: string;
}

const DecorativeAccent = ({ className = "" }: DecorativeAccentProps) => {
  return (
    <div className={`${className} pointer-events-none`}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={0.4} />
        
        <SmallAccent />
      </Canvas>
    </div>
  );
};

export default DecorativeAccent;
