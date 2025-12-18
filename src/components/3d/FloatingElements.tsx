import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "box" | "sphere" | "octahedron" | "torus" | "cone";
  scale?: number;
  color?: string;
  wireframe?: boolean;
  speed?: number;
}

const FloatingShape = ({
  position,
  geometry,
  scale = 1,
  color = "#64B5A0",
  wireframe = false,
  speed = 1,
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  const getGeometry = () => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case "cone":
        return <coneGeometry args={[0.5, 1, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={wireframe ? 0.6 : 0.4}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  );
};

interface FloatingElementsProps {
  variant: "about" | "skills" | "projects";
}

const FloatingElements = ({ variant }: FloatingElementsProps) => {
  const configs = {
    about: [
      { position: [-3, 1, 0] as [number, number, number], geometry: "octahedron" as const, scale: 0.8, wireframe: true, speed: 1.2 },
      { position: [3, -0.5, -1] as [number, number, number], geometry: "torus" as const, scale: 0.6, wireframe: true, speed: 1.5 },
      { position: [2, 1.5, -2] as [number, number, number], geometry: "sphere" as const, scale: 0.4, wireframe: false, speed: 1 },
    ],
    skills: [
      { position: [-2.5, 0.5, 0] as [number, number, number], geometry: "box" as const, scale: 0.5, wireframe: true, speed: 1.3 },
      { position: [2.5, -1, -1] as [number, number, number], geometry: "cone" as const, scale: 0.6, wireframe: true, speed: 1.1 },
      { position: [0, 1.5, -2] as [number, number, number], geometry: "octahedron" as const, scale: 0.4, wireframe: false, speed: 1.4 },
    ],
    projects: [
      { position: [-3, 0, 0] as [number, number, number], geometry: "torus" as const, scale: 0.7, wireframe: true, speed: 1.2 },
      { position: [3, 1, -1] as [number, number, number], geometry: "sphere" as const, scale: 0.5, wireframe: false, speed: 1.6 },
      { position: [-1.5, -1, -2] as [number, number, number], geometry: "box" as const, scale: 0.4, wireframe: true, speed: 1 },
    ],
  };

  const shapes = configs[variant];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.2} color="#64B5A0" />
        
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            position={shape.position}
            geometry={shape.geometry}
            scale={shape.scale}
            color="#64B5A0"
            wireframe={shape.wireframe}
            speed={shape.speed}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingElements;
