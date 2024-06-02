"use client";


import { Canvas,useFrame } from "@react-three/fiber";
import { Bayan } from "../characters/Bayan";
import { Suspense, useState,useRef, useEffect} from "react";
import Loader from "./loader";

// utils/mazeGenerator.js

export const generateMaze = (width, height) => {
  // Initialize the maze with all walls
  const maze = Array(height).fill().map(() => Array(width).fill(0));

  // Directions: [right, down, left, up]
  const directions = [
    [1, 0],   // right
    [0, 1],   // down
    [-1, 0],  // left
    [0, -1]   // up
  ];

  // Helper function to shuffle directions
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  // Recursive backtracking function
  const carvePassages = (cx, cy) => {
    // Mark the current cell as part of the path
    maze[cy][cx] = 1;

    // Shuffle directions to ensure randomness
    const shuffledDirections = shuffle([...directions]);

    // Explore each direction
    for (const [dx, dy] of shuffledDirections) {
      const nx = cx + dx * 2;
      const ny = cy + dy * 2;

      // Check if the new position is within bounds and not yet visited
      if (nx >= 0 && ny >= 0 && nx < width && ny < height && maze[ny][nx] === 0) {
        // Remove the wall between the current cell and the new cell
        maze[cy + dy][cx + dx] = 1;

        // Recursively carve passages from the new cell
        carvePassages(nx, ny);
      }
    }
  };

  // Start carving passages from the top-left corner
  carvePassages(0, 0);

  return maze;
};



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


    useEffect(() => {
      const width = 10;
      const height = 10;
      const maze = generateMaze(width, height);
      console.log(maze);
    }, []);

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
