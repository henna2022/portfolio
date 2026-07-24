"use client";

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  Text3D,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import { assetPath } from "@/lib/asset";

// ─────────────────────────────────────────────────────────────
// 3D 히어로 씬: 타일 바닥 + 땅에서 올라오는 입체 헤드라인 +
// 블럭을 타고 올라와 인사하는 로봇 (데스크톱 전용)
// ─────────────────────────────────────────────────────────────

const MODEL = "/robot.glb";
const FONT = "/fonts/helvetiker_bold.typeface.json";
const REACTIONS = ["Robot_Jump", "Robot_Dance", "Robot_ThumbsUp"];
const HEADLINE = ["Building interactive", "learning where AI meets", "the physical world."];

// 텍스트 3줄이 순차로 올라온 뒤 로봇이 등장하는 타임라인(초)
const TEXT_START = 0.2;
const TEXT_STAGGER = 0.3;
const TEXT_DURATION = 0.9;
const ROBOT_START = 1.5;
const ROBOT_DURATION = 1.1;

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

// 45° 부감 — 타일 바닥이 화면 전체를 덮어 '면 위 세계'로 보이게
function Rig() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.position.set(0, 8, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

// 대각선으로 깔린 베벨 타일 바닥
function Floor({ dark }: { dark: boolean }) {
  const N = 38;
  const geo = useMemo(() => new RoundedBoxGeometry(0.94, 0.18, 0.94, 2, 0.05), []);
  const ref = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const m = new THREE.Matrix4();
    let i = 0;
    for (let x = 0; x < N; x++)
      for (let z = 0; z < N; z++) {
        m.setPosition(x - N / 2 + 0.5, -0.09, z - N / 2 + 0.5);
        ref.current!.setMatrixAt(i++, m);
      }
    ref.current!.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <instancedMesh ref={ref} geometry={geo} args={[undefined, undefined, N * N]}>
        <meshStandardMaterial color={dark ? "#232320" : "#e9e6de"} roughness={0.95} />
      </instancedMesh>
    </group>
  );
}

// 바닥에 "누운" 입체 헤드라인 — 도장 찍힌 블록처럼 면을 뚫고 위로 솟는다.
// 각 줄은 깊이(z)가 다른 행. 전역 clock 대신 델타 누적 타이머 사용.
const LINE_Z = [-1.3, -0.05, 1.2];
const LINE_TARGET_Y = [0, 0, 0];
const LINE_START_Y = -0.5;

function RisingHeadline({ dark, reduced }: { dark: boolean; reduced: boolean }) {
  const line0 = useRef<THREE.Group>(null);
  const line1 = useRef<THREE.Group>(null);
  const line2 = useRef<THREE.Group>(null);
  const refs = [line0, line1, line2];
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (process.env.NODE_ENV !== "production") {
      const w = window as any;
      w.__hsText = (w.__hsText || 0) + 1;
      w.__hsDelta = delta;
      w.__hsElapsed = elapsed.current;
      w.__hsRefs = refs.map((r) => (r.current ? +r.current.position.y.toFixed(2) : null));
      w.__hsInScene = refs.map((r) => {
        let cur: THREE.Object3D | null = r.current;
        while (cur && cur.parent) cur = cur.parent;
        return cur ? cur.type : null;
      });
    }
    elapsed.current += Math.min(delta, 0.1); // 백그라운드 복귀 시 점프 방지
    refs.forEach((r, i) => {
      const g = r.current;
      if (!g) return;
      const start = TEXT_START + i * TEXT_STAGGER;
      const p = reduced
        ? 1
        : THREE.MathUtils.clamp((elapsed.current - start) / TEXT_DURATION, 0, 1);
      g.position.y = THREE.MathUtils.lerp(LINE_START_Y, LINE_TARGET_Y[i], easeOutCubic(p));
    });
  });

  return (
    <>
      {HEADLINE.map((line, i) => (
        <group key={line} ref={refs[i]} position={[0, LINE_START_Y, LINE_Z[i]]}>
          {/* 글자를 바닥에 눕힘: 윗면이 하늘을 보고, 두께(extrude)가 위로 솟음 */}
          <group rotation-x={-Math.PI / 2}>
          <Center disableY disableZ>
            <Text3D
              font={assetPath(FONT)}
              size={0.5}
              height={0.16}
              bevelEnabled
              bevelSize={0.012}
              bevelThickness={0.02}
              curveSegments={5}
            >
              {line}
              <meshStandardMaterial
                color={dark ? "#e9e6de" : "#454239"}
                roughness={0.5}
                metalness={0.08}
              />
            </Text3D>
          </Center>
          </group>
        </group>
      ))}
    </>
  );
}

// 받침 블럭을 타고 올라와 인사하는 로봇
function RobotOnBlock({ dark, reduced }: { dark: boolean; reduced: boolean }) {
  const rig = useRef<THREE.Group>(null); // 블럭+로봇 (상승)
  const body = useRef<THREE.Group>(null); // 로봇만 (시선 회전)
  const { scene, animations } = useGLTF(assetPath(MODEL), assetPath("/draco/"));
  const { actions } = useAnimations(animations, body);
  const phase = useRef<"rise" | "greet" | "idle" | "react">("rise");
  const pedestalGeo = useMemo(() => new RoundedBoxGeometry(0.85, 0.32, 0.85, 2, 0.05), []);

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
    play("Robot_Idle", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  const elapsed = useRef(0);

  useFrame(({ pointer }, delta) => {
    if (process.env.NODE_ENV !== "production")
      (window as any).__hsRobot = ((window as any).__hsRobot || 0) + 1;
    const g = rig.current;
    const b = body.current;
    if (!g || !b) return;
    elapsed.current += Math.min(delta, 0.1);

    if (phase.current === "rise") {
      const p = reduced
        ? 1
        : THREE.MathUtils.clamp((elapsed.current - ROBOT_START) / ROBOT_DURATION, 0, 1);
      g.position.y = THREE.MathUtils.lerp(-1.6, 0, easeOutCubic(p));
      if (p === 1) {
        phase.current = "greet";
        toIdleAfter(play("Robot_Wave", false));
      }
      return;
    }

    // 시선 추적 (로봇만 회전, 블럭은 고정)
    b.rotation.y = THREE.MathUtils.lerp(b.rotation.y, pointer.x * 0.55, 0.1);
    b.rotation.x = THREE.MathUtils.lerp(b.rotation.x, -pointer.y * 0.1, 0.1);
  });

  return (
    <group
      ref={rig}
      position={[3.4, -1.6, 2.5]}
      onPointerOver={() => oneShot("Robot_Wave")}
      onClick={() => oneShot(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])}
    >
      <mesh geometry={pedestalGeo} position-y={0.16}>
        <meshStandardMaterial color={dark ? "#2e2e2a" : "#f7f5f0" } roughness={0.9} />
      </mesh>
      <group ref={body} position-y={0.32}>
        <primitive object={scene} scale={0.26} />
      </group>
    </group>
  );
}

useGLTF.preload && useGLTF.preload(assetPath(MODEL), assetPath("/draco/"));

// WebGL 실패 시 조용히 사라지는 안전장치
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroScene({ showText }: { showText: boolean }) {
  const dark = useDark();
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px) and (hover: hover)");
    const probe = document.createElement("canvas");
    const hasGL = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    const update = () => setEnabled(mq.matches && hasGL);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 백그라운드 탭에서 마운트될 때 초기 사이징이 누락되는 경우 대비
  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
    return () => clearTimeout(t);
  }, [enabled]);

  if (!enabled) return null;

  return (
    // 섹션은 max-w 컨테이너라서, 바닥이 화면 전체 폭을 덮도록 풀블리드로 확장
    <div
      aria-hidden
      className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2"
    >
      <SceneBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={(state) => {
            // dev 전용: 프레이밍 검증용
            if (process.env.NODE_ENV !== "production") {
              (window as unknown as { __r3f?: unknown }).__r3f = state;
            }
          }}
        >
          <Rig />
          <hemisphereLight intensity={1.3} groundColor={dark ? "#111" : "#b0a894"} />
          <directionalLight position={[4, 7, 5]} intensity={1.6} />
          <directionalLight position={[-3, 4, 8]} intensity={0.5} />
          <Suspense fallback={null}>
            <Floor dark={dark} />
            {/* 접지 그림자 — 글자·로봇이 면 위에 "서 있는" 느낌의 핵심 */}
            <ContactShadows
              position={[0, 0.01, 0]}
              opacity={dark ? 0.5 : 0.32}
              scale={22}
              blur={2.4}
              far={4}
              resolution={512}
            />
            {showText ? <RisingHeadline dark={dark} reduced={reduced} /> : null}
            <RobotOnBlock dark={dark} reduced={reduced} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
