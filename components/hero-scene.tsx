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
        {/* 쿨톤 화이트-블루 타일 (과학관 무드) */}
        <meshStandardMaterial color={dark ? "#20242a" : "#e9edf3"} roughness={0.9} />
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
    // 문단 전체를 도장처럼 오른쪽 사선으로 살짝 회전 (바닥 평면 위에서)
    <group rotation-y={0.14}>
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
                color={dark ? "#e6eaf2" : "#262a33"}
                roughness={0.35}
                metalness={0.15}
              />
            </Text3D>
          </Center>
          </group>
        </group>
      ))}
    </group>
  );
}

// ── 과학관 전시물 (프리미티브 조합) ──────────────────────────
// 원자 모형·홀로그램 프로젝터·유리 진열장·기어 전시대로 미래적 무드 연출
function MuseumProps({ dark }: { dark: boolean }) {
  const atom = useRef<THREE.Group>(null);
  const gem = useRef<THREE.Mesh>(null);
  const gem2 = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += Math.min(delta, 0.1);
    if (atom.current) atom.current.rotation.y += delta * 0.5;
    if (gem.current) {
      gem.current.rotation.y += delta * 1.1;
      gem.current.position.y = 1.02 + Math.sin(t.current * 2) * 0.07;
    }
    if (gem2.current) {
      gem2.current.rotation.y -= delta * 0.9;
      gem2.current.position.y = 0.95 + Math.sin(t.current * 1.6 + 1) * 0.06;
    }
  });

  const ped = dark ? "#2c2f34" : "#f4f6fa";
  const blue = "#3B82F6";
  const ring = dark ? "#9db7e8" : "#64748b";
  const holo = "#8fd0ff";

  return (
    <group>
      {/* 원자 모형 전시대 (왼쪽 앞 가장자리) */}
      <group position={[-4.7, 0, 2.3]}>
        <mesh position-y={0.18}>
          <cylinderGeometry args={[0.45, 0.52, 0.36, 24]} />
          <meshStandardMaterial color={ped} roughness={0.85} />
        </mesh>
        <group position-y={0.9} ref={atom}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={blue} emissive={blue} emissiveIntensity={0.3} />
          </mesh>
          {[0, Math.PI / 3, -Math.PI / 3].map((r, i) => (
            <mesh key={i} rotation={[Math.PI / 2.3, 0, r]}>
              <torusGeometry args={[0.36, 0.018, 8, 40]} />
              <meshStandardMaterial color={ring} metalness={0.5} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 홀로그램 프로젝터 (전경 중앙-오른쪽, 버튼 뒤편) */}
      <group position={[0.9, 0, 3.2]}>
        <mesh position-y={0.14}>
          <boxGeometry args={[0.95, 0.28, 0.95]} />
          <meshStandardMaterial color={ped} roughness={0.85} />
        </mesh>
        <mesh position-y={0.8}>
          <coneGeometry args={[0.44, 1.15, 24, 1, true]} />
          <meshBasicMaterial color={holo} transparent opacity={0.2} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh ref={gem} position-y={1.02}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#a5e3ff" emissive="#38bdf8" emissiveIntensity={0.9} />
        </mesh>
      </group>

      {/* 기어 전시대 (왼쪽 원경, 안개 속) */}
      <group position={[-5.2, 0, -1.6]}>
        <mesh position-y={0.16}>
          <cylinderGeometry args={[0.42, 0.48, 0.32, 24]} />
          <meshStandardMaterial color={ped} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.48, 0]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.28, 0.28, 0.09, 12]} />
          <meshStandardMaterial color={dark ? "#aab8cc" : "#8d9bb0"} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.28, 0.62, -0.02]} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.16, 0.16, 0.09, 10]} />
          <meshStandardMaterial color={dark ? "#c3d0e2" : "#7686a0"} metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* 유리 진열장 (원경 코너 2개) */}
      {[
        [-4.5, -3.6],
        [4.6, -3.1],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position-y={0.25}>
            <boxGeometry args={[1.15, 0.5, 1.15]} />
            <meshStandardMaterial color={ped} roughness={0.85} />
          </mesh>
          <mesh position-y={0.8}>
            <sphereGeometry args={[0.17, 16, 16]} />
            <meshStandardMaterial color={blue} emissive={blue} emissiveIntensity={0.35} />
          </mesh>
          <mesh position-y={1.2}>
            <boxGeometry args={[0.95, 1.4, 0.95]} />
            <meshStandardMaterial
              color={dark ? "#7aa7d9" : "#bcd7f5"}
              transparent
              opacity={0.16}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* 홀로 패드 (오른쪽 중경) */}
      <group position={[3.9, 0, -1.9]}>
        <mesh position-y={0.1}>
          <cylinderGeometry args={[0.5, 0.56, 0.2, 24]} />
          <meshStandardMaterial color={ped} roughness={0.85} />
        </mesh>
        <mesh position-y={0.7}>
          <coneGeometry args={[0.36, 0.95, 20, 1, true]} />
          <meshBasicMaterial color={holo} transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh ref={gem2} position-y={0.95}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color="#a5e3ff" emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
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

    // 시선: 화면 너머 사람(카메라)을 정면으로 바라보는 자세가 기본.
    // 로봇(3.4,0,2.5)→카메라(0,8,8) 방향각: yaw≈-0.55, pitch≈0.45
    // 여기에 마우스 위치를 따라 미세하게 움직인다.
    b.rotation.y = THREE.MathUtils.lerp(b.rotation.y, -0.55 + pointer.x * 0.3, 0.1);
    b.rotation.x = THREE.MathUtils.lerp(b.rotation.x, 0.45 - pointer.y * 0.1, 0.1);
  });

  return (
    <group
      ref={rig}
      position={[3.4, -1.6, 2.5]}
      onPointerOver={() => oneShot("Robot_Wave")}
      onClick={() => oneShot(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])}
    >
      <mesh geometry={pedestalGeo} position-y={0.16}>
        <meshStandardMaterial color={dark ? "#2c2f34" : "#f4f6fa"} roughness={0.9} />
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
          {/* 원경이 푸른 안개로 부드럽게 사라지는 과학관 조도 */}
          <fog attach="fog" args={[dark ? "#0e1218" : "#dbe4f0", 13, 26]} />
          <hemisphereLight intensity={1.3} groundColor={dark ? "#101318" : "#aab4c4"} />
          <directionalLight position={[4, 7, 5]} intensity={1.6} />
          <directionalLight position={[-3, 4, 8]} intensity={0.5} color="#cfe0ff" />
          <pointLight position={[0, 3, -6]} intensity={0.7} color="#7fb3ff" />
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
            <MuseumProps dark={dark} />
            <RobotOnBlock dark={dark} reduced={reduced} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
