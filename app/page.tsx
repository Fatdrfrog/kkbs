"use client";

import { Canvas,useFrame } from "@react-three/fiber";
import { Bayan } from "../characters/Bayan";
import { Suspense, useState,useRef} from "react";
import Loader from "./loader";

const adjustContainerModelForScreenSize = () => {
  let screenScale = null;
  let screenPosition = [0, -6.5, -43];
  let rotation = [0.1, 4.7, 0];

  if (window.innerWidth < 768) {
    screenScale = [10, 10, 10];
  } else {
    screenScale = [20, 20, 20];
  }

  return [screenScale, screenPosition, rotation];
};

function Floor(props) {
  
  const meshRef = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'green'} />
    </mesh>
  )
}

export default function Home() {
  const [isRotating, setRotating] = useState(false);

  const [containerScale, containerPosition, containerRotation] =
    adjustContainerModelForScreenSize();

  return (
    <section className="relative w-full h-screen">
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <Floor position={[0, -2, 0]}/>

          {/* <Bayan
            position={containerPosition}
            scale={containerScale}
            rotation={containerRotation}
            isRotating={isRotating}
            setRotating={setRotating}
          /> */}
        </Suspense>
      </Canvas>
    </section>
  );
}
