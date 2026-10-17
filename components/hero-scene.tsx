"use client";

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLenis } from "lenis/react";
import {
  Center,
  ContactShadows,
  Text,
  Text3D,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import { assetPath } from "@/lib/asset";
import { ui, uiKo } from "@/lib/i18n";

// ─────────────────────────────────────────────────────────────
// 3D 히어로 씬: 타일 바닥 + 땅에서 올라오는 입체 헤드라인 +
// 블럭을 타고 올라와 인사하는 로봇 (모든 WebGL 기기)
// ─────────────────────────────────────────────────────────────

const MODEL = "/robot.glb";
// 레귤러 굵기 — 글자 속 공간('e','a')이 시원하게 뚫려 보이도록
const FONT = "/fonts/helvetiker_regular.typeface.json";
const REACTIONS = ["Robot_Jump", "Robot_Dance", "Robot_ThumbsUp"];
const HEADLINE = ["Building AI products", "that run where", "people are."];
// Paperlogy 6 SemiBold subset: all headline/button characters plus printable ASCII.
const HEADLINE_KO = ["사람이 있는 현장에서", "돌아가는 AI 제품을", "만듭니다."];
const FONT_KO = "/fonts/paperlogy-hero.typeface.json";
// 버튼 라벨(troika Text)용 서브셋 TTF — EN·KO 양쪽 라벨 글자를 모두 담고 있다.
// ⚠️ font 를 비워두면 troika 가 unicode-font-resolver 로 넘어가 런타임에
//    cdn.jsdelivr.net 에서 폰트 데이터를 받아온다(= 방문자 IP 가 제3자에게 전달).
//    그래서 EN 에서도 반드시 이 로컬 폰트를 지정한다. 라벨 문구를 바꿀 때는
//    이 서브셋에 글자가 들어있는지 확인할 것 — 없으면 다시 CDN 을 타게 된다.
const LABEL_FONT = "/fonts/paperlogy-hero.ttf";

// 텍스트 3줄이 순차로 올라온 뒤 로봇이 등장하는 타임라인(초)
const TEXT_START = 0.2;
const TEXT_STAGGER = 0.3;
const TEXT_DURATION = 0.9;
const ROBOT_START = 1.5;
const ROBOT_DURATION = 1.1;

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

// Begin switching on just before the robot rises; fully lit before its wave.
const lampLevel = (elapsed: number, reduced: boolean) => reduced ? 1
  : easeOutCubic(THREE.MathUtils.clamp((elapsed - (ROBOT_START - 0.2)) / 0.6, 0, 1));

function RoomFill({ dark, reduced }: { dark: boolean; reduced: boolean }) {
  const ref = useRef<THREE.HemisphereLight>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    elapsed.current += Math.min(delta, 0.1);
    if (ref.current) ref.current.intensity = (dark ? 0.85 : 1) + 0.3 * lampLevel(elapsed.current, reduced);
  });
  return <hemisphereLight ref={ref} intensity={(dark ? 0.85 : 1) + (reduced ? 0.3 : 0)} groundColor={dark ? "#1a2028" : "#aab4c4"} />;
}

// ── 발광 글로우 스프라이트 (색상별 텍스처 캐시) ───────────────
// 전구·원자·홀로그램·행성 등 emissive 소품 주변의 빛 번짐을 공용으로 처리.
// 후처리 bloom 없이도 additive 스프라이트로 "빛이 새어나오는" 느낌을 낸다.
const glowCache = new Map<string, THREE.CanvasTexture>();
function glowTexture(rgb: string) {
  const hit = glowCache.get(rgb);
  if (hit) return hit;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, `rgba(${rgb},0.95)`);
  grd.addColorStop(0.4, `rgba(${rgb},0.32)`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  glowCache.set(rgb, tex);
  return tex;
}

// <Glow rgb="59,130,246" scale={2} /> — 어디서든 발광 번짐을 얹는다.
// scale 에 [x,y] 를 주면 가로/세로 비대칭(라이트 라인 streak)도 가능.
function Glow({
  rgb,
  scale = 1,
  opacity = 0.8,
  position,
}: {
  rgb: string;
  scale?: number | [number, number];
  opacity?: number;
  position?: [number, number, number];
}) {
  const tex = useMemo(() => glowTexture(rgb), [rgb]);
  const s: [number, number, number] = Array.isArray(scale)
    ? [scale[0], scale[1], 1]
    : [scale, scale, 1];
  return (
    <sprite position={position} scale={s}>
      <spriteMaterial
        map={tex}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={opacity}
      />
    </sprite>
  );
}

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

// 과학관 "방 안" 시점 — 뒷벽이 화면의 ~80%를 차지하는 수평 정면 카메라
// 값을 상수로 빼둔 이유: 헤드라인이 화면 폭에 맞춰 줄어들 때 이 두 값으로
// "벽면에서 실제로 보이는 폭"을 계산한다 (RisingHeadline 참고).
const CAM_FOV = 35;
const CAM_POS: [number, number, number] = [0, 2.1, 7.4];
function Rig({ compact }: { compact: boolean }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    if (compact) {
      // Fixed vertical framing keeps the room and robot close in portrait.
      camera.position.set(0, 2.2, 7.4);
      camera.fov = 50;
      camera.lookAt(0, 2.2, 0);
    } else {
      camera.position.set(...CAM_POS);
      camera.fov = CAM_FOV;
      camera.lookAt(0, 2.1, 0);
    }
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }, [camera, compact, size]);
  return null;
}

// 뒷벽 — 헤드라인이 걸리는 전시월 (하단 트림 + 블루 라이트 라인)
const WALL_Z = -5.5;
function Wall({ dark }: { dark: boolean }) {
  return (
    <group position={[0, 0, WALL_Z]}>
      <mesh position-y={4.5}>
        <boxGeometry args={[30, 9, 0.3]} />
        <meshStandardMaterial color={dark ? "#191d23" : "#f0f3f8"} roughness={0.95} />
      </mesh>
      {/* 걸레받이 트림 */}
      <mesh position={[0, 0.22, 0.17]}>
        <boxGeometry args={[30, 0.44, 0.06]} />
        <meshStandardMaterial color={dark ? "#242a32" : "#dde3ec"} roughness={0.8} />
      </mesh>
      {/* 블루 라이트 라인 (전시관 무드) + 벽으로 새는 네온 번짐 */}
      <mesh position={[0, 0.5, 0.18]}>
        <boxGeometry args={[30, 0.05, 0.02]} />
        <meshStandardMaterial color="#bcd6ff" emissive="#3B82F6" emissiveIntensity={2.2} />
      </mesh>
      <Glow rgb="59,130,246" scale={[26, 1.4]} opacity={dark ? 0.5 : 0.32} position={[0, 0.5, 0.3]} />

      {/* 코너에서 만나는 오른쪽 벽 (원근 소실면) */}
      <group position={[9.2, 0, 9]} rotation-y={-Math.PI / 2}>
        <mesh position-y={4.5}>
          <boxGeometry args={[18, 9, 0.3]} />
          <meshStandardMaterial color={dark ? "#171b20" : "#e8ecf3"} roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.22, 0.17]}>
          <boxGeometry args={[18, 0.44, 0.06]} />
          <meshStandardMaterial color={dark ? "#242a32" : "#dde3ec"} roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.5, 0.18]}>
          <boxGeometry args={[18, 0.05, 0.02]} />
          <meshStandardMaterial color="#bcd6ff" emissive="#3B82F6" emissiveIntensity={2.2} />
        </mesh>
        <Glow rgb="59,130,246" scale={[16, 1.4]} opacity={dark ? 0.5 : 0.32} position={[0, 0.5, 0.3]} />
      </group>
    </group>
  );
}

// Poly Pizza 소품 GLB 로더 (draco 압축본)
function GLBProp({
  src,
  ...props
}: { src: string } & React.ComponentProps<"group">) {
  const { scene } = useGLTF(assetPath(src), assetPath("/draco/"));
  useEffect(() => {
    scene.traverse((o) => {
      o.frustumCulled = false;
    });
  }, [scene]);
  return (
    <group {...(props as object)}>
      {/* 모델 내부에 박힌 원점 오프셋을 정규화: 바운딩박스 중심·바닥 기준 정렬 */}
      <Center top>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

// 대각선으로 깔린 베벨 타일 바닥
function Floor({ dark }: { dark: boolean }) {
  const N = 38;
  // 베벨 세그먼트 2 → 1. 타일 1개당 300 → 108 삼각형. 타일이 화면에서 40px 남짓이라
  // 외형 차이는 없다.
  const geo = useMemo(() => new RoundedBoxGeometry(0.94, 0.18, 0.94, 1, 0.05), []);
  const ref = useRef<THREE.InstancedMesh>(null);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  // InstancedMesh 는 인스턴스 단위 프러스텀 컬링이 없어서, 아무 처리도 안 하면
  // 화면 밖·안개 너머 타일까지 매 프레임 전부 그린다. 카메라는 Rig 가 한 번
  // 세팅한 뒤 고정이므로 여기서 한 번만 걸러내면 된다 — 보이는 그림은 그대로다.
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    const rot = new THREE.Matrix4().makeRotationY(Math.PI / 4);
    const m = new THREE.Matrix4();
    const world = new THREE.Vector3();
    const view = new THREE.Vector3();
    let i = 0;

    for (let x = 0; x < N; x++)
      for (let z = 0; z < N; z++) {
        const lx = x - N / 2 + 0.5;
        const lz = z - N / 2 + 0.5;
        world.set(lx, -0.09, lz).applyMatrix4(rot);
        view.copy(world).applyMatrix4(camera.matrixWorldInverse);

        if (view.z > -0.5) continue; // 카메라 뒤
        if (view.length() > 34) continue; // 안개(15~32)로 완전히 묻히는 거리

        const ndc = world.clone().project(camera);
        // 가까운 타일일수록 화면에서 크게 잡히므로 여유를 거리에 반비례해 준다.
        const margin = 1 + 2.2 / Math.max(2, -view.z);
        if (Math.abs(ndc.x) > margin || Math.abs(ndc.y) > margin) continue;

        m.setPosition(lx, -0.09, lz);
        mesh.setMatrixAt(i++, m);
      }

    mesh.count = i; // 남은 것만 그린다
    mesh.instanceMatrix.needsUpdate = true;
    if (process.env.NODE_ENV !== "production")
      (window as unknown as { __floorTiles?: string }).__floorTiles = `${i}/${N * N}`;
  }, [camera, size]);

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <instancedMesh ref={ref} geometry={geo} args={[undefined, undefined, N * N]}>
        {/* 쿨톤 화이트-블루 타일 (과학관 무드) */}
        <meshStandardMaterial color={dark ? "#20242a" : "#e9edf3"} roughness={0.9} />
      </instancedMesh>
    </group>
  );
}

// 뒷벽에 걸린 입체 헤드라인 — 벽 속에서 살짝 튀어나오며 등장한다.
// 얇은 두께(0.05) + 넓은 자간 + 레귤러 굵기로 깔끔하게.
const LINE_OFFSET_Y = [0.78, 0, -0.78]; // 중심 기준 행 간격
const HEADLINE_CENTER_Y = 2.65;
const TEXT_START_Z = WALL_Z - 0.4; // 벽 속(숨김)
const TEXT_TARGET_Z = WALL_Z + 0.18; // 벽면보다 살짝 돌출

// 헤드라인이 차지해도 되는 화면 폭 (NDC 기준, 1 = 화면 가장자리)
const HEADLINE_WIDTH_RATIO = 0.94;

function RisingHeadline({ dark, reduced, ko, compact, onHeadlineShown }: { dark: boolean; reduced: boolean; ko: boolean; compact: boolean; onHeadlineShown?: () => void }) {
  const notified = useRef(false);
  const viewport = useThree((s) => s.size);
  const portraitLines = compact && viewport.width / viewport.height < 0.6;
  const lines = portraitLines
    ? ko ? ["사람이 있는", "현장에서 돌아가는", "AI 제품을", "만듭니다."]
      : ["Building AI", "products that", "run where", "people are."]
    : ko ? HEADLINE_KO : HEADLINE;
  const line0 = useRef<THREE.Group>(null);
  const line1 = useRef<THREE.Group>(null);
  const line2 = useRef<THREE.Group>(null);
  const line3 = useRef<THREE.Group>(null);
  const refs = portraitLines ? [line0, line1, line2, line3] : [line0, line1, line2];
  const elapsed = useRef(0);

  // ── 화면 폭에 맞춰 헤드라인 축소 ──────────────────────────────────────
  // 창을 좁히면 카메라 시야가 같이 좁아지는데 글자 크기는 고정이라 긴 줄이
  // 화면 밖으로 잘려 나갔다. 방이 rotation-y 로 기울어 있고 x 로도 밀려 있어서
  // "폰트 크기 ÷ 시야 폭" 같은 계산은 안 맞는다 — 그래서 실제 월드 바운딩박스를
  // 화면 좌표(NDC)로 투영해 가장 바깥으로 튀어나온 x 를 재고, 그 값이 화면
  // 가장자리를 넘지 않도록 그룹을 줄인다. 넓은 화면에서는 1(원래 크기)로 수렴한다.
  const groupRef = useRef<THREE.Group>(null);
  const [fit, setFit] = useState(1);
  const [koreanLineStep, setKoreanLineStep] = useState(0.6);
  const measureKoreanLine = useCallback(({ height }: { height: number }) => {
    // Measure the rendered Hangul outlines, including bevels; font metadata
    // can understate their height. Keep 18% leading between adjacent lines.
    setKoreanLineStep((step) => Math.max(step, height * 1.18));
  }, []);
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    const box = new THREE.Box3();
    const corner = new THREE.Vector3();
    let cancelled = false;
    let tries = 0;

    const measure = () => {
      if (cancelled) return;
      const g = groupRef.current;
      if (g) {
        // 측정은 항상 "원래 크기 · 등장 완료" 상태 기준으로 한다.
        // (지금 스케일이나 등장 애니메이션 중간 z 로 재면 값이 계속 흔들린다)
        if (compact) {
          // Project actual text boxes in wall coordinates, preserving perspective.
          // Solve both width and horizontal centering; scaling alone drifts left.
          const zs = g.children.map((c) => c.position.z);
          g.children.forEach((c) => (c.position.z = TEXT_TARGET_Z));
          const bounds = () => {
            g.updateWorldMatrix(true, true);
            let left = Infinity, right = -Infinity;
            g.traverse((o) => {
              if (!(o instanceof THREE.Mesh)) return;
              o.geometry.computeBoundingBox();
              const b = o.geometry.boundingBox;
              if (!b) return;
              for (const x of [b.min.x, b.max.x])
                for (const y of [b.min.y, b.max.y])
                  for (const z of [b.min.z, b.max.z]) {
                    corner.set(x, y, z).applyMatrix4(o.matrixWorld).project(camera);
                    left = Math.min(left, corner.x);
                    right = Math.max(right, corner.x);
                  }
            });
            return [left, right];
          };
          let scale = 1;
          g.position.x = 0;
          g.position.y = 5.2;
          for (let i = 0; i < 24; i++) {
            g.scale.set(scale, scale, 1);
            const [left, right] = bounds();
            if (!Number.isFinite(left) || right <= left) break;
            const middle = (left + right) / 2;
            g.position.x += 0.01;
            const shifted = bounds();
            g.position.x -= 0.01 + middle / (((shifted[0] + shifted[1]) / 2 - middle) / 0.01);
            scale *= (ko ? 1.6 : 1.76) / (right - left);
          }
          g.scale.set(scale, scale, 1);
          const [left, right] = bounds();
          // Leave space for the fixed navigation above the wall lettering.
          box.setFromObject(g);
          let top = -Infinity;
          for (const x of [box.min.x, box.max.x])
            for (const y of [box.min.y, box.max.y])
              for (const z of [box.min.z, box.max.z]) {
                corner.set(x, y, z).project(camera);
                top = Math.max(top, corner.y);
              }
          const origin = new THREE.Vector3(box.max.x, box.max.y, box.max.z);
          const y0 = origin.clone().project(camera).y;
          const y1 = origin.clone().add(new THREE.Vector3(0, 1, 0)).project(camera).y;
          g.position.y += (0.7 - top) / (y1 - y0);
          g.children.forEach((c, i) => (c.position.z = zs[i]));
          if (Number.isFinite(left) && right > left) {
            setFit(scale);
            return;
          }
        }
        if (!compact) g.position.set(0, HEADLINE_CENTER_Y, 0);
        const scaled = g.scale.x;
        const zs = g.children.map((c) => c.position.z);
        g.scale.set(1, 1, 1);
        g.children.forEach((c) => (c.position.z = TEXT_TARGET_Z));
        g.updateWorldMatrix(true, true);
        box.setFromObject(g);

        let outermost = 0;
        if (!box.isEmpty()) {
          for (const x of [box.min.x, box.max.x])
            for (const y of [box.min.y, box.max.y])
              for (const z of [box.min.z, box.max.z]) {
                corner.set(x, y, z).project(camera);
                outermost = Math.max(outermost, Math.abs(corner.x));
              }
        }

        g.scale.set(scaled, scaled, 1);
        g.children.forEach((c, i) => (c.position.z = zs[i]));

        if (outermost > 0) {
          setFit(THREE.MathUtils.clamp(HEADLINE_WIDTH_RATIO / outermost, 0.35, 1));
          return;
        }
      }
      // Text3D 는 타입페이스를 받아온 뒤에야 지오메트리가 생긴다 — 잠깐 기다렸다 재시도
      if (tries++ < 40) setTimeout(measure, 100);
    };

    measure();
    return () => {
      cancelled = true;
    };
  }, [camera, viewport.width, viewport.height, ko, compact, koreanLineStep]);

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
      g.position.z = THREE.MathUtils.lerp(TEXT_START_Z, TEXT_TARGET_Z, easeOutCubic(p));
    });
    if (!notified.current && (reduced || elapsed.current >= TEXT_START + (lines.length - 1) * TEXT_STAGGER + TEXT_DURATION)) {
      notified.current = true;
      onHeadlineShown?.();
    }
  });

  return (
    // 벽면에 걸린 문단 — 코너 원근이 자연스러운 사선을 만들어 준다
    // scale 의 z 를 1 로 두는 이유: 자식 그룹의 z 는 "벽에서 튀어나오는" 등장
    // 애니메이션 좌표라, 같이 줄이면 글자가 벽 앞에 떠버린다.
    <group ref={groupRef} position-y={compact ? undefined : HEADLINE_CENTER_Y} scale={[fit, fit, 1]}>
      {lines.map((line, i) => (
        <group key={line} ref={refs[i]} position={[0, compact ? ((lines.length - 1) / 2 - i) * (ko ? koreanLineStep : 0.6) : LINE_OFFSET_Y[i], TEXT_START_Z]}>
          <Center disableY disableZ onCentered={compact && ko ? measureKoreanLine : undefined}>
            <Text3D
              font={assetPath(ko ? FONT_KO : FONT)}
              size={0.52}
              height={0.05}
              letterSpacing={0.035}
              bevelEnabled
              bevelSize={0.008}
              bevelThickness={0.012}
              // 6 → 4. 헤드라인 3줄이 58,088 → 40,552 삼각형(씬 최대 항목이었다).
              // 글자가 화면에서 60px 남짓이라 곡선 분할 차이는 보이지 않고,
              // 베벨은 그대로 둬서 모서리에 빛이 걸리는 입체감은 유지된다.
              curveSegments={4}
            >
              {line}
              {/* 살짝 자체발광시켜 어두운 벽에서도 또렷하게 (스포트라이트 받는 전시 글자) */}
              <meshStandardMaterial
                color={dark ? "#eef2fb" : "#2b303a"}
                roughness={0.35}
                metalness={0.1}
                emissive={dark ? "#93b4ff" : "#8fb0ff"}
                emissiveIntensity={dark ? 0.35 : 0.12}
              />
            </Text3D>
          </Center>
        </group>
      ))}
    </group>
  );
}

// 벽에서 돌출된 진짜 3D 버튼 — 라운드 블록 메시 + 앞면 라벨(SDF Text).
// 헤드라인과 같은 벽 평면에 있어 원근이 정확히 일치하고, 옆면 두께가 보인다.
// 라벨은 troika SDF 텍스트로 버튼 앞면에 평평하게 렌더 — 매 프레임 DOM 재투영이
// 없어 가볍고, 호버 스케일은 useFrame lerp로 부드럽게 처리한다.
function Button3D({
  label,
  target,
  primary,
  position,
  width,
  dark,
  labelFont,
  onNavigate,
}: {
  label: string;
  target: string;
  primary?: boolean;
  position: [number, number, number];
  width: number;
  dark: boolean;
  labelFont?: string;
  onNavigate: (target: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const hover = useRef(false);
  const geo = useMemo(() => new RoundedBoxGeometry(width, 0.64, 0.26, 3, 0.08), [width]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  // 호버 스케일을 상태 리렌더 대신 매 프레임 lerp 로 구동 — 부드럽고 저렴하다
  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const goal = hover.current ? 1.06 : 1;
    const s = THREE.MathUtils.lerp(g.scale.x, goal, 0.2);
    g.scale.setScalar(s);
  });

  // text-ink 토큰과 동일: 라이트 #2b303a / 다크 #e6eaf2
  const labelColor = primary ? "#ffffff" : dark ? "#e6eaf2" : "#2b303a";

  return (
    <group ref={group} position={position}>
      <mesh
        geometry={geo}
        onClick={(e) => {
          // 뒤쪽 메시(로봇 등)로 클릭이 새지 않게 차단
          e.stopPropagation();
          onNavigate(target);
        }}
        onPointerOver={() => {
          hover.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hover.current = false;
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={primary ? "#3B82F6" : dark ? "#2c2f34" : "#ffffff"}
          roughness={0.45}
        />
      </mesh>
      <Text
        font={labelFont}
        position={[0, 0, 0.14]}
        fontSize={0.21}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.01}
        // 라벨은 클릭/호버가 아래 메시로 전달되도록 포인터 이벤트에서 제외
        raycast={() => null}
      >
        {label}
      </Text>
    </group>
  );
}

function WallButtons({
  dark,
  onNavigate,
  ko,
}: {
  dark: boolean;
  onNavigate: (target: string) => void;
  ko: boolean;
}) {
  // Canvas 안쪽은 바깥 React 컨텍스트가 끊기므로 lang 은 prop 으로 받는다
  const t = ko ? uiKo : ui;
  const labelFont = assetPath(LABEL_FONT);
  return (
    <group position={[0.7, 1.05, WALL_Z + 0.28]}>
      <Button3D
        dark={dark}
        primary
        label={`${t.viewWork} →`}
        target="#work"
        position={[-1.4, 0, 0]}
        width={ko ? 2.5 : 2.9}
        labelFont={labelFont}
        onNavigate={onNavigate}
      />
      <Button3D
        dark={dark}
        label={t.readProfile}
        target="#about"
        position={[ko ? 1.35 : 1.55, 0, 0]}
        width={ko ? 1.8 : 2.2}
        labelFont={labelFont}
        onNavigate={onNavigate}
      />
    </group>
  );
}

// 스탠딩 램프 — 갓 + 발광 전구 + 스포트라이트가 바닥에 빛 웅덩이를 만든다
function StandingLamp({
  position,
  dark,
  reduced,
}: {
  position: [number, number, number];
  dark: boolean;
  reduced: boolean;
}) {
  const light = useRef<THREE.SpotLight>(null);
  const target = useRef<THREE.Object3D>(null);

  const effects = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  useEffect(() => {
    if (light.current && target.current) light.current.target = target.current;
  }, []);
  useFrame((_, delta) => {
    elapsed.current += Math.min(delta, 0.1);
    const level = lampLevel(elapsed.current, reduced);
    effects.current?.traverse((object) => {
      const target = object.userData.lampTarget;
      if (typeof target !== "number") return;
      const value = target * level * (dark ? 1 : 0.5);
      if (object instanceof THREE.Light) object.intensity = value;
      else if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
        const material = object.material;
        if (material instanceof THREE.MeshStandardMaterial) material.emissiveIntensity = value;
        else if (!Array.isArray(material)) material.opacity = value;
      }
    });
  });

  // 라디얼 그라디언트 글로우 텍스처 (전구 주변 빛 번짐)
  const glowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(255,222,160,0.95)");
    grd.addColorStop(0.35, "rgba(255,196,107,0.4)");
    grd.addColorStop(1, "rgba(255,196,107,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <group position={position}>
      {/* 받침 + 기둥 + 갓 */}
      <mesh position-y={0.05}>
        <cylinderGeometry args={[0.32, 0.38, 0.1, 20]} />
        <meshStandardMaterial color={dark ? "#3a3f47" : "#c8d0dc"} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position-y={1.35}>
        <cylinderGeometry args={[0.035, 0.035, 2.6, 10]} />
        <meshStandardMaterial color={dark ? "#3a3f47" : "#c8d0dc"} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position-y={2.75}>
        <coneGeometry args={[0.42, 0.5, 20, 1, true]} />
        <meshStandardMaterial
          color={dark ? "#4a5058" : "#e6ebf2"}
          side={THREE.DoubleSide}
          roughness={0.5}
        />
      </mesh>
      <group ref={effects}>
        {/* 전구 + 빛 번짐(블러 글로우 2겹) */}
        <mesh userData={{ lampTarget: 1.8 }} position-y={2.6}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color="#fff2d6" emissive="#ffc46b" emissiveIntensity={reduced ? (dark ? 1.8 : 0.9) : 0} />
        </mesh>
        <sprite position-y={2.6} scale={[3.4, 3.4, 1]} userData={{ lampTarget: 0.7 }}>
          <spriteMaterial
            map={glowTex}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={reduced ? 0.7 * (dark ? 1 : 0.5) : 0}
          />
        </sprite>
        <sprite position-y={2.6} scale={[1.6, 1.6, 1]} userData={{ lampTarget: 0.6 }}>
          <spriteMaterial
            map={glowTex}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={reduced ? 0.6 * (dark ? 1 : 0.5) : 0}
          />
        </sprite>
        {/* 빛 기둥: 넓고 옅은 외곽 콘 + 밝은 내부 콘 (볼류메트릭) */}
        <mesh position-y={1.4} userData={{ lampTarget: 0.06 }}>
          <coneGeometry args={[1.5, 2.6, 28, 1, true]} />
          <meshBasicMaterial color="#ffdca6" transparent opacity={reduced ? 0.06 * (dark ? 1 : 0.5) : 0} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position-y={1.4} userData={{ lampTarget: 0.14 }}>
          <coneGeometry args={[1.0, 2.6, 24, 1, true]} />
          <meshBasicMaterial color="#ffe6bd" transparent opacity={reduced ? 0.14 * (dark ? 1 : 0.5) : 0} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* 바닥 빛 웅덩이: 발광 원반 + 번짐 스프라이트 */}
        <mesh position={[0, 0.02, 0.25]} rotation-x={-Math.PI / 2} userData={{ lampTarget: 0.2 }}>
          <circleGeometry args={[1.45, 32]} />
          <meshBasicMaterial color="#ffd9a0" transparent opacity={reduced ? 0.2 * (dark ? 1 : 0.5) : 0} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <sprite position={[0, 0.05, 0.25]} scale={[3.2, 3.2, 1]} userData={{ lampTarget: 0.34 }}>
          <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={reduced ? 0.34 * (dark ? 1 : 0.5) : 0} />
        </sprite>
        {/* 실제 조명 — 램프 스포트 + 웜 필 (은은하게) */}
        <spotLight
          ref={light}
          userData={{ lampTarget: 4 }}
          position={[0, 2.6, 0]}
          angle={0.72}
          penumbra={0.7}
          intensity={reduced ? (dark ? 4 : 2) : 0}
          color="#ffdca6"
          distance={13}
        />
        <pointLight userData={{ lampTarget: 1.2 }} position={[0, 2.6, 0]} intensity={reduced ? (dark ? 1.2 : 0.6) : 0} color="#ffd9a0" distance={8} />
      </group>
      <object3D ref={target} position={[0, 0, 0.6]} />
    </group>
  );
}

// ── 과학관 전시물 (프리미티브 조합) ──────────────────────────
// 원자 모형·홀로그램 프로젝터·유리 진열장·기어 전시대로 미래적 무드 연출
function MuseumProps({ dark, reduced, compact }: { dark: boolean; reduced: boolean; compact: boolean }) {
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
      {/* 책상 + iMac (왼쪽 벽가, 의자가 오른쪽) — Desk by dook (Poly Pizza) */}
      {/* 책상: 두 벽이 만나는 코너에, 모니터가 오른쪽 벽을 향하도록 회전 */}
      <GLBProp src="/props/desk.glb" position={compact ? [1.2, 0, -4.1] : [7.0, 0, -4.1]} rotation={[0, -1.35, 0]} scale={compact ? 0.85 : 1.05} />

      {/* 스탠딩 램프 (책상 옆) — 따뜻한 빛 웅덩이 + 글로우 */}
      <StandingLamp position={compact ? [-0.5, 0, -4.35] : [4.7, 0, -4.35]} dark={dark} reduced={reduced} />

      {/* 원자 모형 전시대 (벽가 왼쪽) */}
      <group position={[-4.6, 0, -4.1]}>
        <mesh position-y={0.18}>
          <cylinderGeometry args={[0.45, 0.52, 0.36, 24]} />
          <meshStandardMaterial color={ped} roughness={0.85} />
        </mesh>
        <Glow rgb="59,130,246" scale={1.15} opacity={0.7} position={[0, 0.9, 0]} />
        <group position-y={0.9} ref={atom}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color={blue} emissive={blue} emissiveIntensity={0.7} />
          </mesh>
          {[0, Math.PI / 3, -Math.PI / 3].map((r, i) => (
            <mesh key={i} rotation={[Math.PI / 2.3, 0, r]}>
              <torusGeometry args={[0.36, 0.018, 8, 40]} />
              <meshStandardMaterial color={ring} metalness={0.5} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 홀로그램 프로젝터 (왼쪽 중경 빈 바닥) */}
      <group position={[-2.6, 0, 0.8]}>
        <mesh position-y={0.14}>
          <boxGeometry args={[0.95, 0.28, 0.95]} />
          <meshStandardMaterial color={ped} roughness={0.85} />
        </mesh>
        <mesh position-y={0.8}>
          <coneGeometry args={[0.44, 1.15, 24, 1, true]} />
          <meshBasicMaterial color={holo} transparent opacity={0.2} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <Glow rgb="56,189,248" scale={1.1} opacity={0.75} position={[0, 1.02, 0]} />
        <mesh ref={gem} position-y={1.02}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#a5e3ff" emissive="#38bdf8" emissiveIntensity={1.3} />
        </mesh>
      </group>

      {/* 유리 진열장 (벽 앞 좌우) */}
      {[
        [-4.6, -4.6],
        [8.4, 1.6],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position-y={0.25}>
            <boxGeometry args={[1.15, 0.5, 1.15]} />
            <meshStandardMaterial color={ped} roughness={0.85} />
          </mesh>
          <Glow rgb="59,130,246" scale={1.2} opacity={0.65} position={[0, 0.8, 0]} />
          <mesh position-y={0.8}>
            <sphereGeometry args={[0.17, 16, 16]} />
            <meshStandardMaterial color={blue} emissive={blue} emissiveIntensity={0.8} />
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
      <group position={[5.6, 0, -1.2]}>
        <mesh position-y={0.1}>
          <cylinderGeometry args={[0.5, 0.56, 0.2, 24]} />
          <meshStandardMaterial color={ped} roughness={0.85} />
        </mesh>
        <mesh position-y={0.7}>
          <coneGeometry args={[0.36, 0.95, 20, 1, true]} />
          <meshBasicMaterial color={holo} transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <Glow rgb="56,189,248" scale={0.95} opacity={0.7} position={[0, 0.95, 0]} />
        <mesh ref={gem2} position-y={0.95}>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color="#a5e3ff" emissive="#38bdf8" emissiveIntensity={1.2} />
        </mesh>
      </group>
    </group>
  );
}

// 받침 블럭을 타고 올라와 인사하는 로봇
function RobotOnBlock({ dark, reduced, compact }: { dark: boolean; reduced: boolean; compact: boolean }) {
  const vw = useThree((s) => s.viewport.width);
  const x = compact ? 0.15 : Math.min(2.45, vw / 2 - 0.8);
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

  useFrame((state, delta) => {
    if (process.env.NODE_ENV !== "production")
      (window as any).__hsRobot = ((window as any).__hsRobot || 0) + 1;
    const g = rig.current;
    const b = body.current;
    if (!g || !b) return;
    elapsed.current += Math.min(delta, 0.1);

    // 정면이 항상 사용자(카메라)를 향하도록 + 마우스 미세 추적
    b.lookAt(state.camera.position);
    b.rotation.y += state.pointer.x * 0.12;
    b.rotation.x += -state.pointer.y * 0.06;

    // Reapply height after viewport/theme rerenders update the group's position.
    const p = reduced
      ? 1
      : THREE.MathUtils.clamp((elapsed.current - ROBOT_START) / ROBOT_DURATION, 0, 1);
    g.position.y = THREE.MathUtils.lerp(-1.6, 0, easeOutCubic(p));
    if (phase.current === "rise") {
      if (p === 1) {
        phase.current = "greet";
        toIdleAfter(play("Robot_Wave", false));
      }
    }
  });

  return (
    <group
      ref={rig}
      position={[x, -1.6, -0.6]}
      scale={compact ? 1.3 : 1}
      onPointerOver={() => oneShot("Robot_Wave")}
      onClick={() => oneShot(REACTIONS[Math.floor(Math.random() * REACTIONS.length)])}
    >
      <pointLight position={[0, 2.8, -2]} intensity={dark ? 2.8 : 1.4} color="#5b8cff" distance={6} />
      <pointLight position={[0.15, 2.4, 2.4]} intensity={dark ? 1 : 0.5} color="#ffe3b8" distance={6.5} />
      <mesh geometry={pedestalGeo} position-y={0.16}>
        <meshStandardMaterial color={dark ? "#2c2f34" : "#f4f6fa"} roughness={0.9} />
      </mesh>
      <group ref={body} position-y={0.32}>
        <primitive object={scene} scale={0.3} />
      </group>
    </group>
  );
}

// WebGL 게이트를 통과한 기기에서 방의 공용 모델을 미리 로드한다.
useGLTF.preload && useGLTF.preload(assetPath(MODEL), assetPath("/draco/"));
useGLTF.preload && useGLTF.preload(assetPath("/props/desk.glb"), assetPath("/draco/"));
// Text3D 의 타입페이스는 컴포넌트가 마운트된 뒤에야 요청돼 GLB 뒤로 밀린다.
// 미리 받아 HTTP 캐시에 올려두면 GLB·draco 와 같은 구간에서 병렬로 내려온다.
// (본문까지 읽어야 캐시에 기록되므로 arrayBuffer 로 끝까지 소비한다)
if (typeof window !== "undefined") {
  for (const f of [document.documentElement.classList.contains("lang-ko") ? FONT_KO : FONT, LABEL_FONT]) {
    fetch(assetPath(f))
      .then((r) => r.arrayBuffer())
      .catch(() => {});
  }
}

// WebGL 실패 시 조용히 사라지는 안전장치.
// 사라지기만 하면 히어로가 빈 채로 남으므로, 부모(Hero)에게 알려 DOM 헤드라인·CTA 를
// 되살릴 수 있게 onFail 을 호출한다.
class SceneBoundary extends Component<
  { children: ReactNode; onFail?: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroScene({
  showText,
  compact = false,
  ko = false,
  onSceneError,
  onHeadlineShown,
}: {
  showText: boolean;
  compact?: boolean;
  ko?: boolean;
  // 씬이 죽었을 때 부모가 DOM 헤드라인·CTA 를 되살리도록 알리는 콜백
  onSceneError?: () => void;
  onHeadlineShown?: () => void;
}) {
  const dark = useDark();
  const reduced = useReducedMotion();
  // Lenis 인스턴스는 <Canvas> 바깥(같은 React 트리)에서만 컨텍스트로 잡힌다.
  // R3F 는 별도 리컨실러라 Canvas 안에서는 useLenis() 가 동작하지 않으므로,
  // 여기서 만든 핸들러를 prop 으로 내려보낸다. (location.hash 직접 대입은
  // Lenis 의 스크롤 하이재킹과 충돌해 이동이 씹히던 원인)
  const lenis = useLenis();
  const navigate = useCallback(
    (target: string) => {
      const el = document.querySelector(target);
      if (!el) return;
      if (lenis) {
        // 중간 구간을 빠르게 훑고 내려가는 게 아니라 곧바로 해당 섹션으로 이동한다.
        // (immediate 는 Lenis 내부 스크롤 값까지 함께 맞춰줘서, 이후 휠 입력이
        //  이전 위치에서 이어지는 문제가 없다)
        lenis.scrollTo(el as HTMLElement, { offset: -88, immediate: true });
      } else {
        el.scrollIntoView();
      }
      history.replaceState(null, "", assetPath(`/${target}`));
    },
    [lenis],
  );
  const [enabled, setEnabled] = useState(false);
  const [smallScreen, setSmallScreen] = useState(true);
  // 히어로가 화면 밖으로 스크롤되면 렌더 루프를 멈춰 나머지 페이지에 GPU/CPU 양보
  const [visible, setVisible] = useState(true);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = matchMedia("(max-width: 767px)");
    const probe = document.createElement("canvas");
    const hasGL = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    setEnabled(hasGL);
    if (!hasGL) onSceneError?.();
    const update = () => setSmallScreen(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [onSceneError]);

  // 백그라운드 탭에서 마운트될 때 초기 사이징이 누락되는 경우 대비
  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
    return () => clearTimeout(t);
  }, [enabled]);

  // 히어로 래퍼가 뷰포트에 보일 때만 frameloop 을 돌린다
  useEffect(() => {
    if (!enabled) return;
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    // 섹션은 max-w 컨테이너라서, 바닥이 화면 전체 폭을 덮도록 풀블리드로 확장
    <div
      ref={wrapper}
      aria-hidden
      className="absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 [&_canvas]:!touch-pan-y"
      style={{ touchAction: "pan-y" }}
    >
      <SceneBoundary onFail={onSceneError}>
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={smallScreen ? 1 : [1, 1.25]}
          performance={{ min: 0.5 }}
          camera={{ fov: CAM_FOV, position: CAM_POS }}
          gl={{ antialias: true, alpha: true }}
          onCreated={(state) => {
            // dev 전용: 프레이밍 검증용
            if (process.env.NODE_ENV !== "production") {
              (window as unknown as { __r3f?: unknown }).__r3f = state;
            }
            // GPU 리셋·드라이버 크래시로 컨텍스트가 날아가면 three 는 예외를 던지지
            // 않고 조용히 멈춘다 → 에러 경계가 안 잡히고 캔버스만 얼어붙은 채 남는다.
            // 이때도 부모에게 알려 DOM 헤드라인·CTA 로 되돌린다.
            state.gl.domElement.addEventListener(
              "webglcontextlost",
              () => onSceneError?.(),
              { once: true },
            );
          }}
        >
          <Rig compact={compact} />
          {/* 원경이 푸른 안개로 부드럽게 사라지는 과학관 조도 (벽·글자는 선명) */}
          <fog attach="fog" args={[dark ? "#0e1218" : "#dbe4f0", 15, 32]} />
          {/* 다크모드에서 방이 너무 어둡지 않게 은은한 보조광 */}
          {dark ? <ambientLight intensity={0.4} color="#8fa8cc" /> : null}
          <directionalLight position={[4, 7, 5]} intensity={1.6} />
          <directionalLight position={[-3, 4, 8]} intensity={0.5} color="#cfe0ff" />
          <pointLight position={[0, 3, -6]} intensity={0.7} color="#7fb3ff" />
          <Suspense fallback={null}>
            <RoomFill dark={dark} reduced={reduced} />
            {/* 방 코너 뷰: 방 전체를 회전시켜 왼쪽 벽이 비스듬히 화면 대부분을
                차지하고 오른쪽 코너로 원근이 소실되게 함 (스케치 구도) */}
            <group rotation-y={0.5} position={[1.8, 0, 0]}>
              <Wall dark={dark} />
              {showText ? <RisingHeadline compact={compact} dark={dark} reduced={reduced} ko={ko} onHeadlineShown={onHeadlineShown} /> : null}
              {showText && !compact ? (
                <WallButtons dark={dark} onNavigate={navigate} ko={ko} />
              ) : null}
              <MuseumProps compact={compact} dark={dark} reduced={reduced} />
              {/* Wall wash; robot accent lights travel with its pedestal. */}
              <pointLight position={[0, 3.4, -3.6]} intensity={dark ? 2.6 : 1.1} color="#b9ccff" distance={12} />
            </group>
            <Floor dark={dark} />
            {/* 접지 그림자 — 글자·로봇이 면 위에 "서 있는" 느낌의 핵심 */}
            {/* frames 를 두지 않으면(기본 Infinity) 매 프레임 씬 전체를 그림자용으로
                한 번 더 렌더하고 블러까지 돌린다 — 사실상 씬 비용이 두 배.
                로봇 등장이 ROBOT_START+ROBOT_DURATION(2.6초)에 끝나고 이후에는
                제자리 회전뿐이라 접지 그림자가 바뀌지 않으므로, 인트로를 덮을
                만큼만 굽고 멈춘다. (120Hz 화면에서도 4초 이상 확보) */}
            <ContactShadows
              frames={500}
              position={[0, 0.01, 0]}
              opacity={dark ? 0.5 : 0.32}
              scale={22}
              blur={2.4}
              far={4}
              // blur 2.4 로 어차피 뭉개지는 블롭이라 256 → 128 로 낮춰도 차이가 없다
              resolution={128}
            />
            <RobotOnBlock compact={compact} dark={dark} reduced={reduced} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
