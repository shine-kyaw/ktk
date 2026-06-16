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

// A warm kraft / cement-tan woven PP sack: a real ~60–70%-filled standing bag
// with a rounded bulging body (NO flat side plates — the fabric wraps around
// continuously), sewn flat top + bottom, gravity belly low, dark embossed print.
const BODY = "#CDBA97";   // warm cement-tan kraft
const STRAND = "#C2AE8B"; // weaving tape, a half-shade under the body
const SEAM = "#B49E78";   // darker tan sewn closure band
const INK_CHARCOAL = "#2A2620"; // primary embossed ink — warm dark, never pure black
const INK_RED = "#B5341F";      // a single muted brand hairline
const SHADOW = "#15120D";

const BAG_W = 1.42;
const BAG_H = 1.98;
const BAG_D = 0.5; // generous fill depth; the rounded body bulges to ±BAG_D/2

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
const bump = (x: number, c: number, w: number) => Math.exp(-((x - c) / w) * ((x - c) / w));

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

// A non-repeating normal map baked from a canvas's luminance — used to DEBOSS
// the printed ink into the weave (dark ink = valley), so the print reads as
// pressed into the fabric, not a flat sticker.
function heightToNormalFromCanvas(src: HTMLCanvasElement, size: number, strength: number): THREE.CanvasTexture {
  const comp = document.createElement("canvas");
  comp.width = comp.height = size;
  const cc = comp.getContext("2d", { willReadFrequently: true })!;
  cc.fillStyle = "#ffffff"; // bare fabric = high ground
  cc.fillRect(0, 0, size, size);
  cc.drawImage(src, 0, 0, size, size); // ink lands dark = low ground
  const d = cc.getImageData(0, 0, size, size).data;
  const out = document.createElement("canvas");
  out.width = out.height = size;
  const octx = out.getContext("2d")!;
  const nimg = octx.createImageData(size, size);
  const at = (x: number, y: number) => {
    const xi = (x + size) % size, yi = (y + size) % size;
    const i = (yi * size + xi) * 4;
    return (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
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
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Real over-under woven PP tape structure (warp + weft): rounded fiber-tape
// cross-sections, deep valleys, lengthwise filament striations + a few slubs,
// so individual tapes read at the macro close-up. Coarser + warmer than before.
function drawWeaveHeight(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#1f1f1f"; // deep valleys
  ctx.fillRect(0, 0, w, h);
  const tape = 22, gap = 5, pitch = tape + gap;
  const rnd = () => Math.random() - 0.5;

  const fiber = (cx: number, cy: number, hl: number, hw: number, bright: number, vertical: boolean) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(vertical ? hw : hl, vertical ? hl : hw);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, `rgb(${bright},${bright},${bright})`);
    g.addColorStop(0.5, `rgb(${(bright * 0.6) | 0},${(bright * 0.6) | 0},${(bright * 0.6) | 0})`);
    g.addColorStop(1, "rgba(31,31,31,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    // lengthwise filament striations down the tape
    ctx.globalCompositeOperation = "multiply";
    for (let s = -1; s <= 1; s++) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(120,120,120,0.5)";
      ctx.lineWidth = 0.06;
      ctx.moveTo(s * 0.5, -0.9);
      ctx.lineTo(s * 0.5, 0.9);
      ctx.stroke();
    }
    ctx.restore();
  };

  const cols = Math.ceil(w / pitch) + 1;
  const rows = Math.ceil(h / pitch) + 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * pitch + tape / 2;
      const cy = row * pitch + tape / 2;
      const warpOver = (row + col) % 2 === 0; // over-under alternation
      const bright = (warpOver ? 242 : 188) + Math.round(rnd() * 22);
      const hl = tape * 0.64 * (1 + rnd() * 0.18);
      const hw = tape * 0.34 * (1 + rnd() * 0.18);
      fiber(cx + rnd() * 2, cy + rnd() * 2, hl, hw, bright, warpOver);
    }
  }
  // a few raised slubs (thicker fiber knots) for irregularity
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * w, y = Math.random() * h, r = 2 + Math.random() * 3;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(230,230,230,0.5)");
    g.addColorStop(1, "rgba(230,230,230,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // micro lint / surface noise
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * w, y = Math.random() * h;
    const v = Math.random() > 0.5 ? 210 : 60;
    ctx.fillStyle = `rgba(${v},${v},${v},0.12)`;
    ctx.fillRect(x, y, 1, 1);
  }
}

function useWovenNormal() {
  return useMemo(() => heightToNormal(drawWeaveHeight, 256, 3.1, [13, 9]), []);
}

function useRoughnessMap() {
  return useMemo(() => {
    const N = 256;
    const c = document.createElement("canvas");
    c.width = c.height = N;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#a6a6a6"; // matte fabric base
    ctx.fillRect(0, 0, N, N);
    const tape = 22, gap = 5, pitch = tape + gap;
    for (let row = 0; row * pitch < N + pitch; row++) {
      for (let col = 0; col * pitch < N + pitch; col++) {
        const cx = col * pitch + tape / 2, cy = row * pitch + tape / 2;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, tape * 0.5);
        g.addColorStop(0, "rgba(128,128,128,0.45)"); // tape tops = a touch glossier
        g.addColorStop(1, "rgba(166,166,166,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - tape, cy - tape, tape * 2, tape * 2);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(13, 9);
    tex.colorSpace = THREE.NoColorSpace;
    return tex;
  }, []);
}

// A soft, feathered specular streak for the closing shine sweep.
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

// ── embossed monochrome cement-bag print ────────────────────────────────────
function drawPictogram(ctx: CanvasRenderingContext2D, kind: "dry" | "up" | "stack", cx: number, cy: number, ink: string) {
  ctx.save();
  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  if (kind === "dry") {
    // keep dry — umbrella over rain
    ctx.beginPath();
    ctx.arc(cx, cy - 2, 13, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - 2);
    ctx.lineTo(cx, cy + 12);
    ctx.stroke();
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(cx + i * 8, cy + 6);
      ctx.lineTo(cx + i * 8 - 2, cy + 12);
      ctx.stroke();
    }
  } else if (kind === "up") {
    // this way up — box with two up-arrows
    ctx.strokeRect(cx - 12, cy - 12, 24, 24);
    for (let i = -1; i <= 1; i += 2) {
      ctx.beginPath();
      ctx.moveTo(cx + i * 6, cy + 7);
      ctx.lineTo(cx + i * 6, cy - 7);
      ctx.moveTo(cx + i * 6 - 3, cy - 3);
      ctx.lineTo(cx + i * 6, cy - 7);
      ctx.lineTo(cx + i * 6 + 3, cy - 3);
      ctx.stroke();
    }
  } else {
    // stacking limit — two stacked boxes
    ctx.strokeRect(cx - 11, cy - 12, 22, 10);
    ctx.strokeRect(cx - 11, cy + 2, 22, 10);
  }
  ctx.restore();
}

function emboss(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, font: string) {
  ctx.font = font;
  ctx.fillStyle = "rgba(226,213,188,0.55)"; // light kraft lip below the ink
  ctx.fillText(text, x + 1.5, y + 1.5);
  ctx.fillStyle = INK_CHARCOAL;
  ctx.fillText(text, x, y);
}

function usePrintTexture(fontsReady: boolean) {
  return useMemo(() => {
    void fontsReady;
    const W = 512, H = 680, CX = W / 2;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center";

    emboss(ctx, "KTK", CX, 190, "800 145px Archivo, system-ui, sans-serif");

    const ls = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
    ls.letterSpacing = "6px";
    emboss(ctx, "CEMENT BAG", CX, 246, "700 42px Archivo, system-ui, sans-serif");
    ls.letterSpacing = "0px";

    ctx.fillStyle = INK_CHARCOAL;
    ctx.fillRect(CX - 145, 268, 290, 5);
    ctx.fillStyle = INK_RED;
    ctx.fillRect(CX - 145, 277, 290, 2);

    ls.letterSpacing = "3px";
    emboss(ctx, "BUILT FOR STRENGTH", CX, 322, "600 27px Archivo, system-ui, sans-serif");
    emboss(ctx, "MADE TO PROTECT", CX, 358, "600 27px Archivo, system-ui, sans-serif");
    ls.letterSpacing = "0px";

    emboss(ctx, "50 KG", CX, 470, "800 86px Archivo, system-ui, sans-serif");

    drawPictogram(ctx, "dry", CX - 78, 548, INK_CHARCOAL);
    drawPictogram(ctx, "up", CX, 548, INK_CHARCOAL);
    drawPictogram(ctx, "stack", CX + 78, 548, INK_CHARCOAL);

    // vertical "KTK CEMENT BAG" up both gusset edges
    ls.letterSpacing = "4px";
    ctx.font = "700 24px Archivo, system-ui, sans-serif";
    ctx.fillStyle = INK_CHARCOAL;
    for (const ex of [44, W - 44]) {
      ctx.save();
      ctx.translate(ex, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("KTK CEMENT BAG", 0, 0);
      ctx.restore();
    }
    ls.letterSpacing = "0px";

    const map = new THREE.CanvasTexture(c);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    const normal = heightToNormalFromCanvas(c, 256, 1.4);
    return { map, normal };
  }, [fontsReady]);
}

// ── rounded woven sack geometry (no flat side plates) ────────────────────────
// Silhouette half-width and bulge half-depth as a function of height b∈[-1,1]
// (b=-1 bottom, b=+1 top). Depth → ~0 at top & bottom = sewn flat seams; a
// gravity belly low; a settled base. Cross-section is an ellipse so the fabric
// wraps continuously front → side → back with NO flat plate.
function widthAt(b: number) {
  // a gentle barrel: a touch wider through the belly, tucked at the sewn ends
  const belly = Math.exp(-Math.pow((b + 0.3) / 0.95, 2));
  let w = 0.9 + 0.1 * belly;
  const corner = smoothstep(0.78, 1.0, Math.abs(b));
  w *= 1 - 0.22 * corner; // round/tuck the top + bottom corners (softer dog-ears)
  return w;
}
function depthAt(b: number) {
  const belly = Math.exp(-Math.pow((b + 0.4) / 0.72, 2));
  let d = 0.16 + 0.84 * belly;
  d *= 1 - smoothstep(0.52, 0.99, b);        // sewn flat top, softer shoulder
  d *= 1 - 0.6 * smoothstep(-0.82, -1.0, b); // settled base
  return Math.max(0.03, Math.min(1, d));
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
        let x = hw * wfac * ct;
        let z = hd * dfac * st;
        // a subtle vertical gusset crease where the fabric folds at the sides
        const sideCrease = bump(ct, 1, 0.18) + bump(ct, -1, 0.18);
        z *= 1 - 0.05 * sideCrease * dfac;
        const y = hh * b;
        positions.push(x, y, z);
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
    const geo = new THREE.PlaneGeometry(1.16, 1.54, 40, 48);
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
  useEffect(() => {
    let alive = true;
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    (fonts?.ready ?? Promise.resolve()).then(() => alive && setFontsReady(true));
    return () => { alive = false; };
  }, []);

  const wovenNormal = useWovenNormal();
  const roughnessMap = useRoughnessMap();
  const print = usePrintTexture(fontsReady);
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
  const hStrandGeo = useMemo(() => new THREE.BoxGeometry(BAG_W, 0.05, 0.045), []);
  const vStrandGeo = useMemo(() => new THREE.BoxGeometry(0.05, BAG_H, 0.045), []);
  const strandMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: STRAND, roughness: 0.9, metalness: 0, transparent: true, opacity: 1, depthWrite: false }),
    [],
  );
  // sewn top + bottom closure bands
  const seamHGeo = useMemo(() => new THREE.BoxGeometry(BAG_W * 0.68, 0.08, BAG_D * 0.34), []);
  const seamMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SEAM, roughness: 0.92, transparent: true, opacity: 0, emissive: new THREE.Color("#ffe7c4"), emissiveIntensity: 0 }),
    [],
  );
  const glintTex = useGlintTexture();
  const glintGeo = useMemo(() => new THREE.PlaneGeometry(0.5, 2.7), []);
  const glintMat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: glintTex, color: "#ffeed8", transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    [glintTex],
  );

  const bag = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  const bodyMat = useRef<THREE.MeshPhysicalMaterial>(null!);
  const front = useRef<THREE.Group>(null!);
  const frontMat = useRef<THREE.MeshStandardMaterial>(null!);
  const seamRefs = useRef<(THREE.Group | null)[]>([]);
  const strandRefs = useRef<(THREE.Group | null)[]>([]);
  const glint = useRef<THREE.Group>(null!);
  const start = useRef<number | null>(null);
  const O = 0.09; // over-under depth while weaving (reads against the deep body)

  useFrame(() => {
    if (start.current === null) start.current = performance.now();
    const p = Math.min((performance.now() - start.current) / (DURATION * 1000), 1);

    const tighten = easeInOutCubic(seg(p, 0.5, 0.68));
    const strandFade = easeOutCubic(seg(p, 0.62, 0.76));

    // 1+2 — threads weave in (over-under held through the macro), then tighten
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
    const ns = 0.4 + 1.15 * easeInOutCubic(seg(p, 0.5, 0.72));
    bodyMat.current.normalScale.set(ns, ns);

    // 4 — fold / seal: the top + bottom seam bands grow in, then briefly catch light
    const seamGrow = easeOutCubic(seg(p, 0.68, 0.86));
    seamRefs.current.forEach((g) => {
      if (!g) return;
      g.scale.x = 0.0001 + seamGrow;
    });
    seamMat.opacity = easeOutCubic(seg(p, 0.68, 0.84)) * 0.7;
    seamMat.emissiveIntensity = Math.sin(seg(p, 0.86, 0.98) * Math.PI) * 0.28;

    // 5 — embossed printing applied to the fabric
    frontMat.current.opacity = easeOutCubic(seg(p, 0.82, 0.97)) * 0.92;

    // 6 — one refined specular sweep rakes across the laminate
    const gl = seg(p, 0.82, 1);
    const ge = easeInOutCubic(gl);
    glint.current.position.x = lerp(-1.25, 1.25, ge);
    glint.current.position.y = lerp(0.26, -0.26, ge);
    const glow = Math.pow(Math.sin(gl * Math.PI), 1.6);
    glintMat.opacity = glow * 0.2;
    bodyMat.current.clearcoat = 0.04 + glow * 0.16;

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

      {/* the filled woven bag body (rounded sack — fabric wraps the sides) */}
      <group ref={body}>
        <mesh geometry={bagGeo}>
          <meshPhysicalMaterial
            ref={bodyMat}
            color={BODY}
            normalMap={wovenNormal}
            normalScale={new THREE.Vector2(1.3, 1.3)}
            roughnessMap={roughnessMap}
            roughness={0.96}
            metalness={0}
            clearcoat={0.04}
            clearcoatRoughness={0.7}
            sheen={0.6}
            sheenRoughness={0.9}
            sheenColor="#F6E9CE"
            envMapIntensity={0.4}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      {/* sewn top + bottom seam bands */}
      <group ref={(el) => { seamRefs.current[0] = el; }} position={[0, BAG_H / 2 - 0.05, 0]}>
        <mesh geometry={seamHGeo} material={seamMat} />
      </group>
      <group ref={(el) => { seamRefs.current[1] = el; }} position={[0, -BAG_H / 2 + 0.05, 0]}>
        <mesh geometry={seamHGeo} material={seamMat} />
      </group>

      {/* embossed brand print, conforming to the bulged front */}
      <group ref={front}>
        <mesh geometry={frontGeo}>
          <meshStandardMaterial
            ref={frontMat}
            map={print.map}
            normalMap={print.normal}
            normalScale={new THREE.Vector2(0.8, 0.8)}
            transparent
            opacity={0}
            roughness={0.78}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
      </group>

      {/* one-time specular shine sweep — soft, tilted, raking */}
      <group ref={glint}>
        <mesh position={[0, 0, 0.46]} rotation={[0, 0, 0.2]} geometry={glintGeo} material={glintMat} />
      </group>
    </group>
  );
}

// ── cinematic camera: macro open → pull back → continuous gentle camera orbit ─
const MACRO_POS = new THREE.Vector3(0.3, -0.04, 0.86);
const MACRO_TGT = new THREE.Vector3(0.12, -0.05, 0.18);
const REVEAL_POS = new THREE.Vector3(2.0, 0.42, 4.95); // strong 3/4 so the deep body reads
const REVEAL_TGT = new THREE.Vector3(0, 0.04, 0);
const ORBIT_R = Math.hypot(REVEAL_POS.x, REVEAL_POS.z);
const AZ_REVEAL = Math.atan2(REVEAL_POS.x, REVEAL_POS.z);

function CameraRig() {
  const { camera } = useThree();
  const start = useRef<number | null>(null);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tgt = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    if (start.current === null) start.current = performance.now();
    const t = state.clock.elapsedTime;
    const p = Math.min((performance.now() - start.current) / (DURATION * 1000), 1);
    let fov: number;
    if (p < 0.3) {
      pos.copy(MACRO_POS); tgt.copy(MACRO_TGT); fov = 30;
    } else if (p < 0.62) {
      const e = easeOutCubic(seg(p, 0.3, 0.62));
      pos.copy(MACRO_POS).lerp(REVEAL_POS, e);
      tgt.copy(MACRO_TGT).lerp(REVEAL_TGT, e);
      fov = lerp(30, 26, e);
    } else {
      const e = easeInOutCubic(seg(p, 0.62, 1));
      const azBuild = AZ_REVEAL - 0.06 * e;
      const azIdle = 0.253 + Math.sin(t * 0.31) * 0.044;
      const az = lerp(azBuild, azIdle, e);
      const y = REVEAL_POS.y + Math.sin(t * 0.25) * 0.05 * e;
      pos.set(Math.sin(az) * ORBIT_R, y, Math.cos(az) * ORBIT_R);
      tgt.copy(REVEAL_TGT);
      fov = 26 + Math.sin(t * 0.22) * 0.8 * e;
    }
    camera.position.copy(pos);
    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - fov) > 0.001) { cam.fov = fov; cam.updateProjectionMatrix(); }
    camera.lookAt(tgt);
  });
  return null;
}

// The camera owns the orbit; the bag itself only barely settles — never spins.
function PremiumIdle({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.08) * 0.012; // sub-degree, not a sway
    ref.current.rotation.x = Math.sin(t * 0.1 + 1) * 0.01;
    ref.current.position.y = Math.sin(t * 0.2) * 0.008;
  });
  return <group ref={ref}>{children}</group>;
}

// Three-point relight tuned for warm tan-on-dark: a grazing warm key rakes the
// weave, a cool rim separates the bag from the moody pocket, a warm fill keeps
// the kraft from going muddy.
function Lights() {
  const key = useRef<THREE.DirectionalLight>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const a = 0.5 + Math.sin(t * 0.13) * 0.5;
    key.current.position.set(lerp(3.2, 5.6, a), 0.9 + Math.sin(t * 0.1) * 0.45, lerp(2.4, 0.7, a));
  });
  return (
    <>
      <directionalLight ref={key} intensity={1.55} color="#FFE7C4" />
      <directionalLight position={[-1.0, 2.2, -4.2]} intensity={1.15} color="#CFE0FF" />
      <directionalLight position={[-3.5, 1.6, 3.2]} intensity={0.42} color="#F0E2CC" />
    </>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const N = 48;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = 3.0 + (Math.random() - 0.5) * 4.5; // biased into the pocket
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2.2 - 0.3;
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
      <pointsMaterial size={0.013} color="#C9A876" transparent opacity={0.18} sizeAttenuation depthWrite={false} />
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
        camera={{ position: [0.3, -0.04, 0.86], fov: 28, near: 0.05, far: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.6]}
        style={{ width: "100%", height: "100%" }}
      >
        <CameraRig />
        <ambientLight intensity={0.22} color="#3A2E20" />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.0} color="#FFDFB8" position={[3.6, 3.4, 4]} scale={[6, 6, 1]} target={[0, 0, 0]} />
          <Lightformer form="circle" intensity={0.75} color="#F7ECDA" position={[0, 5, 2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1.1} color="#B9C9FF" position={[-4, 1.2, 2.2]} scale={[5, 5, 1]} target={[0, 0, 0]} />
        </Environment>

        <Lights />

        <Dust />

        <PremiumIdle>
          <PresentationControls
            global={false}
            cursor={false}
            snap
            speed={1.6}
            polar={[-0.22, 0.22]}
            azimuth={[-0.3, 0.45]}
          >
            <Bag />
          </PresentationControls>
        </PremiumIdle>

        <ContactShadows position={[0, -1.05, 0]} opacity={0.34} scale={7.2} blur={3.4} far={3.2} resolution={1024} color={SHADOW} />

        {/* cinematic grade: bloom only the true speculars, so the tan body
            stays rich instead of milky */}
        <EffectComposer>
          <Bloom intensity={0.18} luminanceThreshold={0.88} luminanceSmoothing={0.22} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
