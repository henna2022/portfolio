"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { assetPath } from "@/lib/asset";

// Quaternius "Animated Robot" (CC0) — 클립: Robot_Idle / Robot_Walking /
// Robot_Wave / Robot_Jump / Robot_Dance / Robot_ThumbsUp ...
const MODEL = "/robot.glb";
const REACTIONS = ["Robot_Jump", "Robot_Dance", "Robot_ThumbsUp"];

type Phase = "walk" | "greet" | "idle" | "react";

function Robot({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const started = useRef(false);
  // 두 번째 인자: 셀프호스팅한 Draco 디코더 경로 (모델이 draco 압축됨)
  const { scene, animations } = useGLTF(assetPath(MODEL), assetPath("/draco/"));
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
    scene.traverse((o) => {
      // 스킨드메시가 바인드포즈 기준 바운딩으로 잘못 컬링되는 것 방지
      o.frustumCulled = false;
      // 본체(노랑) 머티리얼을 사이트 액센트 블루로 — 회색 관절은 유지
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          const std = m as THREE.MeshStandardMaterial;
          if (std.name === "Main" && std.color) std.color.set("#3B82F6");
        });
      }
    });
    play("Robot_Walking", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // 첫 프레임: 캔버스 오른쪽 바깥에서 출발 (캔버스 폭이 기기마다 달라 뷰포트로 계산).
    // 동작 줄이기 설정이면 걷기 없이 제자리에서 바로 인사한다.
    if (!started.current) {
      started.current = true;
      g.position.x = reduced ? 0 : state.viewport.width / 2 + 0.5;
    }

    if (phase.current === "walk") {
      // 오른쪽 바깥에서 제자리까지: 진행 방향(관람자 기준 왼쪽 앞)을 보며 걷는다
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.95, 0.15);
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

    // 도착 후: 정면으로 돌아서고, 이후 마우스 방향으로 부드럽게 시선 추적
    // 포인터는 페이지 전체에서 받으므로 캔버스 밖이면 ±1 을 넘는다 — 고개만 끝까지 돌린다
    const clamp = (v: number) => THREE.MathUtils.clamp(v, -1, 1);
    const targetY = clamp(state.pointer.x) * 0.55;
    const targetX = -clamp(state.pointer.y) * 0.12;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.1);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.1);
  });

  return (
    <group
      ref={group}
      position={[0, -1.25, 0]}
      rotation={[0, -0.95, 0]}
      onPointerOver={() => oneShot("Robot_Wave")}
      onClick={() =>
        oneShot(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])
      }
    >
      <primitive object={scene} scale={0.52} />
    </group>
  );
}

useGLTF.preload && useGLTF.preload(assetPath(MODEL), assetPath("/draco/"));

// 크기·위치는 hero.tsx 의 래퍼가 정한다 (SSR 때부터 자리를 잡아 레이아웃이 밀리지 않게).
export default function HeroRobot() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [hasGL, setHasGL] = useState(false);
  const [reduced, setReduced] = useState(false);
  // 히어로가 화면 밖으로 스크롤되면 렌더 루프를 멈춰 나머지 페이지에 GPU/CPU 양보
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const probe = document.createElement("canvas");
    setHasGL(!!(probe.getContext("webgl2") || probe.getContext("webgl")));
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [hasGL]);

  if (!hasGL) return null;

  return (
    <div ref={wrapper} className="h-full w-full cursor-pointer">
      <Canvas
        frameloop={visible ? "always" : "never"}
        // 이벤트를 페이지 전체에서 받아 커서가 어디 있든 고개를 돌린다.
        // (캔버스 자체는 pointer-events 가 꺼져 스크롤·탭을 가로막지 않는다)
        eventSource={document.body}
        eventPrefix="client"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.6, 5.4], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={(state) => {
          // dev 전용: 콘솔에서 씬 검사·프레이밍 보정용
          if (process.env.NODE_ENV !== "production") {
            (window as unknown as { __r3f?: unknown }).__r3f = state;
          }
        }}
      >
        <hemisphereLight intensity={1.1} groundColor="#b0a894" />
        <directionalLight position={[3, 5, 4]} intensity={1.4} />
        <Suspense fallback={null}>
          <Robot reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
