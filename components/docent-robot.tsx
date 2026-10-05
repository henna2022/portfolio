"use client";

// 도슨트 로봇. 오른쪽에서 걸어 들어와 인사하고, 평소엔 정면(화면 밖 관람객)을 보며
// 가끔 손 흔들기·끄덕·엄지를 한다. 커서가 움직이면 살짝 돌아보고, 클릭하면 점프·엄지·끄덕·춤.
// 재질은 툰 셰이딩 3단 + 몸통 코발트, 관절은 잉크(다크 모드에선 밝은 회색).
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { assetPath } from "@/lib/asset";

// Quaternius "Animated Robot" (CC0)
const MODEL = "/robot.glb";
// 클릭할 때마다 차례로 (네 번째에 춤)
const REACTIONS = ["Robot_Jump", "Robot_ThumbsUp", "Robot_Yes", "Robot_Dance"];
// 가만히 서 있을 때 가끔 하는 작은 몸짓
const IDLE_GESTURES = ["Robot_Wave", "Robot_Yes", "Robot_ThumbsUp"];
const GAZE_PX = 650; // 커서가 로봇에서 이만큼 떨어지면 최대로 돌아본다
const GAZE_MAX = 0.38; // 최대 고개 돌림(rad). 기본은 정면 = 화면 밖 관람객을 본다
const FEET_Y = -1.5;

type Phase = "walk" | "greet" | "idle" | "react";

export type RobotProps = {
  targetPx: number; // 캔버스 왼쪽에서 멈출 자리(px)
  onArrive?: () => void;
  onReact?: () => void;
};
type InnerProps = RobotProps & { reduced: boolean; onSettle?: () => void; onBusy?: (busy: boolean) => void };

// 렌더 박자. frameloop="demand" 에서 필요한 만큼만 그린다:
// 걷거나 반응할 땐 60fps, 가만히 서 있을 땐 30fps, 화면에서 거의 벗어나면 0.
function Ticker({ active, fps }: { active: boolean; fps: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = 0;
    const step = 1000 / fps;
    const loop = (t: number) => {
      if (t - last >= step - 2) {
        last = t;
        invalidate();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, fps, invalidate]);
  return null;
}

function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

function makeShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(0,0,0,0.34)");
  grd.addColorStop(0.55, "rgba(0,0,0,0.14)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function Robot({ targetPx, onArrive, onReact, reduced, onSettle, onBusy }: InnerProps) {
  const group = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const started = useRef(false);
  const phase = useRef<Phase>("walk");
  const setPhase = (p: Phase) => {
    phase.current = p;
    onBusy?.(p !== "idle");
  };
  const reactIdx = useRef(0);
  const nextGesture = useRef(0);
  const gestureIdx = useRef(0);
  // 커서가 최근에 움직였는지. 오래 멈추거나 창 밖으로 나가면 다시 정면을 본다
  const lastMove = useRef(-1e9);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType === "mouse") lastMove.current = performance.now();
    };
    const leave = () => (lastMove.current = -1e9);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);
  const { size, viewport } = useThree();
  const { scene, animations } = useGLTF(assetPath(MODEL), assetPath("/draco/"));
  const { actions } = useAnimations(animations, group);
  const dark = useDark();

  const gradient = useMemo(() => {
    const t = new THREE.DataTexture(new Uint8Array([96, 178, 255]), 3, 1, THREE.RedFormat);
    t.minFilter = THREE.NearestFilter;
    t.magFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  }, []);
  const shadowTex = useMemo(() => makeShadowTexture(), []);
  const mats = useMemo(
    () => ({
      Main: new THREE.MeshToonMaterial({ color: "#2252F5", gradientMap: gradient }),
      Grey: new THREE.MeshToonMaterial({ color: "#2B2A27", gradientMap: gradient }),
      Black: new THREE.MeshToonMaterial({ color: "#141413", gradientMap: gradient }),
    }),
    [gradient],
  );

  useEffect(() => {
    mats.Main.color.set(dark ? "#3C66FF" : "#2252F5");
    mats.Grey.color.set(dark ? "#CFCAC0" : "#2B2A27");
  }, [dark, mats]);

  // 월드 좌표: 캔버스 px → x
  const pxToX = (px: number) => (px / size.width - 0.5) * viewport.width;

  const play = (name: string, loop: boolean) => {
    const key = Object.keys(actions).find((k) => k.endsWith(name));
    const next = key ? actions[key] : null;
    if (!next) return 0;
    Object.values(actions).forEach((a) => a && a !== next && a.fadeOut(0.25));
    next.reset().fadeIn(0.25);
    if (!loop) {
      next.setLoop(THREE.LoopOnce, 1);
      next.clampWhenFinished = true;
    } else {
      next.setLoop(THREE.LoopRepeat, Infinity);
    }
    next.play();
    return next.getClip().duration;
  };

  const timer = useRef<number>(0);
  // force: 클릭은 진행 중인 손 인사(호버)를 끊고 바로 반응한다. 걷는 중에는 무시.
  const oneShot = (name: string, force = false) => {
    if (phase.current === "walk") return false;
    if (phase.current !== "idle" && !force) return false;
    setPhase("react");
    const dur = play(name, false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setPhase("idle");
      play("Robot_Idle", true);
    }, Math.max(0.4, dur - 0.15) * 1000);
    return true;
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    scene.traverse((o) => {
      o.frustumCulled = false;
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || !mesh.material) return;
      const swap = (m: THREE.Material) => mats[m.name as keyof typeof mats] ?? m;
      mesh.material = Array.isArray(mesh.material) ? mesh.material.map(swap) : swap(mesh.material);
    });
    play(reduced ? "Robot_Wave" : "Robot_Walking", !reduced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const target = pxToX(targetPx);

    if (!started.current) {
      // 캔버스 크기가 실제 무대 크기로 잡히기 전(기본 300x150)에는 출발하지 않는다.
      // 잘못된 크기로 출발하면 엉뚱한 자리에 "도착"해 말풍선이 먼저 뜨고 로봇이 뒤늦게 미끄러져 온다.
      const host = state.gl.domElement.parentElement;
      if (!host || Math.abs(size.width - host.clientWidth) > 2 || Math.abs(size.height - host.clientHeight) > 2) return;
      started.current = true;
      // 오른쪽 바깥에서 출발. 멈출 자리보다 항상 오른쪽이 되게 한다.
      g.position.x = reduced ? target : Math.max(viewport.width / 2 + 0.7, target + 1.5);
      if (reduced) {
        // 동작 줄이기: 걸어 들어오지 않고 그 자리에서 정면을 보고 인사한 뒤 멈춘다
        g.rotation.y = 0;
        setPhase("greet");
        onArrive?.();
        window.setTimeout(() => {
          setPhase("idle");
          onSettle?.();
        }, 1700);
      }
    }
    if (shadow.current) shadow.current.position.x = g.position.x;

    if (phase.current === "walk") {
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.95, 0.15);
      g.position.x = Math.max(target, g.position.x - Math.min(delta, 0.1) * 1.8);
      if (g.position.x <= target + 0.0001) {
        setPhase("greet");
        const dur = play("Robot_Wave", false);
        onArrive?.();
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
          setPhase("idle");
          play("Robot_Idle", true);
        }, Math.max(0.4, dur - 0.15) * 1000);
      }
      return;
    }

    // 창 크기가 바뀌면 멈출 자리도 따라간다
    g.position.x = THREE.MathUtils.lerp(g.position.x, target, 0.12);

    // 시선: 기본은 정면(화면 밖 관람객). 커서가 움직이는 동안만 로봇 자리 기준으로 살짝 돌아본다.
    // (예전엔 넓은 캔버스 가운데를 기준으로 재서, 커서가 대문 글 위에 있으면 내내 왼쪽만 봤다)
    const clamp = (v: number) => THREE.MathUtils.clamp(v, -1, 1);
    const following = performance.now() - lastMove.current < 2500;
    const px = ((state.pointer.x + 1) / 2) * size.width;
    const py = ((1 - state.pointer.y) / 2) * size.height;
    const yaw = following ? clamp((px - targetPx) / GAZE_PX) * GAZE_MAX : 0;
    const pitch = following ? clamp((py - size.height * 0.3) / 500) * 0.1 : 0;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, yaw, 0.08);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pitch, 0.08);

    // 가만히 서 있으면 7~12초마다 작은 몸짓 (손 흔들기 · 끄덕 · 엄지)
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (phase.current !== "idle") {
      nextGesture.current = t + 7 + Math.random() * 5;
    } else if (t >= nextGesture.current) {
      oneShot(IDLE_GESTURES[gestureIdx.current++ % IDLE_GESTURES.length]);
    }
  });

  return (
    <>
      <mesh ref={shadow} position={[0, FEET_Y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} />
      </mesh>
      <group
        ref={group}
        position={[0, FEET_Y, 0]}
        rotation={[0, -0.95, 0]}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
          if (!reduced) oneShot("Robot_Wave");
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
        onClick={() => {
          if (reduced) {
            if (phase.current === "idle") onReact?.();
            return;
          }
          const name = REACTIONS[reactIdx.current % REACTIONS.length];
          if (oneShot(name, true)) {
            reactIdx.current += 1;
            onReact?.();
          }
        }}
      >
        <primitive object={scene} scale={0.44} />
      </group>
    </>
  );
}

useGLTF.preload && useGLTF.preload(assetPath(MODEL), assetPath("/draco/"));

function RobotPoster({ targetPx, onArrive }: { targetPx: number; onArrive?: () => void }) {
  useEffect(() => {
    onArrive?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <img className="robot-poster robot-poster--light" src={assetPath("/robot-wave-light.png")} alt="" style={{ left: targetPx }} decoding="async" />
      <img className="robot-poster robot-poster--dark" src={assetPath("/robot-wave-dark.png")} alt="" style={{ left: targetPx }} decoding="async" />
    </>
  );
}

export default function DocentRobot(props: RobotProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [hasGL, setHasGL] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [settled, setSettled] = useState(false);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const probe = document.createElement("canvas");
    setHasGL(!!(probe.getContext("webgl2") || probe.getContext("webgl")));
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    // 무대가 20% 넘게 보일 때만 그린다 (스크롤 내리는 동안 그리기를 일찍 멈춘다)
    const io = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.2), {
      threshold: [0, 0.2, 0.5],
    });
    io.observe(el);
    return () => io.disconnect();
  }, [hasGL]);

  // WebGL 이 없으면 같은 로봇의 정지 사진으로 대신한다
  if (!hasGL) return <RobotPoster targetPx={props.targetPx} onArrive={props.onArrive} />;

  return (
    <div ref={wrapper} style={{ width: "100%", height: "100%" }}>
      <Canvas
        // 화면 밖이거나, 동작 줄이기에서 인사가 끝났으면 렌더 루프를 멈춘다(마지막 자세 유지)
        frameloop="demand"
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        dpr={[1, 1.5]}
        camera={{ position: [0, -0.12, 5.6], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={(state) => {
          // 이벤트는 페이지 전체(body)에서 받되, 포인터 좌표는 캔버스의 지금 위치 기준으로 계산한다.
          // (eventPrefix="client" 는 캔버스가 화면 전체일 때만 맞다. 무대 중간에 있는 캔버스에선 광선이 빗나간다)
          state.setEvents({
            compute: (event, st) => {
              const r = st.gl.domElement.getBoundingClientRect();
              st.pointer.set(
                ((event.clientX - r.left) / r.width) * 2 - 1,
                -((event.clientY - r.top) / r.height) * 2 + 1,
              );
              st.raycaster.setFromCamera(st.pointer, st.camera);
            },
          });
          if (process.env.NODE_ENV !== "production") {
            (window as unknown as { __r3f?: unknown }).__r3f = state;
          }
        }}
      >
        <hemisphereLight intensity={1.15} groundColor="#9a9488" />
        <directionalLight position={[-3, 5, 4]} intensity={1.8} />
        <Ticker active={visible && !settled} fps={busy ? 60 : 30} />
        <Suspense fallback={null}>
          <Robot {...props} reduced={reduced} onSettle={() => setSettled(true)} onBusy={setBusy} />
        </Suspense>
      </Canvas>
    </div>
  );
}
