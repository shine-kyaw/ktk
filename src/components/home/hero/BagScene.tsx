"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

// ── timeline helpers ─────────────────────────────────────────────────────────
const DURATION = 3.2; // seconds for the full assembly
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => Math.min(Math.max((p - a) / (b - a), 0), 1);

// Cement body color
const CEMENT = "#EAE7E0";
const BAND = "#D6D0C3";
const GUSSET = "#E0DBD0";
const VALVE = "#D0CABD";

// ── procedural textures (browser-only, drawn once) ──────────────────────────
function useWovenTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = CEMENT;
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1.4;
    for (let i = 0; i <= 128; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.moveTo(0, i);
      ctx.lineTo(128, i);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.2, 3);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function usePrintTexture() {
  return useMemo(() => {
    const W = 512;
    const H = 700;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, W, H); // transparent base, prints over the cement body

    // top small wordmark
    ctx.fillStyle = "rgba(11,13,18,0.55)";
    ctx.font = "600 26px Archivo, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("KAUNG THU KHA", W / 2, 150);

    // red brand band
    const bx = 70;
    const bw = W - 140;
    ctx.fillStyle = "#FC1303";
    roundRect(ctx, bx, 210, bw, 150, 14);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 92px Archivo, system-ui, sans-serif";
    ctx.fillText("KTK", W / 2, 320);

    // blue accent line
    ctx.fillStyle = "#3B41ED";
    roundRect(ctx, W / 2 - 90, 388, 180, 8, 4);
    ctx.fill();

    // spec lines
    ctx.fillStyle = "rgba(11,13,18,0.22)";
    roundRect(ctx, bx, 440, bw * 0.9, 12, 6);
    ctx.fill();
    ctx.fillStyle = "rgba(11,13,18,0.16)";
    roundRect(ctx, bx, 470, bw * 0.7, 12, 6);
    ctx.fill();

    // "CEMENT 50 KG"
    ctx.fillStyle = "rgba(11,13,18,0.5)";
    ctx.font = "700 30px Archivo, system-ui, sans-serif";
    ctx.fillText("CEMENT  ·  50 KG", W / 2, 545);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ── the bag ─────────────────────────────────────────────────────────────────
function Bag() {
  const woven = useWovenTexture();
  const print = usePrintTexture();

  const bag = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  const left = useRef<THREE.Group>(null!);
  const right = useRef<THREE.Group>(null!);
  const top = useRef<THREE.Group>(null!);
  const bottom = useRef<THREE.Group>(null!);
  const valve = useRef<THREE.Group>(null!);
  const lam = useRef<THREE.Group>(null!);
  const lamMat = useRef<THREE.MeshStandardMaterial>(null!);
  const front = useRef<THREE.Group>(null!);
  const frontMat = useRef<THREE.MeshStandardMaterial>(null!);

  const start = useRef<number | null>(null);

  useFrame((state) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const p = Math.min((state.clock.elapsedTime - start.current) / DURATION, 1);

    const eBody = easeOutCubic(seg(p, 0, 0.4));
    body.current.scale.setScalar(0.0001 + eBody);
    body.current.position.z = lerp(-0.6, 0, eBody);

    const eSide = easeOutCubic(seg(p, 0.1, 0.5));
    left.current.position.x = lerp(-2.6, -0.72, eSide);
    right.current.position.x = lerp(2.6, 0.72, eSide);

    const eBand = easeOutCubic(seg(p, 0.45, 0.72));
    top.current.scale.x = 0.0001 + eBand;
    bottom.current.scale.x = 0.0001 + eBand;

    const eLam = easeOutCubic(seg(p, 0.4, 0.68));
    lam.current.position.y = lerp(2.2, 0, eLam);
    lamMat.current.opacity = 0.14 * eLam;

    const eValve = easeOutCubic(seg(p, 0.66, 0.85));
    valve.current.position.y = lerp(2.0, 1.0, eValve);
    valve.current.scale.setScalar(0.0001 + eValve);

    const eFront = easeOutCubic(seg(p, 0.8, 1));
    frontMat.current.opacity = eFront;
    front.current.scale.setScalar(lerp(0.96, 1, eFront));

    // cursor parallax, ramps in with the assembly
    const ty = state.pointer.x * 0.3 * p;
    const tx = -state.pointer.y * 0.16 * p;
    bag.current.rotation.y += (ty - bag.current.rotation.y) * 0.06;
    bag.current.rotation.x += (tx - bag.current.rotation.x) * 0.06;
  });

  return (
    <group ref={bag}>
      {/* body */}
      <group ref={body}>
        <RoundedBox args={[1.5, 2, 0.5]} radius={0.16} smoothness={5}>
          <meshStandardMaterial map={woven} color={CEMENT} roughness={0.92} metalness={0} />
        </RoundedBox>
      </group>

      {/* side gussets (woven panels in from left/right) */}
      <group ref={left}>
        <RoundedBox args={[0.12, 1.92, 0.52]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color={GUSSET} roughness={0.95} metalness={0} />
        </RoundedBox>
      </group>
      <group ref={right}>
        <RoundedBox args={[0.12, 1.92, 0.52]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color={GUSSET} roughness={0.95} metalness={0} />
        </RoundedBox>
      </group>

      {/* sewn seams (wrap from center) */}
      <group ref={top} position={[0, 0.92, 0]}>
        <RoundedBox args={[1.56, 0.2, 0.56]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={BAND} roughness={0.9} metalness={0} />
        </RoundedBox>
      </group>
      <group ref={bottom} position={[0, -0.92, 0]}>
        <RoundedBox args={[1.56, 0.2, 0.56]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={BAND} roughness={0.9} metalness={0} />
        </RoundedBox>
      </group>

      {/* valve, locks into the top */}
      <group ref={valve} position={[0.34, 1.0, 0.12]}>
        <RoundedBox args={[0.52, 0.18, 0.22]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color={VALVE} roughness={0.9} metalness={0} />
        </RoundedBox>
      </group>

      {/* lamination sheen, sweeps from the top */}
      <group ref={lam}>
        <mesh position={[0, 0, 0.262]}>
          <planeGeometry args={[1.42, 1.92]} />
          <meshStandardMaterial
            ref={lamMat}
            color="#ffffff"
            transparent
            opacity={0}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* printed brand layer, appears last */}
      <group ref={front}>
        <mesh position={[0, 0, 0.256]}>
          <planeGeometry args={[1.42, 1.92]} />
          <meshStandardMaterial ref={frontMat} map={print} transparent opacity={0} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

export default function BagScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 32 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.8]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.7} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#cdd6ff" />
      <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.7} floatingRange={[-0.06, 0.06]}>
        <Bag />
      </Float>
      <ContactShadows position={[0, -1.18, 0]} opacity={0.3} scale={7} blur={2.8} far={3} color="#0B0D12" />
    </Canvas>
  );
}
