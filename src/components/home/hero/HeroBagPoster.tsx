/**
 * Static, kraft-toned KTK cement bag — the hero fallback while the 3D scene
 * loads, for reduced-motion users, and as a lightweight poster. A filled,
 * softly rounded woven sack: warm kraft-tan body, dark charcoal embossed print
 * (KTK / CEMENT BAG / BUILT FOR STRENGTH / MADE TO PROTECT / 50 KG), a single
 * muted-red hairline rule, and vertical "KTK CEMENT BAG" side text.
 */

// Softly rounded, lightly barrelled woven-sack silhouette.
const BAG =
  "M 96 52 Q 180 44 264 52 Q 286 58 284 78 V 396 Q 286 416 264 422 Q 180 430 96 422 Q 74 416 76 396 V 78 Q 74 58 96 52 Z";

export function HeroBagPoster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 470" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hp-body" x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0%" stopColor="#DCCBA8" />
          <stop offset="52%" stopColor="#CDBA97" />
          <stop offset="100%" stopColor="#B49E78" />
        </linearGradient>
        <radialGradient id="hp-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#15120D" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#15120D" stopOpacity="0" />
        </radialGradient>
        <pattern id="hp-weave" width="9" height="9" patternUnits="userSpaceOnUse">
          <path d="M0 0H9M0 4.5H9" stroke="#1c1813" strokeOpacity="0.07" strokeWidth="1.4" />
          <path d="M0 0V9M4.5 0V9" stroke="#1c1813" strokeOpacity="0.08" strokeWidth="1.6" />
        </pattern>
        <clipPath id="hp-clip">
          <path d={BAG} />
        </clipPath>
      </defs>

      <ellipse cx="182" cy="436" rx="112" ry="16" fill="url(#hp-shadow)" />

      <g>
        <path d={BAG} fill="url(#hp-body)" stroke="#A78C63" strokeWidth="1.4" />
        <g clipPath="url(#hp-clip)">
          <path d={BAG} fill="url(#hp-weave)" />
          {/* soft body shading so the sack reads rounded, not flat */}
          <rect x="92" y="56" width="40" height="368" fill="#FFFFFF" opacity="0.16" />
          <rect x="232" y="56" width="52" height="368" fill="#15120D" opacity="0.07" />
          {/* sewn top + bottom seams */}
          <line x1="92" y1="70" x2="268" y2="70" stroke="#8f7650" strokeWidth="2.6" strokeDasharray="3 4" />
          <line x1="92" y1="404" x2="268" y2="404" stroke="#8f7650" strokeWidth="2.6" strokeDasharray="3 4" />
        </g>

        {/* embossed charcoal print */}
        <g fill="#2A2620" fontFamily="Archivo, system-ui, sans-serif" textAnchor="middle">
          <text x="180" y="170" fontWeight="800" fontSize="62" letterSpacing="2">KTK</text>
          <text x="180" y="206" fontWeight="700" fontSize="21" letterSpacing="4">CEMENT BAG</text>
          <rect x="118" y="218" width="124" height="4" />
          <rect x="118" y="225" width="124" height="2" fill="#B5341F" />
          <text x="180" y="252" fontWeight="600" fontSize="13" letterSpacing="2">BUILT FOR STRENGTH</text>
          <text x="180" y="272" fontWeight="600" fontSize="13" letterSpacing="2">MADE TO PROTECT</text>
          <text x="180" y="338" fontWeight="800" fontSize="44" letterSpacing="1">50 KG</text>
        </g>

        {/* vertical side text */}
        <g fill="#2A2620" fontFamily="Archivo, system-ui, sans-serif" fontWeight="700" fontSize="11" letterSpacing="3" opacity="0.85">
          <text x="104" y="250" transform="rotate(-90 104 250)" textAnchor="middle">KTK CEMENT BAG</text>
          <text x="256" y="250" transform="rotate(-90 256 250)" textAnchor="middle">KTK CEMENT BAG</text>
        </g>
      </g>
    </svg>
  );
}
