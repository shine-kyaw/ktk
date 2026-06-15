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
  // soft irregularity so the weave isn't mechanically perfect
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 6 + Math.random() * 18;
    const v = Math.random() > 0.5 ? 150 : 92;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(${v},${v},${v},0.22)`);
    rg.addColorStop(1, "rgba(128,128,128,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
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

const sealAt = (ny: number) => smoothstep(0.76, 1, Math.abs(ny));

// Bulge amount 0..1 at normalized (nx, ny): full in the centre, 0 at the
// edges/seals, FULLER toward the bottom (the gravity sag of a filled bag).
function bulgeF(nx: number, ny: number) {
  let f = Math.max(0, Math.cos((nx * Math.PI) / 2) * Math.cos((ny * Math.PI) / 2));
  f *= 1 - 0.18 * ny; // gravity: heavier, fuller lower body
  return Math.max(0, f) * (1 - sealAt(ny) * 0.85);
}

// Subtle fabric gather near the sealed shoulders (radiating wrinkles).
function gatherZ(nx: number, ny: number) {
  const band = smoothstep(0.5, 0.74, Math.abs(ny)) * (1 - smoothstep(0.85, 1, Math.abs(ny)));
  return Math.sin(nx * Math.PI * 4.5) * 0.013 * band;
}

// z of the bulged front surface at (x, y) — the print conforms to it.
function frontZ(x: number, y: number) {
  const nx = x / (BAG_W / 2);
  const ny = y / (BAG_H / 2);
  return (BAG_D / 2) * (1 + bulgeF(nx, ny) * INFLATE) * (1 - sealAt(ny) * 0.55) + gatherZ(nx, ny);
}

// A box inflated into a pillow: front/back bulge out (fuller at the bottom),
// top/bottom pinch into flat sealed fins, sides taper, shoulders gather into
// soft wrinkles. One unified mesh — no stuck-on seam boxes.
function usePillowGeometry() {
  return useMemo(() => {
    const geo = new THREE.BoxGeometry(BAG_W, BAG_H, BAG_D, 48, 56, 3);
    const pos = geo.attributes.position;
    const hw = BAG_W / 2;
    const hh = BAG_H / 2;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      const y = pos.getY(i);
      let z = pos.getZ(i);
      const nx = x / hw;
      const ny = y / hh;
      const seal = sealAt(ny);
      const g = gatherZ(nx, ny) * Math.sign(z || 1);
      z = z * (1 + bulgeF(nx, ny) * INFLATE) * (1 - seal * 0.55) + g;
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
    const geo = new THREE.PlaneGeometry(1.32, 1.5, 32, 40);
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
    bodyMat.current.roughness = lerp(0.78, 0.52, b);
    bodyMat.current.clearcoat = 0.1 + 0.3 * b;

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
            clearcoat={0.4}
            clearcoatRoughness={0.55}
            envMapIntensity={0.85}
            sheen={0.3}
            sheenRoughness={0.8}
            sheenColor="#ffffff"
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

// Constant gentle turntable rock so the bag is always alive (drag overrides it).
function AutoRock({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.42) * 0.42;
    ref.current.rotation.x = Math.sin(t * 0.33 + 1) * 0.045;
  });
  return <group ref={ref}>{children}</group>;
}

// Slow-drifting dust motes — subtle industrial atmosphere.
function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const N = 130;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3 - 0.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i) + d * 0.07;
      if (y > 3.2) y = -3.2;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.022}
        color="#b3ab9d"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
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
        <ambientLight intensity={0.5} color="#fff6ec" />

        {/* procedural softbox environment — no HDRI fetch */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.9} color="#fff3e6" position={[3.5, 4, 4]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="circle" intensity={1.4} color="#ffffff" position={[0, 5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={0.9} color="#cdd6ff" position={[-4, 1.5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1.2} color="#ffe3c4" position={[-2, 2.5, -4]} scale={[3, 4, 1]} target={[0, 0, 0]} />
        </Environment>

        {/* soft key for weave raking + form, no shadow map */}
        <directionalLight position={[3.5, 5, 4]} intensity={0.95} color="#fff4ea" />

        <Dust />

        {/* always-on gentle rock; drag to take control (springs back) */}
        <AutoRock>
          <PresentationControls
            global={false}
            cursor={false}
            snap
            speed={1.4}
            polar={[-0.3, 0.3]}
            azimuth={[-0.9, 0.9]}
          >
            <Bag />
          </PresentationControls>
        </AutoRock>

        <ContactShadows position={[0, -1.3, 0]} opacity={0.26} scale={9.5} blur={4.5} far={3.6} resolution={512} color={SHADOW} />
      </Canvas>
    </div>
  );
}
