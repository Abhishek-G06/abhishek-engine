import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { use3DThemeColors, ThemeColors } from "@/hooks/use-3d-theme-colors";

// Mouse position store
const mousePosition = { x: 0, y: 0 };

const AnimatedSphere = ({ position, scale, speed, distort, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  distort: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPosition = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      
      // Mouse follow effect
      const targetX = originalPosition.current.x + mousePosition.x * 0.5;
      const targetY = originalPosition.current.y + mousePosition.y * 0.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02);
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.7}
          distort={distort}
          speed={2}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 150, color }: { count?: number; color: string }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03 + mousePosition.x * 0.1;
      points.current.rotation.x = state.clock.elapsedTime * 0.02 + mousePosition.y * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const GeometricShapes = ({ colors }: { colors: ThemeColors }) => {
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const torusOriginal = useRef(new THREE.Vector3(-4, 2, -4));
  const octaOriginal = useRef(new THREE.Vector3(4, -2, -3));

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Mouse follow
      const targetX = torusOriginal.current.x + mousePosition.x * 0.8;
      const targetY = torusOriginal.current.y + mousePosition.y * 0.8;
      torusRef.current.position.x = THREE.MathUtils.lerp(torusRef.current.position.x, targetX, 0.03);
      torusRef.current.position.y = THREE.MathUtils.lerp(torusRef.current.position.y, targetY, 0.03);
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      octaRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      
      // Mouse follow (opposite direction for parallax effect)
      const targetX = octaOriginal.current.x - mousePosition.x * 0.6;
      const targetY = octaOriginal.current.y - mousePosition.y * 0.6;
      octaRef.current.position.x = THREE.MathUtils.lerp(octaRef.current.position.x, targetX, 0.03);
      octaRef.current.position.y = THREE.MathUtils.lerp(octaRef.current.position.y, targetY, 0.03);
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={torusRef} position={[-4, 2, -4]}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <meshStandardMaterial
            color={colors.primary}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh ref={octaRef} position={[4, -2, -3]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color={colors.secondary}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
};

const MouseTracker = () => {
  const { viewport } = useThree();
  
  useFrame(({ pointer }) => {
    mousePosition.x = (pointer.x * viewport.width) / 2;
    mousePosition.y = (pointer.y * viewport.height) / 2;
  });
  
  return null;
};

const Scene = ({ colors }: { colors: ThemeColors }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color={colors.secondary} />
      
      <MouseTracker />
      
      <AnimatedSphere position={[4, 2, -4]} scale={1.3} speed={1.5} distort={0.4} color={colors.primary} />
      <AnimatedSphere position={[-4, -1, -3]} scale={1} speed={2} distort={0.3} color={colors.secondary} />
      <AnimatedSphere position={[3, -2, -5]} scale={0.8} speed={1.8} distort={0.5} color={colors.accent} />
      
      <GeometricShapes colors={colors} />
      <Particles count={200} color={colors.particles} />
    </>
  );
};

const HeroScene = () => {
  const colors = use3DThemeColors();
  
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene colors={colors} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
