import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveShapeProps {
  hovered: boolean;
  setHovered: (hovered: boolean) => void;
}

const InteractiveShape = ({ hovered, setHovered }: InteractiveShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={hovered ? "#4A9B84" : "#64B5A0"}
          transparent
          opacity={hovered ? 0.8 : 0.6}
          distort={hovered ? 0.5 : 0.3}
          speed={3}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

interface InteractiveModelProps {
  className?: string;
}

const InteractiveModel = ({ className = "" }: InteractiveModelProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`${className} cursor-pointer`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#64B5A0" />
        
        <InteractiveShape hovered={hovered} setHovered={setHovered} />
      </Canvas>
    </div>
  );
};

export default InteractiveModel;
