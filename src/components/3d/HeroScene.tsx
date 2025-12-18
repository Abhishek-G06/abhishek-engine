import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const AnimatedSphere = ({ position, scale, speed, distort, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  distort: number;
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={distort}
          speed={2}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 100 }: { count?: number }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
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
        size={0.03}
        color="#64B5A0"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const GeometricShapes = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      octaRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={torusRef} position={[-4, 2, -3]}>
          <torusGeometry args={[0.8, 0.3, 16, 32]} />
          <meshStandardMaterial
            color="#4A9B84"
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh ref={octaRef} position={[4, -1, -2]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#64B5A0"
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#64B5A0" />
        
        <AnimatedSphere position={[3, 1, -2]} scale={1.5} speed={1.5} distort={0.4} color="#4A9B84" />
        <AnimatedSphere position={[-3, -1, -3]} scale={1} speed={2} distort={0.3} color="#64B5A0" />
        <AnimatedSphere position={[0, 2, -4]} scale={0.8} speed={1.8} distort={0.5} color="#3D8B6E" />
        
        <GeometricShapes />
        <Particles count={150} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
