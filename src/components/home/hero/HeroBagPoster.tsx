/**
 * Static, light-themed cement bag, used as the hero fallback while the 3D
 * scene loads, for reduced-motion users, and as a lightweight poster. Drawn
 * to match the look of the live 3D bag: cement body, sewn seams, red KTK
 * print band, blue accent, valve, soft contact shadow.
 */
export function HeroBagPoster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 460" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hp-body" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0%" stopColor="#F1EEE7" />
          <stop offset="55%" stopColor="#E4E0D6" />
          <stop offset="100%" stopColor="#CFC9BB" />
        </linearGradient>
        <linearGradient id="hp-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D2CCBE" />
          <stop offset="100%" stopColor="#C2BBAB" />
        </linearGradient>
        <radialGradient id="hp-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B0D12" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0B0D12" stopOpacity="0" />
        </radialGradient>
        <pattern id="hp-weave" width="9" height="9" patternUnits="userSpaceOnUse">
          <path d="M0 0H9M0 4.5H9" stroke="#000" strokeOpacity="0.05" strokeWidth="1.4" />
          <path d="M0 0V9M4.5 0V9" stroke="#000" strokeOpacity="0.07" strokeWidth="1.6" />
        </pattern>
      </defs>

      {/* contact shadow */}
      <ellipse cx="180" cy="430" rx="120" ry="20" fill="url(#hp-shadow)" />

      {/* body */}
      <g>
        <rect x="70" y="40" width="220" height="380" rx="20" fill="url(#hp-body)" stroke="#C4BEAF" strokeWidth="1.5" />
        <rect x="70" y="40" width="220" height="380" rx="20" fill="url(#hp-weave)" />
        {/* left volume highlight */}
        <rect x="84" y="56" width="40" height="348" rx="14" fill="#FFFFFF" opacity="0.18" />
        {/* right volume shade */}
        <rect x="244" y="52" width="40" height="356" rx="14" fill="#0B0D12" opacity="0.06" />

        {/* sewn seams */}
        <rect x="70" y="40" width="220" height="34" rx="16" fill="url(#hp-band)" />
        <rect x="70" y="386" width="220" height="34" rx="16" fill="url(#hp-band)" />
        <line x1="86" y1="57" x2="274" y2="57" stroke="#000" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="2 7" />
        <line x1="86" y1="403" x2="274" y2="403" stroke="#000" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="2 7" />

        {/* valve, top-right */}
        <path d="M214 40 H286 V70 H236 Z" fill="#D8D2C5" stroke="#C0BAAB" strokeWidth="1.2" />

        {/* printed brand band */}
        <rect x="96" y="176" width="168" height="92" rx="8" fill="#FC1303" />
        <text x="180" y="226" textAnchor="middle" fontFamily="Archivo, system-ui, sans-serif" fontWeight="800" fontSize="40" letterSpacing="2" fill="#FFFFFF">KTK</text>
        <rect x="120" y="240" width="120" height="4" rx="2" fill="#3B41ED" />

        {/* spec lines */}
        <rect x="96" y="290" width="150" height="6" rx="3" fill="#0B0D12" opacity="0.18" />
        <rect x="96" y="306" width="120" height="6" rx="3" fill="#0B0D12" opacity="0.13" />
        <rect x="96" y="322" width="138" height="6" rx="3" fill="#0B0D12" opacity="0.1" />
      </g>
    </svg>
  );
}
