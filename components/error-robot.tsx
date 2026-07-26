"use client";

import { Component, Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { assetPath } from "@/lib/asset";

// 히어로 씬의 로봇만 가볍게 분리한 에러 페이지용 미니 캔버스.
// 등장하면 손을 흔들어 인사하고, 호버 시 다시 흔들고 클릭하면 리액션한다.

const MODEL = "/robot.glb";
const REACTIONS = ["Robot_Jump", "Robot_Dance", "Robot_ThumbsUp"];

function Robot({ reduced }: { reduced: boolean }) {
  const body = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(assetPath(MODEL), assetPath("/draco/"));
  const { actions } = useAnimations(animations, body);
  const phase = useRef<"greet" | "idle" | "react">("greet");

  const play = (name: string, loop: boolean) => {
    const key = Object.keys(actions).find((k) => k.endsWith(name));
    const next = key ? actions[key] : null;
    if (!next) return 0;
    Object.values(actions).forEach((a) => a && a !== next && a.fadeOut(0.25));
    next.reset().fadeIn(0.25);
    if (!loop) {
      next.setLoop(THREE.LoopOnce, 1);
      next.clampWhenFinished = true;
    }
    next.play();
    return next.getClip().duration;
  };

  const toIdleAfter = (dur: number) => {
    setTimeout(() => {
      phase.current = "idle";
      play("Robot_Idle", true);
    }, Math.max(0.4, dur - 0.15) * 1000);
  };

  const oneShot = (name: string) => {
    if (phase.current !== "idle") return;
    phase.current = "react";
    toIdleAfter(play(name, false));
  };

  useEffect(() => {
    scene.traverse((o) => {
      o.frustumCulled = false;
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          const std = m as THREE.MeshStandardMaterial;
          if (std.name === "Main" && std.color) std.color.set("#3B82F6");
        });
      }
    });
    if (reduced) {
      phase.current = "idle";
      play("Robot_Idle", true);
    } else {
      toIdleAfter(play("Robot_Wave", false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame((state) => {
    const b = body.current;
    if (!b) return;
    // 수평으로만 카메라를 바라보게 — 몸이 뒤로 젖혀지지 않게 y 는 자기 높이로 고정
    b.lookAt(state.camera.position.x, b.getWorldPosition(look).y, state.camera.position.z);
    b.rotation.y += state.pointer.x * 0.18;
    b.rotation.x += -state.pointer.y * 0.08;
  });

  return (
    <group
      position={[0, -0.85, 0]}
      onPointerOver={() => oneShot("Robot_Wave")}
      onClick={() => oneShot(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])}
    >
      <group ref={body}>
        <primitive object={scene} scale={0.5} />
      </group>
    </group>
  );
}

const look = new THREE.Vector3();

// WebGL 실패 시 조용히 사라지는 안전장치
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function ErrorRobot() {
  const reduced = useReducedMotion();
  return (
    <Boundary>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 35, position: [0, 0.1, 4.2] }}
        gl={{ antialias: true, alpha: true }}
        className="!touch-auto"
      >
        <hemisphereLight intensity={1.25} groundColor="#aab4c4" />
        <directionalLight position={[4, 7, 5]} intensity={1.6} />
        <directionalLight position={[-3, 4, 8]} intensity={0.5} color="#cfe0ff" />
        <Suspense fallback={null}>
          <Robot reduced={!!reduced} />
        </Suspense>
      </Canvas>
    </Boundary>
  );
}

useGLTF.preload && useGLTF.preload(assetPath(MODEL), assetPath("/draco/"));
