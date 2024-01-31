import React, { useEffect, Suspense } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Environment, OrbitControls, useEnvironment } from "@react-three/drei";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Room3D = () => {
  const { id } = useParams();
  var randomInt = getRandomInteger(1, 3);
  const envMap = useEnvironment({
    files: `/Environments/room${randomInt}.hdr`,
  });
  return (
    <div
      style={{
        color: "#fff",
        height: "100%",
        width: "100%",
        backgroundColor: "#555",
      }}
    >
      <Canvas>
        <Suspense fallback={<Loader />}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={1} />
          <Environment map={envMap} background />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Room3D;
