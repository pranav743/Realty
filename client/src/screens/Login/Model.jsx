import React, { useRef } from "react";
import { useFrame } from 'react-three-fiber';
import Cube from "./Cube";

const Model = () => {
    const cubeRef = useRef();
    useFrame(() => {
        if (cubeRef.current) {
          cubeRef.current.rotation.x += 0.01;
          cubeRef.current.rotation.y += 0.01;
        }
      });
  return (
    <mesh ref={cubeRef}>
        <Cube/>
    </mesh>
  );
}

export default Model;
