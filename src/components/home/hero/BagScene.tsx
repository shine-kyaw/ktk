"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

// ── timeline helpers ─────────────────────────────────────────────────────────
const DURATION = 3.6; // seconds for the full assembly
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => Math.min(Math.max((p - a) / (b - a), 0), 1);

// The real KTK product is a WHITE glossy laminated PP woven pillow bag with
// red emblem + blue KTK print. Colors below match that, not a cement sack.
const BODY = "#F1F0EC"; // white laminated PP
const BRAND_RED = "#FC1303";
const BRAND_BLUE = "#3B41ED";
const SHADOW = "#15120D"; // warm charcoal contact shadow

// ── height-field → tangent-space normal map (Sobel) ─────────────────────────
function heightToNormal(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  size = 256,
  strength = 2.2,
  repeat: [number, number] = [1, 1],
): THREE.CanvasTexture {
  const src = document.createElement("canvas");
  src.width = src.height = size;
  const sctx = src.getContext("2d", { willReadFrequently: true })!;
  sctx.fillStyle = "#808080";
  sctx.fillRect(0, 0, size, size);
  draw(sctx, size, size);
  const h = sctx.getImageData(0, 0, size, size).data;

  const out = document.createElement("canvas");
  out.width = out.height = size;
  const octx = out.getContext("2d")!;
  const nimg = octx.createImageData(size, size);
  const at = (x: number, y: number) => {
    const xi = (x + size) % size, yi = (y + size) % size;
    return h[(yi * size + xi) * 4] / 255;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx =
        at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1) -
        (at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1));
      const dy =
        at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1) -
        (at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1));
      const nx = -dx * strength, ny = -dy * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      nimg.data[i] = (nx / len) * 0.5 * 255 + 127.5;
      nimg.data[i + 1] = (ny / len) * 0.5 * 255 + 127.5;
      nimg.data[i + 2] = (nz / len) * 0.5 * 255 + 127.5;
      nimg.data[i + 3] = 255;
    }
  }
  octx.putImageData(nimg, 0, 0);
  const tex = new THREE.CanvasTexture(out);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function drawWeaveHeight(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const tape = 12, gap = 2, pitch = tape + gap;
  for (let gy = 0, row = 0; gy < h; gy += pitch, row++) {
    for (let gx = 0, col = 0; gx < w; gx += pitch, col++) {
      const warpOver = (row + col) % 2 === 0;
      const cx = gx + tape / 2, cy = gy + tape / 2;
      const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, tape * 0.9);
      if (warpOver) { g.addColorStop(0, "#d9d9d9"); g.addColorStop(1, "#6e6e6e"); }
      else { g.addColorStop(0, "#bcbcbc"); g.addColorStop(1, "#5a5a5a"); }
      ctx.fillStyle = g;
      if (warpOver) ctx.fillRect(gx, gy - gap, tape, pitch + gap);
      else ctx.fillRect(gx - gap, gy, pitch + gap, tape);
    }
  }
}

function useWovenNormal() {
  // 128² (tiled 6×8) keeps the same lit-weave read at a quarter of the Sobel cost.
  return useMemo(() => heightToNormal(drawWeaveHeight, 128, 2.2, [6, 8]), []);
}

function useRoughnessMap() {
  return useMemo(() => {
    const N = 128;
    const c = document.createElement("canvas");
    c.width = c.height = N;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#6f6f6f"; // laminate = fairly glossy
    ctx.fillRect(0, 0, N, N);
    for (let i = 0; i < N * N * 0.08; i++) {
      const x = Math.random() * N, y = Math.random() * N;
      const v = 130 + Math.random() * 70;
      ctx.fillStyle = `rgba(${v},${v},${v},0.15)`;
      ctx.fillRect(x, y, 2, 2);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 8);
    tex.colorSpace = THREE.NoColorSpace;
    return tex;
  }, []);
}

// ── printed KTK front artwork (transparent, prints over the white body) ─────
function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (-90 + i * 72) * (Math.PI / 180);
    const a2 = a + (36 * Math.PI) / 180;
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.lineTo(cx + Math.cos(a2) * r * 0.45, cy + Math.sin(a2) * r * 0.45);
  }
  ctx.closePath();
  ctx.fill();
}

function usePrintTexture(fontsReady: boolean, logo: HTMLImageElement | null) {
  // Redraws when the Archivo webfont loads and when the real KTK logo image
  // loads, so the bag carries the genuine logo (not a hand-drawn approximation).
  return useMemo(() => {
    void fontsReady;
    const W = 512, H = 700;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center";

    if (logo) {
      // real emblem (left square of the lockup) as the top badge
      const emblemSrc = Math.min(logo.height, logo.width);
      const ew = 156;
      ctx.drawImage(logo, 0, 0, emblemSrc, logo.height, W / 2 - ew / 2, 60, ew, ew * (logo.height / emblemSrc));
    } else {
      // fallback hand-drawn badge until the image resolves
      const ex = W / 2, ey = 150, R = 64;
      ctx.strokeStyle = BRAND_RED;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(ex, ey, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = BRAND_RED;
      for (let i = 0; i < 5; i++) star(ctx, ex - 40 + i * 20, ey - 26, 8);
    }

    // KTK wordmark — blue
    ctx.fillStyle = BRAND_BLUE;
    ctx.font = "800 120px Archivo, system-ui, sans-serif";
    ctx.fillText("KTK", W / 2, 360);

    // red rule
    ctx.fillStyle = BRAND_RED;
    ctx.fillRect(W / 2 - 150, 388, 300, 9);

    // Net : 25 KG
    ctx.fillStyle = "#1a1714";
    ctx.font = "600 34px Archivo, system-ui, sans-serif";
    ctx.fillText("Net : 25 KG", W / 2, 452);

    // full real logo lockup as the company signature
    if (logo) {
      const lw = 260;
      ctx.drawImage(logo, W / 2 - lw / 2, 540, lw, lw * (logo.height / logo.width));
    } else {
      ctx.fillStyle = BRAND_BLUE;
      ctx.font = "600 24px Archivo, system-ui, sans-serif";
      ctx.fillText("Kaung Thu Kha Trading Co.,Ltd", W / 2, 560);
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [fontsReady, logo]);
}

// ── pillow-bag geometry (a filled bag is not a box) ─────────────────────────
const BAG_W = 1.5;
const BAG_H = 2.05;
const BAG_D = 0.14; // thin sealed rim; the body bulges out from here
const INFLATE = 6.5; // how much the filled body puffs

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// z of the bulged, seal-pinched front surface at (x, y) — the print conforms to it
function frontZ(x: number, y: number) {
  const nx = x / (BAG_W / 2);
  const ny = y / (BAG_H / 2);
  let f = Math.max(0, Math.cos((nx * Math.PI) / 2) * Math.cos((ny * Math.PI) / 2));
  const seal = smoothstep(0.78, 1, Math.abs(ny));
  f *= 1 - seal * 0.85;
  return (BAG_D / 2) * (1 + f * INFLATE) * (1 - seal * 0.55);
}

// A box, inflated into a pillow: front/back bulge out, top/bottom pinch into
// flat sealed fins, sides taper. One unified mesh — no stuck-on seam boxes.
function usePillowGeometry() {
  return useMemo(() => {
    const geo = new THREE.BoxGeometry(BAG_W, BAG_H, BAG_D, 40, 48, 3);
    const pos = geo.attributes.position;
    const hw = BAG_W / 2;
    const hh = BAG_H / 2;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      const y = pos.getY(i);
      let z = pos.getZ(i);
      const nx = x / hw;
      const ny = y / hh;
      let f = Math.max(0, Math.cos((nx * Math.PI) / 2) * Math.cos((ny * Math.PI) / 2));
      const seal = smoothstep(0.78, 1, Math.abs(ny));
      f *= 1 - seal * 0.85;
      z = z * (1 + f * INFLATE) * (1 - seal * 0.55); // bulge body, flatten seals
      x = x * (1 - seal * 0.22); // pinch the sealed ends (dog-ear corners)
      pos.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

// A subdivided plane that conforms to the bulged front face, for the print.
function useFrontGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.32, 1.5, 28, 36);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, frontZ(pos.getX(i), pos.getY(i)) + 0.006);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

// ── the bag ─────────────────────────────────────────────────────────────────
function Bag() {
  const [fontsReady, setFontsReady] = useState(false);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    let alive = true;
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    (fonts?.ready ?? Promise.resolve()).then(() => {
      if (alive) setFontsReady(true);
    });
    const img = new Image();
    img.onload = () => {
      if (alive) setLogo(img);
    };
    img.src = "/brand/ktk-logo.png";
    return () => {
      alive = false;
    };
  }, []);

  const wovenNormal = useWovenNormal();
  const roughnessMap = useRoughnessMap();
  const print = usePrintTexture(fontsReady, logo);
  const pillow = usePillowGeometry();
  const frontGeo = useFrontGeometry();

  const bag = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  const bodyMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const front = useRef<THREE.Group>(null!);
  const frontMat = useRef<THREE.MeshStandardMaterial>(null!);
  const start = useRef<number | null>(null);

  useFrame((state) => {
    // Wall clock, NOT state.clock: toggling Canvas frameloop (the offscreen
    // gate) resets the R3F clock to 0, which would otherwise replay the whole
    // assembly every time the hero scrolls back into view.
    if (start.current === null) start.current = performance.now();
    const p = Math.min((performance.now() - start.current) / (DURATION * 1000), 1);

    // 1 — bag forms: appears as the weave tightens
    const a = easeOutCubic(seg(p, 0, 0.32));
    // 2 — fills out: inflates to full depth, laminate gloss arrives
    const b = easeInOutCubic(seg(p, 0.22, 0.66));
    const s = 0.4 + 0.6 * a;
    body.current.scale.set(s, s, s * lerp(0.4, 1, b));
    bodyMat.current.normalScale.set(0.2 + 0.7 * a, 0.2 + 0.7 * a);
    bodyMat.current.roughness = lerp(0.72, 0.42, b);
    bodyMat.current.clearcoat = 0.12 + 0.4 * b;

    // 3 — printed brand appears last
    const e6 = easeOutCubic(seg(p, 0.64, 0.95));
    frontMat.current.opacity = e6;
    front.current.scale.setScalar(lerp(0.965, 1, e6));

    // 4 — settle (monotonic relax, no bounce)
    const e7 = easeOutCubic(seg(p, 0.93, 1));
    bag.current.scale.setScalar(lerp(1.012, 1, e7));

    // idle bob (rotation is owned by PresentationControls for drag-to-rotate)
    const t = state.clock.elapsedTime;
    bag.current.position.y = Math.sin(t * 0.9) * 0.022 * p;
    bag.current.position.x = Math.sin(t * 0.6 + 1.3) * 0.012 * p;
  });

  return (
    <group ref={bag}>
      {/* one inflated pillow mesh — no stuck-on seams */}
      <group ref={body}>
        <mesh geometry={pillow}>
          <meshPhysicalMaterial
            ref={bodyMat}
            color={BODY}
            normalMap={wovenNormal}
            normalScale={new THREE.Vector2(0.85, 0.85)}
            roughnessMap={roughnessMap}
            roughness={0.7}
            metalness={0}
            clearcoat={0.45}
            clearcoatRoughness={0.4}
            envMapIntensity={0.7}
          />
        </mesh>
      </group>

      {/* printed brand layer conforming to the bulged front, appears last */}
      <group ref={front}>
        <mesh geometry={frontGeo}>
          <meshStandardMaterial ref={frontMat} map={print} transparent opacity={0} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function CameraAim() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0.05, 0);
  }, [camera]);
  return null;
}

export default function BagScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full" aria-hidden>
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [1.15, 0.55, 5.6], fov: 28, near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
        style={{ width: "100%", height: "100%" }}
      >
        <CameraAim />
        <ambientLight intensity={0.55} color="#fff6ec" />

        {/* procedural softbox environment — no HDRI fetch */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.2} color="#fff3e6" position={[3.5, 4, 4]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={0.9} color="#cdd6ff" position={[-4, 1.5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1.1} color="#ffe3c4" position={[-2, 2.5, -4]} scale={[3, 4, 1]} target={[0, 0, 0]} />
        </Environment>

        {/* one soft directional for weave raking, no shadow map */}
        <directionalLight position={[3, 5, 4]} intensity={0.65} color="#fff4ea" />

        {/* drag-to-rotate with a gentle spring-back; also follows the cursor */}
        <PresentationControls
          global={false}
          cursor
          snap
          speed={1.2}
          polar={[-0.25, 0.3]}
          azimuth={[-0.7, 0.7]}
        >
          <Bag />
        </PresentationControls>

        <ContactShadows position={[0, -1.22, 0]} opacity={0.34} scale={8} blur={3.2} far={3.2} resolution={512} color={SHADOW} />
      </Canvas>
    </div>
  );
}
