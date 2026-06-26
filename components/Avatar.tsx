"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type AvatarProps = {
  isTalking?: boolean;
};

function Model({ isTalking }: AvatarProps) {
  const { scene, animations } = useGLTF("/images/avatar.glb");
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const talkPhase = useRef(0);

  // ✅ FIX 1 : Initialiser le mixer UNE FOIS
  useEffect(() => {
    if (!animations.length) return;
    mixer.current = new THREE.AnimationMixer(scene);
    const action = mixer.current.clipAction(animations[0]);
    action.play();
    return () => {
      mixer.current?.stopAllAction();
      mixer.current = null;
    };
  }, [animations, scene]);

  // ✅ FIX 2 : useFrame gère la boucle d'animation ET le talking
  useFrame((_, delta) => {
    // Met à jour les animations GLB
    mixer.current?.update(delta);

    // Simule la bouche qui bouge quand isTalking
    if (isTalking) {
      talkPhase.current += delta * 12; // vitesse d'oscillation
      const scaleY = 1 + Math.abs(Math.sin(talkPhase.current)) * 0.04;
      scene.scale.set(1, scaleY, 1);
    } else {
      talkPhase.current = 0;
      scene.scale.set(1, 1, 1);
    }
  });

  return <primitive object={scene} position={[0, -0.9, 0]} />;
}

export default function Avatar({ isTalking }: AvatarProps) {
  return (
    <Canvas camera={{ position: [0, 1.4, 3.5], fov: 35 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 4, 3]} intensity={2.5} />
      <Model isTalking={isTalking} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

useGLTF.preload("/images/avatar.glb");