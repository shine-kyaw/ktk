import type { BagLayerVariant } from "@/data/anatomy";

/**
 * One material layer of the cement bag, drawn as a flat technical sheet.
 * All variants share the same sack silhouette so they stack cleanly; only
 * the interior detail changes. `active` lifts the layer's accent to red.
 *
 * When real layer artwork arrives, a layer can carry an `image` and this
 * component can render it in place of the generated detail.
 */
const COAL = "#000000";
const IRON = "#15151A";
const SEAM = "#33333C";
const BONE = "#FFFFFF";
const DIM = "#C9CAD2";
const ASH = "#85868F";
const RED = "#FC1303";

export function BagSheet({ variant, active }: { variant: BagLayerVariant; active: boolean }) {
  const uid = `bag-${variant}`;
  const stroke = active ? RED : "#3d3d47";
  const clip = `${uid}-clip`;

  return (
    <svg viewBox="0 0 240 300" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <rect x="24" y="20" width="192" height="260" rx="14" />
        </clipPath>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#1E1E25" />
          <stop offset="100%" stopColor="#101015" />
        </linearGradient>
        {variant === "woven" && (
          <pattern id={`${uid}-weave`} width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill="none" />
            <path d="M0 0H14M0 7H14" stroke={DIM} strokeOpacity="0.35" strokeWidth="2" />
            <path d="M0 0V14M7 0V14" stroke={SEAM} strokeOpacity="0.9" strokeWidth="3" />
          </pattern>
        )}
        {variant === "lamination" && (
          <linearGradient id={`${uid}-gloss`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BONE} stopOpacity="0.22" />
            <stop offset="45%" stopColor={BONE} stopOpacity="0.02" />
            <stop offset="100%" stopColor={BONE} stopOpacity="0.14" />
          </linearGradient>
        )}
      </defs>

      {/* base sack body */}
      <rect
        x="24"
        y="20"
        width="192"
        height="260"
        rx="14"
        fill={`url(#${uid}-body)`}
        stroke={stroke}
        strokeWidth={active ? 2.5 : 1.5}
      />
      {/* top highlight for a touch of depth */}
      <rect x="24" y="20" width="192" height="60" fill={BONE} opacity="0.04" clipPath={`url(#${clip})`} />
      {/* sewn top + bottom bands */}
      <rect x="24" y="20" width="192" height="26" fill={COAL} opacity="0.7" clipPath={`url(#${clip})`} />
      <rect x="24" y="254" width="192" height="26" fill={COAL} opacity="0.7" clipPath={`url(#${clip})`} />

      <g clipPath={`url(#${clip})`}>
        {variant === "print" && (
          <>
            <rect x="66" y="78" width="108" height="74" rx="8" fill={RED} opacity="0.92" />
            <rect x="80" y="96" width="42" height="6" rx="3" fill={BONE} />
            <rect x="80" y="110" width="64" height="6" rx="3" fill={BONE} opacity="0.85" />
            <g fill={BONE}>
              <rect x="80" y="128" width="10" height="10" rx="1" />
              <rect x="94" y="128" width="10" height="10" rx="1" opacity="0.7" />
              <rect x="108" y="128" width="10" height="10" rx="1" opacity="0.5" />
            </g>
            <rect x="66" y="170" width="108" height="5" rx="2.5" fill={DIM} opacity="0.5" />
            <rect x="66" y="184" width="86" height="5" rx="2.5" fill={DIM} opacity="0.4" />
            <rect x="66" y="198" width="100" height="5" rx="2.5" fill={DIM} opacity="0.3" />
          </>
        )}

        {variant === "lamination" && (
          <>
            <rect x="24" y="20" width="192" height="260" fill={`url(#${uid}-gloss)`} />
            <polygon points="40,280 120,40 150,40 70,280" fill={BONE} opacity="0.07" />
            <polygon points="150,280 200,130 214,130 178,280" fill={BONE} opacity="0.05" />
          </>
        )}

        {variant === "woven" && (
          <rect x="24" y="46" width="192" height="208" fill={`url(#${uid}-weave)`} />
        )}

        {variant === "stitching" && (
          <>
            <rect
              x="40"
              y="58"
              width="160"
              height="184"
              rx="10"
              fill="none"
              stroke={active ? RED : ASH}
              strokeWidth="2"
              strokeDasharray="2 7"
            />
            <line x1="40" y1="33" x2="200" y2="33" stroke={active ? RED : ASH} strokeWidth="2" strokeDasharray="2 7" />
            <line x1="40" y1="267" x2="200" y2="267" stroke={active ? RED : ASH} strokeWidth="2" strokeDasharray="2 7" />
          </>
        )}

        {variant === "valve" && (
          <>
            {/* block-bottom valve flap, top-right */}
            <polygon points="132,46 196,46 196,86 150,86" fill={COAL} stroke={active ? RED : SEAM} strokeWidth="1.5" />
            <polygon points="150,86 196,86 196,98 150,98" fill={IRON} stroke={SEAM} strokeWidth="1" />
            {/* fill-flow arrow into the valve */}
            <g stroke={active ? RED : DIM} strokeWidth="3" fill="none" strokeLinecap="round">
              <line x1="120" y1="120" x2="164" y2="76" />
              <polyline points="150,74 166,74 166,90" />
            </g>
            {/* sealed bottom emphasis */}
            <rect x="40" y="258" width="160" height="4" rx="2" fill={active ? RED : SEAM} />
          </>
        )}
      </g>
    </svg>
  );
}
