"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

// ── timeline helpers ─────────────────────────────────────────────────────────
const DURATION = 5.0; // seconds for the full "woven into strength" sequence
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => Math.min(Math.max((p - a) / (b - a), 0), 1);

// A realistic ~60–70%-filled woven PP cement sack: visible weight, structured
// form, gravity sag at the bottom, compression near the top. NOT a balloon,
// NOT a flat sheet. White laminated woven fabric, red emblem + blue KTK print.
const BODY = "#F0EFEA";
const STRAND = "#ECEAE3";
const SEAM = "#CAC4B5";
const BRAND_RED = "#FC1303";
const BRAND_BLUE = "#3B41ED";
const SHADOW = "#15120D";

const BAG_W = 1.5;
const BAG_H = 1.98;
const BAG_D = 0.18; // moderate fill thickness (not flat, not inflated)

// ── height-field → tangent-space normal map (Sobel) ─────────────────────────
function heightToNormal(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  size: number,
  strength: number,
  repeat: [number, number],
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

// Real over-under woven tape structure (warp + weft) with rounded fiber
// cross-sections, deep valleys between strands, and per-tape irregularity.
function drawWeaveHeight(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#2c2c2c"; // deep valleys
  ctx.fillRect(0, 0, w, h);
  const tape = 16, gap = 4, pitch = tape + gap;
  const rnd = () => Math.random() - 0.5;

  // one elongated rounded fiber-tape segment (a raised ridge)
  const fiber = (cx: number, cy: number, hl: number, hw: number, bright: number, vertical: boolean) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(vertical ? hw : hl, vertical ? hl : hw);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, `rgb(${bright},${bright},${bright})`);
    g.addColorStop(0.5, `rgb(${(bright * 0.62) | 0},${(bright * 0.62) | 0},${(bright * 0.62) | 0})`);
    g.addColorStop(1, "rgba(34,34,34,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const cols = Math.ceil(w / pitch) + 1;
  const rows = Math.ceil(h / pitch) + 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * pitch + tape / 2;
      const cy = row * pitch + tape / 2;
      const warpOver = (row + col) % 2 === 0; // over-under alternation
      const bright = (warpOver ? 234 : 196) + Math.round(rnd() * 18); // height + irregularity
      const hl = tape * 0.64 * (1 + rnd() * 0.16);
      const hw = tape * 0.34 * (1 + rnd() * 0.16);
      fiber(cx + rnd() * 2, cy + rnd() * 2, hl, hw, bright, warpOver);
    }
  }
  // micro lint / surface noise for authenticity
  for (let i = 0; i < 220; i++) {
    const x = Math.random() * w, y = Math.random() * h;
    const v = Math.random() > 0.5 ? 210 : 60;
    ctx.fillStyle = `rgba(${v},${v},${v},0.12)`;
    ctx.fillRect(x, y, 1, 1);
  }
}

function useWovenNormal() {
  return useMemo(() => heightToNormal(drawWeaveHeight, 256, 2.6, [7, 9]), []);
}

function useRoughnessMap() {
  return useMemo(() => {
    const N = 256;
    const c = document.createElement("canvas");
    c.width = c.height = N;
    const ctx = c.getContext("2d")!;
    // matte fabric base; tape tops slightly less rough so grazing light glints
    ctx.fillStyle = "#9a9a9a";
    ctx.fillRect(0, 0, N, N);
    const tape = 16, gap = 4, pitch = tape + gap;
    for (let row = 0; row * pitch < N + pitch; row++) {
      for (let col = 0; col * pitch < N + pitch; col++) {
        const cx = col * pitch + tape / 2, cy = row * pitch + tape / 2;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, tape * 0.55);
        g.addColorStop(0, "rgba(120,120,120,0.5)"); // tape top = a bit glossier
        g.addColorStop(1, "rgba(154,154,154,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - tape, cy - tape, tape * 2, tape * 2);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(7, 9);
    tex.colorSpace = THREE.NoColorSpace;
    return tex;
  }, []);
}

// ── printed KTK front artwork (real logo) ───────────────────────────────────
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
      const emblemSrc = Math.min(logo.height, logo.width);
      const ew = 150;
      ctx.drawImage(logo, 0, 0, emblemSrc, logo.height, W / 2 - ew / 2, 70, ew, ew * (logo.height / emblemSrc));
    } else {
      const ex = W / 2, ey = 150, R = 60;
      ctx.strokeStyle = BRAND_RED;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(ex, ey, R, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = BRAND_RED;
      for (let i = 0; i < 5; i++) star(ctx, ex - 40 + i * 20, ey - 26, 8);
    }
    ctx.fillStyle = BRAND_BLUE;
    ctx.font = "800 118px Archivo, system-ui, sans-serif";
    ctx.fillText("KTK", W / 2, 360);
    ctx.fillStyle = BRAND_RED;
    ctx.fillRect(W / 2 - 148, 388, 296, 9);
    ctx.fillStyle = "#1a1714";
    ctx.font = "600 33px Archivo, system-ui, sans-serif";
    ctx.fillText("Net : 25 KG", W / 2, 450);
    if (logo) {
      const lw = 256;
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

// ── ~60–70% filled sack geometry (gravity sag, top compression, creases) ─────
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
const bump = (x: number, c: number, w: number) => Math.exp(-((x - c) / w) * ((x - c) / w));

// thickness multiplier at normalized (nx, ny): moderate fullness, fuller and
// heavier toward the bottom, compressed near the top, with real creases.
function surfaceMul(nx: number, ny: number) {
  let f = Math.max(0, Math.cos((nx * Math.PI) / 2.05) * Math.cos((ny * Math.PI) / 2.3));
  f *= 1 - 0.36 * ny; // gravity: heavier, fuller lower body
  const topComp = smoothstep(0.35, 0.95, ny) * 0.55; // compression near the top
  f = Math.max(0, f) * (1 - topComp);
  const creaseV = -0.2 * (bump(nx, -0.4, 0.06) + bump(nx, 0.4, 0.06)); // subtle side folds
  const foldH = -0.16 * bump(ny, -0.55, 0.1); // a faint lower fold
  const seal = smoothstep(0.88, 1, Math.abs(ny));
  return Math.max(0.3, 1 + f * 2.2 + creaseV + foldH) * (1 - seal * 0.5);
}

function frontZ(x: number, y: number) {
  return (BAG_D / 2) * surfaceMul(x / (BAG_W / 2), y / (BAG_H / 2));
}

function useBagGeometry() {
  return useMemo(() => {
    const geo = new THREE.BoxGeometry(BAG_W, BAG_H, BAG_D, 48, 60, 3);
    const pos = geo.attributes.position;
    const hw = BAG_W / 2, hh = BAG_H / 2;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      pos.setZ(i, pos.getZ(i) * surfaceMul(x / hw, y / hh));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function useFrontGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.34, 1.6, 30, 40);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, frontZ(pos.getX(i), pos.getY(i)) + 0.004);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

// ── the bag — "woven into strength" ─────────────────────────────────────────
type Strand = { axis: "h" | "v"; a: number; side: 1 | -1; over: boolean; delay: number };

function Bag() {
  const [fontsReady, setFontsReady] = useState(false);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    let alive = true;
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    (fonts?.ready ?? Promise.resolve()).then(() => alive && setFontsReady(true));
    const img = new Image();
    img.onload = () => alive && setLogo(img);
    img.src = "/brand/ktk-logo.png";
    return () => { alive = false; };
  }, []);

  const wovenNormal = useWovenNormal();
  const roughnessMap = useRoughnessMap();
  const print = usePrintTexture(fontsReady, logo);
  const bagGeo = useBagGeometry();
  const frontGeo = useFrontGeometry();

  // weaving strands (warp + weft), with slight irregularity
  const strands = useMemo<Strand[]>(() => {
    const hw = BAG_W / 2, hh = BAG_H / 2;
    const arr: Strand[] = [];
    const NH = 16;
    for (let i = 0; i < NH; i++) {
      const j = (Math.random() - 0.5) * 0.03;
      arr.push({ axis: "h", a: lerp(-hh * 0.92, hh * 0.92, i / (NH - 1)) + j, side: i % 2 ? 1 : -1, over: i % 2 === 0, delay: (i / NH) * 0.26 });
    }
    const NV = 12;
    for (let k = 0; k < NV; k++) {
      const j = (Math.random() - 0.5) * 0.03;
      arr.push({ axis: "v", a: lerp(-hw * 0.92, hw * 0.92, k / (NV - 1)) + j, side: k % 2 ? 1 : -1, over: k % 2 === 1, delay: 0.05 + (k / NV) * 0.26 });
    }
    return arr;
  }, []);
  const hStrandGeo = useMemo(() => new THREE.BoxGeometry(BAG_W, 0.05, 0.04), []);
  const vStrandGeo = useMemo(() => new THREE.BoxGeometry(0.05, BAG_H, 0.04), []);
  const strandMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: STRAND, roughness: 0.85, metalness: 0, transparent: true, opacity: 1, depthWrite: false }),
    [],
  );
  const seamHGeo = useMemo(() => new THREE.BoxGeometry(BAG_W * 0.99, 0.05, BAG_D + 0.02), []);
  const seamVGeo = useMemo(() => new THREE.BoxGeometry(0.04, BAG_H * 0.97, BAG_D + 0.02), []);
  const seamMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SEAM, roughness: 0.9, transparent: true, opacity: 0, emissive: new THREE.Color("#ffd9a8"), emissiveIntensity: 0 }),
    [],
  );

  const bag = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  const bodyMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const front = useRef<THREE.Group>(null!);
  const frontMat = useRef<THREE.MeshStandardMaterial>(null!);
  const seamRefs = useRef<(THREE.Group | null)[]>([]);
  const strandRefs = useRef<(THREE.Group | null)[]>([]);
  const start = useRef<number | null>(null);
  const O = 0.04; // over-under depth while weaving

  useFrame((state) => {
    if (start.current === null) start.current = performance.now();
    const p = Math.min((performance.now() - start.current) / (DURATION * 1000), 1);

    const tighten = easeInOutCubic(seg(p, 0.5, 0.68)); // over-under flattens AFTER the macro
    const strandFade = easeOutCubic(seg(p, 0.62, 0.76));

    // 1+2 — threads weave in (over-under depth held through the macro), then tighten
    strands.forEach((s, k) => {
      const g = strandRefs.current[k];
      if (!g) return;
      const grow = easeOutCubic(seg(p, s.delay, s.delay + 0.15));
      if (s.axis === "h") g.scale.x = 0.0001 + grow;
      else g.scale.y = 0.0001 + grow;
      g.position.z = (1 - tighten) * (s.over ? O : -O);
    });
    strandMat.opacity = 1 - strandFade;

    // 3 — woven sheet becomes the bag surface (fades in as strands fade out)
    bodyMat.current.opacity = easeOutCubic(seg(p, 0.64, 0.8));
    bodyMat.current.depthWrite = bodyMat.current.opacity > 0.6;
    const ns = 0.4 + 0.85 * easeInOutCubic(seg(p, 0.5, 0.72));
    bodyMat.current.normalScale.set(ns, ns);

    // 4 — fold / seal: reinforced seam edges form, then briefly highlight
    const seamGrow = easeOutCubic(seg(p, 0.68, 0.86));
    seamRefs.current.forEach((g, k) => {
      if (!g) return;
      if (k < 2) g.scale.x = 0.0001 + seamGrow;
      else g.scale.y = 0.0001 + seamGrow;
    });
    seamMat.opacity = easeOutCubic(seg(p, 0.68, 0.84));
    seamMat.emissiveIntensity = Math.sin(seg(p, 0.86, 0.98) * Math.PI) * 0.7;

    // 5 — printing applied to the fabric
    frontMat.current.opacity = easeOutCubic(seg(p, 0.82, 0.97));

    // 6 — settle
    bag.current.scale.setScalar(lerp(1.008, 1, easeOutCubic(seg(p, 0.96, 1))));
  });

  return (
    <group ref={bag}>
      {/* weaving strands (fiber tapes) */}
      {strands.map((s, k) => {
        const isH = s.axis === "h";
        const len = isH ? BAG_W : BAG_H;
        const gp: [number, number, number] = isH ? [s.side * (BAG_W / 2), s.a, 0] : [s.a, s.side * (BAG_H / 2), 0];
        const mp: [number, number, number] = isH ? [(-s.side * len) / 2, 0, 0] : [0, (-s.side * len) / 2, 0];
        return (
          <group key={k} ref={(el) => { strandRefs.current[k] = el; }} position={gp}>
            <mesh position={mp} geometry={isH ? hStrandGeo : vStrandGeo} material={strandMat} />
          </group>
        );
      })}

      {/* the filled woven bag surface */}
      <group ref={body}>
        <mesh geometry={bagGeo}>
          <meshPhysicalMaterial
            ref={bodyMat}
            color={BODY}
            normalMap={wovenNormal}
            normalScale={new THREE.Vector2(1.1, 1.1)}
            roughnessMap={roughnessMap}
            roughness={0.92}
            metalness={0}
            clearcoat={0.1}
            clearcoatRoughness={0.65}
            sheen={0.45}
            sheenRoughness={0.85}
            sheenColor="#ffffff"
            envMapIntensity={0.6}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      {/* reinforced seam edges */}
      <group ref={(el) => { seamRefs.current[0] = el; }} position={[0, BAG_H / 2 - 0.04, 0]}>
        <mesh geometry={seamHGeo} material={seamMat} />
      </group>
      <group ref={(el) => { seamRefs.current[1] = el; }} position={[0, -BAG_H / 2 + 0.04, 0]}>
        <mesh geometry={seamHGeo} material={seamMat} />
      </group>
      <group ref={(el) => { seamRefs.current[2] = el; }} position={[BAG_W / 2 - 0.03, 0, 0]}>
        <mesh geometry={seamVGeo} material={seamMat} />
      </group>
      <group ref={(el) => { seamRefs.current[3] = el; }} position={[-BAG_W / 2 + 0.03, 0, 0]}>
        <mesh geometry={seamVGeo} material={seamMat} />
      </group>

      {/* printed brand on the fabric, conforming to the surface */}
      <group ref={front}>
        <mesh geometry={frontGeo}>
          <meshStandardMaterial ref={frontMat} map={print} transparent opacity={0} roughness={0.62} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

// Cinematic camera: product view -> macro dive into the weave -> back to product.
const PRODUCT_POS = new THREE.Vector3(1.5, 0.35, 5.0); // slight 3/4 so the fill volume reads
const PRODUCT_TGT = new THREE.Vector3(0, 0, 0);
const MACRO_POS = new THREE.Vector3(0.28, -0.06, 0.92);
const MACRO_TGT = new THREE.Vector3(0.12, -0.06, 0.18);

function CameraRig() {
  const { camera } = useThree();
  const start = useRef<number | null>(null);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tgt = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    if (start.current === null) start.current = performance.now();
    const p = Math.min((performance.now() - start.current) / (DURATION * 1000), 1);
    if (p < 0.36) {
      pos.copy(PRODUCT_POS); tgt.copy(PRODUCT_TGT);
    } else if (p < 0.5) {
      const e = easeInOutCubic(seg(p, 0.36, 0.5));
      pos.copy(PRODUCT_POS).lerp(MACRO_POS, e);
      tgt.copy(PRODUCT_TGT).lerp(MACRO_TGT, e);
    } else if (p < 0.6) {
      pos.copy(MACRO_POS); tgt.copy(MACRO_TGT);
    } else if (p < 0.76) {
      const e = easeInOutCubic(seg(p, 0.6, 0.76));
      pos.copy(MACRO_POS).lerp(PRODUCT_POS, e);
      tgt.copy(MACRO_TGT).lerp(PRODUCT_TGT, e);
    } else {
      pos.copy(PRODUCT_POS); tgt.copy(PRODUCT_TGT);
    }
    camera.position.copy(pos);
    camera.lookAt(tgt);
  });
  return null;
}

// Very subtle idle — a suspended product display, not a floating toy.
function SubtleIdle({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.24) * 0.028;
    ref.current.rotation.x = Math.sin(t * 0.19 + 1) * 0.012;
  });
  return <group ref={ref}>{children}</group>;
}

function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const N = 110;
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
      let y = pos.getY(i) + d * 0.06;
      if (y > 3.2) y = -3.2;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.02} color="#b3ab9d" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
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
        camera={{ position: [1.5, 0.35, 5.0], fov: 28, near: 0.05, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
        style={{ width: "100%", height: "100%" }}
      >
        <CameraRig />
        <ambientLight intensity={0.45} color="#fff6ec" />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.4} color="#fff3e6" position={[3.5, 4, 4]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="circle" intensity={1.2} color="#ffffff" position={[0, 5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={0.8} color="#cdd6ff" position={[-4, 1.5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
        </Environment>

        {/* grazing key light — rakes across the weave so fibers cast shadows */}
        <directionalLight position={[5.5, 1.2, 1.4]} intensity={1.25} color="#fff4ea" />
        <directionalLight position={[-3, 3, 3]} intensity={0.35} color="#e8eeff" />

        <Dust />

        <SubtleIdle>
          <PresentationControls
            global={false}
            cursor={false}
            snap
            speed={1.4}
            polar={[-0.25, 0.25]}
            azimuth={[-0.6, 0.6]}
          >
            <Bag />
          </PresentationControls>
        </SubtleIdle>

        <ContactShadows position={[0, -1.25, 0]} opacity={0.26} scale={9} blur={4} far={3.4} resolution={512} color={SHADOW} />
      </Canvas>
    </div>
  );
}
