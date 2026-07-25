"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PresentationControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
const SEAM = "#DCD6CA"; // close to body — a subtle sewn fold, not a dark frame
const BRAND_RED = "#ED1C24";
const BRAND_BLUE = "#2F318D";
const SHADOW = "#15120D";

const BAG_W = 1.5;
const BAG_H = 1.98;
const BAG_D = 0.54; // deep fill so the sack reads as a solid 3D form when rotated

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
  return useMemo(() => heightToNormal(drawWeaveHeight, 256, 2.6, [15, 9]), []);
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
    tex.repeat.set(15, 9);
    tex.colorSpace = THREE.NoColorSpace;
    return tex;
  }, []);
}

// A soft, feathered specular streak for the closing shine sweep. Bright core
// that falls off smoothly on the sides AND fades at both ends — so it reads as
// light raking across laminate, never a hard white bar.
function useGlintTexture() {
  return useMemo(() => {
    const W = 128, H = 256;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, W, 0);
    g.addColorStop(0.0, "rgba(255,255,255,0)");
    g.addColorStop(0.4, "rgba(255,255,255,0.05)");
    g.addColorStop(0.5, "rgba(255,255,255,0.96)");
    g.addColorStop(0.6, "rgba(255,255,255,0.05)");
    g.addColorStop(1.0, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // feather the ends so the streak has no hard top/bottom edge
    ctx.globalCompositeOperation = "destination-in";
    const v = ctx.createLinearGradient(0, 0, 0, H);
    v.addColorStop(0.0, "rgba(0,0,0,0)");
    v.addColorStop(0.2, "rgba(0,0,0,1)");
    v.addColorStop(0.8, "rgba(0,0,0,1)");
    v.addColorStop(1.0, "rgba(0,0,0,0)");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, W, H);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
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

// Silhouette half-width and bulge half-depth as a function of height b∈[-1,1]
// (b=-1 bottom, +1 top). Depth → ~0 at the top & bottom = sewn flat seams; a
// gravity belly low; a gentle barrel; a settled base. The cross-section is an
// ellipse, so the fabric wraps front → side → back continuously — there is NO
// flat side plate, and the bag reads as a solid 3D form from any rotation.
function widthAt(b: number) {
  const belly = Math.exp(-Math.pow((b + 0.3) / 0.95, 2));
  let w = 0.9 + 0.1 * belly;
  const corner = smoothstep(0.78, 1.0, Math.abs(b));
  w *= 1 - 0.22 * corner; // tuck the sewn top + bottom corners
  return w;
}
function depthAt(b: number) {
  // fuller, more uniform body (rounded side profile, not a teardrop); only the
  // very top tapers to the sewn seam, the base settles a touch.
  const belly = Math.exp(-Math.pow((b + 0.15) / 1.05, 2));
  let d = 0.36 + 0.64 * belly;
  d *= 1 - smoothstep(0.64, 1.0, b);         // taper only near the very top
  d *= 1 - 0.5 * smoothstep(-0.86, -1.0, b); // settled base
  return Math.max(0.04, Math.min(1, d));
}

function useSackGeometry() {
  return useMemo(() => {
    const NU = 144, NV = 120; // around the cross-section, up the height
    const hw = BAG_W / 2, hh = BAG_H / 2, hd = BAG_D / 2;
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    for (let j = 0; j <= NV; j++) {
      const v = j / NV;
      const b = v * 2 - 1;
      const wfac = widthAt(b);
      const dfac = depthAt(b);
      for (let i = 0; i <= NU; i++) {
        const u = i / NU;
        const th = u * Math.PI * 2; // front centre at th = π/2
        const ct = Math.cos(th), st = Math.sin(th);
        // collapse the very top + bottom rings to z=0 so the bag is CLOSED
        // (a sewn flat seam, no open hole to see through when rotated)
        const isEnd = j === 0 || j === NV;
        let z = isEnd ? 0 : hd * dfac * st;
        const sideCrease = bump(ct, 1, 0.18) + bump(ct, -1, 0.18); // soft gusset fold
        z *= 1 - 0.05 * sideCrease * dfac;
        positions.push(hw * wfac * ct, hh * b, z);
        uvs.push(u, v);
      }
    }
    const row = NU + 1;
    for (let j = 0; j < NV; j++) {
      for (let i = 0; i < NU; i++) {
        const a = j * row + i, b2 = a + 1, c = a + row, d = c + 1;
        indices.push(a, c, b2, b2, c, d); // outward-facing winding
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

// z of the front surface at planar (px,py) — the print plane conforms to the bulge
function frontConformZ(px: number, py: number) {
  const b = py / (BAG_H / 2);
  const wfac = widthAt(b);
  const dfac = depthAt(b);
  const ratio = Math.max(-0.94, Math.min(0.94, px / ((BAG_W / 2) * wfac)));
  return (BAG_D / 2) * dfac * Math.sqrt(Math.max(0, 1 - ratio * ratio));
}

function useFrontGeometry() {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(1.2, 1.58, 40, 48);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, frontConformZ(pos.getX(i), pos.getY(i)) + 0.008);
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
  const bagGeo = useSackGeometry();
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
  // sewn top + bottom closure bands, inset so they tuck inside the rounded ends
  const seamHGeo = useMemo(() => new THREE.BoxGeometry(BAG_W * 0.66, 0.08, BAG_D * 0.24), []);
  const seamMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SEAM, roughness: 0.88, transparent: true, opacity: 0, emissive: new THREE.Color("#ffe7c4"), emissiveIntensity: 0 }),
    [],
  );
  const glintTex = useGlintTexture();
  const glintGeo = useMemo(() => new THREE.PlaneGeometry(0.5, 2.9), []);
  const glintMat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: glintTex, color: "#fff2e8", transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    [glintTex],
  );

  const bag = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  const bodyMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const front = useRef<THREE.Group>(null!);
  const frontMat = useRef<THREE.MeshStandardMaterial>(null!);
  const backMat = useRef<THREE.MeshStandardMaterial>(null!);
  const seamRefs = useRef<(THREE.Group | null)[]>([]);
  const strandRefs = useRef<(THREE.Group | null)[]>([]);
  const glint = useRef<THREE.Group>(null!);
  const start = useRef<number | null>(null);
  const O = 0.09; // over-under depth while weaving (reads against the deep body)

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

    // 4 — fold / seal: the top + bottom seam bands grow in, then briefly catch light
    const seamGrow = easeOutCubic(seg(p, 0.68, 0.86));
    seamRefs.current.forEach((g) => {
      if (!g) return;
      g.scale.x = 0.0001 + seamGrow;
    });
    seamMat.opacity = easeOutCubic(seg(p, 0.68, 0.84)) * 0.62;
    seamMat.emissiveIntensity = Math.sin(seg(p, 0.86, 0.98) * Math.PI) * 0.3;

    // 5 — printing applied to the fabric (front + back)
    frontMat.current.opacity = easeOutCubic(seg(p, 0.82, 0.97));
    backMat.current.opacity = frontMat.current.opacity;

    // 6 — one refined specular sweep: a soft highlight rakes across the
    // laminate, which briefly catches the light (clearcoat lift) as it passes.
    const gl = seg(p, 0.82, 1);
    const ge = easeInOutCubic(gl);
    glint.current.position.x = lerp(-1.3, 1.3, ge);
    glint.current.position.y = lerp(0.26, -0.26, ge); // slight diagonal rake
    const glow = Math.pow(Math.sin(gl * Math.PI), 1.6);
    glintMat.opacity = glow * 0.24;
    bodyMat.current.clearcoat = 0.1 + glow * 0.16;

    // 7 — settle
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
            side={THREE.DoubleSide}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      {/* sewn top + bottom seam bands (sides are smooth folds) */}
      <group ref={(el) => { seamRefs.current[0] = el; }} position={[0, BAG_H / 2 - 0.08, 0]}>
        <mesh geometry={seamHGeo} material={seamMat} />
      </group>
      <group ref={(el) => { seamRefs.current[1] = el; }} position={[0, -BAG_H / 2 + 0.08, 0]}>
        <mesh geometry={seamHGeo} material={seamMat} />
      </group>

      {/* printed brand on the fabric — front + back, conforming to the surface */}
      <group ref={front}>
        <mesh geometry={frontGeo}>
          <meshStandardMaterial ref={frontMat} map={print} transparent opacity={0} roughness={0.62} depthWrite={false} />
        </mesh>
        <mesh geometry={frontGeo} rotation={[0, Math.PI, 0]}>
          <meshStandardMaterial ref={backMat} map={print} transparent opacity={0} roughness={0.62} depthWrite={false} />
        </mesh>
      </group>

      {/* one-time specular shine sweep — soft, tilted, raking */}
      <group ref={glint}>
        <mesh position={[0, 0, 0.42]} rotation={[0, 0, 0.2]} geometry={glintGeo} material={glintMat} />
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

// Premium idle — a slow, smooth sway that reveals the product's dimension in
// the light, like a suspended studio display. Refined, never busy.
function PremiumIdle({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.16) * 0.085; // ~±5°, slow + smooth
    ref.current.rotation.x = Math.sin(t * 0.12 + 1) * 0.018;
    ref.current.position.y = Math.sin(t * 0.2) * 0.01; // barely-there float
  });
  return <group ref={ref}>{children}</group>;
}

// A slow studio light sweep so a soft highlight travels across the laminate,
// plus a quiet rim for a premium edge — refined product-render lighting.
function Lights() {
  const key = useRef<THREE.DirectionalLight>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const a = 0.5 + Math.sin(t * 0.13) * 0.5;
    key.current.position.set(lerp(2.6, 6, a), 1.2 + Math.sin(t * 0.1) * 0.7, lerp(2.8, 0.9, a));
  });
  return (
    <>
      <directionalLight ref={key} intensity={1.25} color="#fff4ea" />
      <directionalLight position={[-3.5, 3, 3]} intensity={0.3} color="#e8eeff" />
      <directionalLight position={[-1.2, 1.8, -4]} intensity={0.7} color="#ffffff" />
    </>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const N = 70;
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
      let y = pos.getY(i) + d * 0.04;
      if (y > 3.2) y = -3.2;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.016} color="#bcb5a8" transparent opacity={0.28} sizeAttenuation depthWrite={false} />
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
    <div ref={wrapRef} className="h-full w-full" style={{ animation: "ktkBagFade 700ms ease-out both" }} aria-hidden>
      <style>{`@keyframes ktkBagFade { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [1.5, 0.35, 5.0], fov: 28, near: 0.05, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
        style={{ width: "100%", height: "100%" }}
      >
        <CameraRig />
        <ambientLight intensity={0.34} color="#fff6ec" />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.4} color="#fff3e6" position={[3.5, 4, 4]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="circle" intensity={1.2} color="#ffffff" position={[0, 5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={0.8} color="#cdd6ff" position={[-4, 1.5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
        </Environment>

        <Lights />

        <Dust />

        <PremiumIdle>
          <PresentationControls
            global={false}
            cursor={false}
            snap
            speed={1.6}
            polar={[-0.35, 0.35]}
            azimuth={[-Math.PI, Math.PI]}
          >
            <Bag />
          </PresentationControls>
        </PremiumIdle>

        <ContactShadows position={[0, -1.3, 0]} opacity={0.2} scale={9.5} blur={5} far={3.6} resolution={1024} color={SHADOW} />

        {/* cinematic grade: bloom only the true speculars, so the white bag
            stays crisp instead of milky */}
        <EffectComposer>
          <Bloom intensity={0.22} luminanceThreshold={0.9} luminanceSmoothing={0.2} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
