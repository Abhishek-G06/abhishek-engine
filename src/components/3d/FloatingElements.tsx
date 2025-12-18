import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { use3DThemeColors, ThemeColors } from "@/hooks/use-3d-theme-colors";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "box" | "sphere" | "octahedron" | "torus" | "cone";
  scale?: number;
  color?: string;
  wireframe?: boolean;
  speed?: number;
  mouseInfluence?: number;
}

const mouseStore = { x: 0, y: 0 };

const FloatingShape = ({
  position,
  geometry,
  scale = 1,
  color = "#64B5A0",
  wireframe = false,
  speed = 1,
  mouseInfluence = 0.3,
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPosition = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      
      // Mouse follow effect
      const targetX = originalPosition.current.x + mouseStore.x * mouseInfluence;
      const targetY = originalPosition.current.y + mouseStore.y * mouseInfluence;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02);
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
          opacity={wireframe ? 0.7 : 0.5}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  );
};

const MouseTracker = () => {
  const { viewport } = useThree();
  
  useFrame(({ pointer }) => {
    mouseStore.x = (pointer.x * viewport.width) / 2;
    mouseStore.y = (pointer.y * viewport.height) / 2;
  });
  
  return null;
};

interface SceneProps {
  shapes: Array<{
    position: [number, number, number];
    geometry: "box" | "sphere" | "octahedron" | "torus" | "cone";
    scale: number;
    wireframe: boolean;
    speed: number;
    mouseInfluence: number;
  }>;
  colors: ThemeColors;
}

const Scene = ({ shapes, colors }: SceneProps) => {
  const colorArray = [colors.primary, colors.secondary, colors.accent, colors.particles];
  
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color={colors.secondary} />
      
      <MouseTracker />
      
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          geometry={shape.geometry}
          scale={shape.scale}
          color={colorArray[index % colorArray.length]}
          wireframe={shape.wireframe}
          speed={shape.speed}
          mouseInfluence={shape.mouseInfluence}
        />
      ))}
    </>
  );
};

interface FloatingElementsProps {
  variant: "about" | "skills" | "projects";
}

const FloatingElements = ({ variant }: FloatingElementsProps) => {
  const colors = use3DThemeColors();
  
  const configs = {
    about: [
      { position: [-3.5, 1.5, 0] as [number, number, number], geometry: "octahedron" as const, scale: 1, wireframe: true, speed: 1.2, mouseInfluence: 0.4 },
      { position: [3.5, -1, -1] as [number, number, number], geometry: "torus" as const, scale: 0.8, wireframe: true, speed: 1.5, mouseInfluence: -0.3 },
      { position: [2.5, 2, -2] as [number, number, number], geometry: "sphere" as const, scale: 0.6, wireframe: false, speed: 1, mouseInfluence: 0.5 },
      { position: [-2, -1.5, -1] as [number, number, number], geometry: "box" as const, scale: 0.5, wireframe: true, speed: 1.3, mouseInfluence: -0.4 },
    ],
    skills: [
      { position: [-3, 1, 0] as [number, number, number], geometry: "box" as const, scale: 0.7, wireframe: true, speed: 1.3, mouseInfluence: 0.5 },
      { position: [3, -1.5, -1] as [number, number, number], geometry: "cone" as const, scale: 0.8, wireframe: true, speed: 1.1, mouseInfluence: -0.4 },
      { position: [0, 2, -2] as [number, number, number], geometry: "octahedron" as const, scale: 0.6, wireframe: false, speed: 1.4, mouseInfluence: 0.3 },
      { position: [-2.5, -1, -1.5] as [number, number, number], geometry: "torus" as const, scale: 0.5, wireframe: true, speed: 1.2, mouseInfluence: -0.5 },
    ],
    projects: [
      { position: [-3.5, 1, 0] as [number, number, number], geometry: "torus" as const, scale: 0.9, wireframe: true, speed: 1.2, mouseInfluence: 0.4 },
      { position: [3.5, 1.5, -1] as [number, number, number], geometry: "sphere" as const, scale: 0.7, wireframe: false, speed: 1.6, mouseInfluence: -0.5 },
      { position: [-2, -1.5, -2] as [number, number, number], geometry: "box" as const, scale: 0.6, wireframe: true, speed: 1, mouseInfluence: 0.3 },
      { position: [2.5, -1, -1.5] as [number, number, number], geometry: "octahedron" as const, scale: 0.5, wireframe: true, speed: 1.4, mouseInfluence: -0.4 },
    ],
  };

  const shapes = configs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene shapes={shapes} colors={colors} />
      </Canvas>
    </div>
  );
};

export default FloatingElements;
