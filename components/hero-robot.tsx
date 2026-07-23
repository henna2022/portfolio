"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { assetPath } from "@/lib/asset";

// Quaternius "Animated Robot" (CC0) — 클립: Robot_Idle / Robot_Walking /
// Robot_Wave / Robot_Jump / Robot_Dance / Robot_ThumbsUp ...
const MODEL = "/robot.glb";
const WALK_FROM_X = 3.2; // 화면 오른쪽 바깥에서 걸어 들어오는 시작 위치
const REACTIONS = ["Robot_Jump", "Robot_Dance", "Robot_ThumbsUp"];

type Phase = "walk" | "greet" | "idle" | "react";

function Robot() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(assetPath(MODEL));
  const { actions } = useAnimations(animations, group);
  const phase = useRef<Phase>("walk");

  // 이름 끝부분으로 클립을 찾아 크로스페이드 재생
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

  // 일회성 동작 후 idle 로 복귀
  const oneShot = (name: string) => {
    if (phase.current !== "idle") return;
    phase.current = "react";
    const dur = play(name, false);
    setTimeout(() => {
      phase.current = "idle";
      play("Robot_Idle", true);
    }, Math.max(0.4, dur - 0.15) * 1000);
  };

  useEffect(() => {
    // 스킨드메시가 바인드포즈 기준 바운딩으로 잘못 컬링되는 것 방지
    scene.traverse((o) => {
      o.frustumCulled = false;
    });
    play("Robot_Walking", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (phase.current === "walk") {
      // 오른쪽 바깥에서 제자리까지 걸어 들어온 뒤 인사
      g.position.x = Math.max(0, g.position.x - delta * 1.5);
      if (g.position.x === 0) {
        phase.current = "greet";
        const dur = play("Robot_Wave", false);
        setTimeout(() => {
          phase.current = "idle";
          play("Robot_Idle", true);
        }, Math.max(0.4, dur - 0.15) * 1000);
      }
      return;
    }

    // 시선 추적: 마우스 방향으로 몸을 부드럽게 회전
    const targetY = state.pointer.x * 0.55;
    const targetX = -state.pointer.y * 0.12;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.08);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.08);
  });

  return (
    <group
      ref={group}
      position={[WALK_FROM_X, -1.25, 0]}
      onPointerOver={() => oneShot("Robot_Wave")}
      onClick={() =>
        oneShot(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])
      }
    >
      <primitive object={scene} scale={0.52} />
    </group>
  );
}

useGLTF.preload && useGLTF.preload(assetPath(MODEL));

export default function HeroRobot() {
  // 데스크톱에서만 마운트 (CSS 숨김만으로는 캔버스가 계속 돌기 때문)
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-auto absolute bottom-0 right-[2%] h-72 w-64 cursor-pointer xl:right-[5%]"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.6, 4.2], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <hemisphereLight intensity={1.1} groundColor="#b0a894" />
        <directionalLight position={[3, 5, 4]} intensity={1.4} />
        <Suspense fallback={null}>
          <Robot />
        </Suspense>
      </Canvas>
    </div>
  );
}
