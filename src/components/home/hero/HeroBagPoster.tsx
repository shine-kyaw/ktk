/**
 * Static, light-themed KTK pillow bag — the hero fallback while the 3D scene
 * loads, for reduced-motion users, and as a lightweight poster. A filled
 * pillow silhouette (not a rectangle), white glossy laminated body, red
 * emblem, blue KTK wordmark, red rule, "Net : 25 KG", real logo lockup.
 */
function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const a = (-90 + i * 72) * (Math.PI / 180);
    const a2 = a + (36 * Math.PI) / 180;
    pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
    pts.push(`${cx + Math.cos(a2) * r * 0.45},${cy + Math.sin(a2) * r * 0.45}`);
  }
  return <polygon points={pts.join(" ")} fill="#FC1303" />;
}

// Flat, structured, rectangular woven bag with softly rounded corners.
const BAG =
  "M 92 50 H 268 Q 280 50 280 62 V 410 Q 280 422 268 422 H 92 Q 80 422 80 410 V 62 Q 80 50 92 50 Z";

export function HeroBagPoster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 460" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hp-body" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F1F0EC" />
          <stop offset="100%" stopColor="#D6D2CA" />
        </linearGradient>
        <radialGradient id="hp-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#15120D" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#15120D" stopOpacity="0" />
        </radialGradient>
        <pattern id="hp-weave" width="9" height="9" patternUnits="userSpaceOnUse">
          <path d="M0 0H9M0 4.5H9" stroke="#000" strokeOpacity="0.05" strokeWidth="1.4" />
          <path d="M0 0V9M4.5 0V9" stroke="#000" strokeOpacity="0.06" strokeWidth="1.6" />
        </pattern>
        <clipPath id="hp-clip">
          <path d={BAG} />
        </clipPath>
      </defs>

      <ellipse cx="182" cy="430" rx="116" ry="17" fill="url(#hp-shadow)" />

      <g>
        <path d={BAG} fill="url(#hp-body)" stroke="#C9C4B6" strokeWidth="1.4" />
        <g clipPath="url(#hp-clip)">
          <path d={BAG} fill="url(#hp-weave)" />
          {/* subtle flat sheen + faint vertical fold lines */}
          <rect x="92" y="56" width="46" height="360" fill="#FFFFFF" opacity="0.28" />
          <line x1="148" y1="52" x2="148" y2="420" stroke="#15120D" strokeOpacity="0.05" strokeWidth="2" />
          <line x1="212" y1="52" x2="212" y2="420" stroke="#15120D" strokeOpacity="0.05" strokeWidth="2" />
          {/* sealed/stitched seam edges */}
          <line x1="86" y1="66" x2="274" y2="66" stroke="#A99F8B" strokeWidth="2.4" strokeDasharray="3 4" />
          <line x1="86" y1="406" x2="274" y2="406" stroke="#A99F8B" strokeWidth="2.4" strokeDasharray="3 4" />
          <line x1="89" y1="60" x2="89" y2="412" stroke="#A99F8B" strokeWidth="2" strokeDasharray="3 4" />
          <line x1="271" y1="60" x2="271" y2="412" stroke="#A99F8B" strokeWidth="2" strokeDasharray="3 4" />
        </g>

        {/* red circular emblem */}
        <g>
          <circle cx="180" cy="122" r="33" fill="none" stroke="#FC1303" strokeWidth="2.4" />
          <path d="M157 133 A25 25 0 0 1 203 133" fill="none" stroke="#FC1303" strokeWidth="1.6" />
          <path d="M162 129 A19 19 0 0 1 198 129" fill="none" stroke="#FC1303" strokeWidth="1.6" />
          <Star cx={163} cy={109} r={3.6} />
          <Star cx={171} cy={105} r={3.6} />
          <Star cx={180} cy={104} r={3.6} />
          <Star cx={189} cy={105} r={3.6} />
          <Star cx={197} cy={109} r={3.6} />
        </g>

        {/* blue KTK wordmark */}
        <text x="180" y="206" textAnchor="middle" fontFamily="Archivo, system-ui, sans-serif" fontWeight="800" fontSize="56" letterSpacing="2" fill="#3B41ED">KTK</text>
        {/* red rule */}
        <rect x="110" y="221" width="140" height="5" rx="2.5" fill="#FC1303" />
        {/* Net : 25 KG */}
        <text x="180" y="258" textAnchor="middle" fontFamily="Archivo, system-ui, sans-serif" fontWeight="600" fontSize="18" fill="#1A1714">Net : 25 KG</text>
        {/* real KTK logo lockup */}
        <image href="/brand/ktk-logo.png" x="82" y="300" width="196" height="34" preserveAspectRatio="xMidYMid meet" />
      </g>
    </svg>
  );
}
