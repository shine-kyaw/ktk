"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

// ── timeline helpers ─────────────────────────────────────────────────────────
const DURATION = 4.4; // seconds for the full "woven into strength" sequence
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => Math.min(Math.max((p - a) / (b - a), 0), 1);

// The KTK product: a WHITE woven PP cement bag — flat, structured, rectangular,
// with realistic woven texture, folds and sealed seams. NOT an inflated pillow.
const BODY = "#F1F0EC";
const STRAND = "#ECEAE3";
const SEAM = "#CCC6B7";
const BRAND_RED = "#FC1303";
const BRAND_BLUE = "#3B41ED";
const SHADOW = "#15120D";

const BAG_W = 1.5;
const BAG_H = 1.98;
const BAG_D = 0.12; // subtle thickness only — a flat bag, not a balloon

// ── height-field → tangent-space normal map (Sobel) ─────────────────────────
function heightToNormal(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  size = 128,
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
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * w, y = Math.random() * h, r = 6 + Math.random() * 18;
    const v = Math.random() > 0.5 ? 150 : 92;
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, `rgba(${v},${v},${v},0.22)`);
    rg.addColorStop(1, "rgba(128,128,128,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
}

function useWovenNormal() {
  return useMemo(() => heightToNormal(drawWeaveHeight, 128, 2.2, [7, 9]), []);
}

function useRoughnessMap() {
  return useMemo(() => {
    const N = 128;
    const c = document.createElement("canvas");
    c.width = c.height = N;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#8a8a8a"; // matte woven base
    ctx.fillRect(0, 0, N, N);
    for (let i = 0; i < N * N * 0.08; i++) {
      const x = Math.random() * N, y = Math.random() * N;
      const v = 130 + Math.random() * 70;
      ctx.fillStyle = `rgba(${v},${v},${v},0.15)`;
      ctx.fillRect(x, y, 2, 2);
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

// ── flat woven-bag geometry (rectangular, subtle thickness, folds + seals) ───
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
const bump = (x: number, c: number, w: number) => Math.exp(-((x - c) / w) * ((x - c) / w));

// thickness multiplier at normalized (nx, ny): mostly flat, gentle fullness,
// soft trifold creases, flattened sealed top/bottom. Stays close to 1 (flat).
function surfaceMul(nx: number, ny: number) {
  const full = Math.max(0, Math.cos((nx * Math.PI) / 2) * Math.cos((ny * Math.PI) / 2)) * 0.6;
  const crease = -0.42 * (bump(nx, -0.34, 0.05) + bump(nx, 0.34, 0.05)); // fold lines
  const seal = smoothstep(0.86, 1, Math.abs(ny));
  return Math.max(0.25, (1 + full + crease)) * (1 - seal * 0.5);
}

function frontZ(x: number, y: number) {
  return (BAG_D / 2) * surfaceMul(x / (BAG_W / 2), y / (BAG_H / 2));
}

function useFlatBagGeometry() {
  return useMemo(() => {
    const geo = new THREE.BoxGeometry(BAG_W, BAG_H, BAG_D, 40, 50, 2);
    const pos = geo.attributes.position;
    const hw = BAG_W / 2, hh = BAG_H / 2;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      let z = pos.getZ(i);
      z = z * surfaceMul(x / hw, y / hh); // flat slab, gentle folds, sealed ends
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function useFrontGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.34, 1.62, 28, 36);
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
  const bagGeo = useFlatBagGeometry();
  const frontGeo = useFrontGeometry();

  // weaving strands (warp + weft)
  const strands = useMemo<Strand[]>(() => {
    const hw = BAG_W / 2, hh = BAG_H / 2;
    const arr: Strand[] = [];
    const NH = 13;
    for (let i = 0; i < NH; i++) {
      arr.push({ axis: "h", a: lerp(-hh * 0.9, hh * 0.9, i / (NH - 1)), side: i % 2 ? 1 : -1, over: i % 2 === 0, delay: (i / NH) * 0.3 });
    }
    const NV = 9;
    for (let j = 0; j < NV; j++) {
      arr.push({ axis: "v", a: lerp(-hw * 0.9, hw * 0.9, j / (NV - 1)), side: j % 2 ? 1 : -1, over: j % 2 === 1, delay: 0.06 + (j / NV) * 0.3 });
    }
    return arr;
  }, []);
  const hStrandGeo = useMemo(() => new THREE.PlaneGeometry(BAG_W, 0.05), []);
  const vStrandGeo = useMemo(() => new THREE.PlaneGeometry(0.05, BAG_H), []);
  const strandMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: STRAND, roughness: 0.92, metalness: 0, transparent: true, opacity: 1, depthWrite: false }),
    [],
  );
  const seamHGeo = useMemo(() => new THREE.BoxGeometry(BAG_W * 0.99, 0.05, BAG_D + 0.02), []);
  const seamVGeo = useMemo(() => new THREE.BoxGeometry(0.04, BAG_H * 0.97, BAG_D + 0.02), []);
  const seamMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SEAM,
        roughness: 0.9,
        transparent: true,
        opacity: 0,
        emissive: new THREE.Color("#ffd9a8"),
        emissiveIntensity: 0,
      }),
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
  const O = 0.03; // over-under offset while weaving

  useFrame((state) => {
    if (start.current === null) start.current = performance.now();
    const p = Math.min((performance.now() - start.current) / (DURATION * 1000), 1);

    const tighten = easeInOutCubic(seg(p, 0.46, 0.62));
    const strandFade = easeOutCubic(seg(p, 0.5, 0.66));

    // 1+2 — threads weave in (over-under), then tighten into alignment
    strands.forEach((s, k) => {
      const g = strandRefs.current[k];
      if (!g) return;
      const grow = easeOutCubic(seg(p, s.delay, s.delay + 0.16));
      if (s.axis === "h") g.scale.x = 0.0001 + grow;
      else g.scale.y = 0.0001 + grow;
      g.position.z = (1 - tighten) * (s.over ? O : -O);
    });
    strandMat.opacity = 1 - strandFade;

    // 3 — woven sheet becomes the bag surface (fades in as strands fade out)
    bodyMat.current.opacity = easeOutCubic(seg(p, 0.5, 0.68));
    bodyMat.current.depthWrite = bodyMat.current.opacity > 0.6;
    const ns = 0.2 + 0.75 * tighten;
    bodyMat.current.normalScale.set(ns, ns);

    // 4 — fold / seal: seam edges form, then briefly highlight (reinforcement)
    const seamGrow = easeOutCubic(seg(p, 0.54, 0.74));
    seamRefs.current.forEach((g, k) => {
      if (!g) return;
      if (k < 2) g.scale.x = 0.0001 + seamGrow; // top/bottom
      else g.scale.y = 0.0001 + seamGrow; // sides
    });
    seamMat.opacity = easeOutCubic(seg(p, 0.54, 0.72));
    seamMat.emissiveIntensity = Math.sin(seg(p, 0.82, 0.96) * Math.PI) * 0.7;

    // 5 — printing applied to the fabric
    frontMat.current.opacity = easeOutCubic(seg(p, 0.72, 0.92));

    // 6 — settle (monotonic, no bounce)
    bag.current.scale.setScalar(lerp(1.01, 1, easeOutCubic(seg(p, 0.93, 1))));
  });

  return (
    <group ref={bag}>
      {/* weaving strands */}
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

      {/* the flat woven bag surface */}
      <group ref={body}>
        <mesh geometry={bagGeo}>
          <meshPhysicalMaterial
            ref={bodyMat}
            color={BODY}
            normalMap={wovenNormal}
            normalScale={new THREE.Vector2(0.9, 0.9)}
            roughnessMap={roughnessMap}
            roughness={0.9}
            metalness={0}
            clearcoat={0.12}
            clearcoatRoughness={0.6}
            sheen={0.4}
            sheenRoughness={0.85}
            sheenColor="#ffffff"
            envMapIntensity={0.7}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      {/* sealed/stitched seam edges (top, bottom, left, right) */}
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
          <meshStandardMaterial ref={frontMat} map={print} transparent opacity={0} roughness={0.6} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function CameraAim() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

// Very subtle idle — a suspended product display, not a floating toy.
function SubtleIdle({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.24) * 0.028; // ~1.6°
    ref.current.rotation.x = Math.sin(t * 0.19 + 1) * 0.012; // ~0.7° perspective shift
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
        camera={{ position: [0.5, 0.25, 5.4], fov: 28, near: 0.1, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
        style={{ width: "100%", height: "100%" }}
      >
        <CameraAim />
        <ambientLight intensity={0.5} color="#fff6ec" />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.8} color="#fff3e6" position={[3.5, 4, 4]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="circle" intensity={1.4} color="#ffffff" position={[0, 5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={0.9} color="#cdd6ff" position={[-4, 1.5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1.1} color="#ffe3c4" position={[-2, 2.5, -4]} scale={[3, 4, 1]} target={[0, 0, 0]} />
        </Environment>

        <directionalLight position={[3.5, 5, 4]} intensity={0.85} color="#fff4ea" />

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

        <ContactShadows position={[0, -1.25, 0]} opacity={0.24} scale={9} blur={4.2} far={3.4} resolution={512} color={SHADOW} />
      </Canvas>
    </div>
  );
}
