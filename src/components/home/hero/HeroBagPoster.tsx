/**
 * Static, light-themed KTK pillow bag — the hero fallback while the 3D scene
 * loads, for reduced-motion users, and as a lightweight poster. Matches the
 * live 3D bag: white glossy laminated body, fin seals, red emblem, blue KTK
 * wordmark, red rule, "Net : 25 KG", soft contact shadow.
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

export function HeroBagPoster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 460" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hp-body" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F1F0EC" />
          <stop offset="100%" stopColor="#DAD7CF" />
        </linearGradient>
        <linearGradient id="hp-seal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6E3DC" />
          <stop offset="100%" stopColor="#D3CFC5" />
        </linearGradient>
        <radialGradient id="hp-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#15120D" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#15120D" stopOpacity="0" />
        </radialGradient>
        <pattern id="hp-weave" width="9" height="9" patternUnits="userSpaceOnUse">
          <path d="M0 0H9M0 4.5H9" stroke="#000" strokeOpacity="0.05" strokeWidth="1.4" />
          <path d="M0 0V9M4.5 0V9" stroke="#000" strokeOpacity="0.06" strokeWidth="1.6" />
        </pattern>
      </defs>

      <ellipse cx="180" cy="432" rx="118" ry="18" fill="url(#hp-shadow)" />

      <g>
        <rect x="72" y="40" width="216" height="380" rx="22" fill="url(#hp-body)" stroke="#C9C4B6" strokeWidth="1.4" />
        <rect x="72" y="40" width="216" height="380" rx="22" fill="url(#hp-weave)" />
        {/* volume light + shade */}
        <rect x="86" y="56" width="40" height="348" rx="14" fill="#FFFFFF" opacity="0.5" />
        <rect x="244" y="52" width="38" height="356" rx="14" fill="#15120D" opacity="0.05" />

        {/* fin seals top & bottom */}
        <rect x="72" y="40" width="216" height="26" rx="13" fill="url(#hp-seal)" />
        <rect x="72" y="394" width="216" height="26" rx="13" fill="url(#hp-seal)" />

        {/* red circular emblem */}
        <g>
          <circle cx="180" cy="120" r="34" fill="none" stroke="#FC1303" strokeWidth="2.4" />
          <path d="M156 132 A26 26 0 0 1 204 132" fill="none" stroke="#FC1303" strokeWidth="1.6" />
          <path d="M161 128 A20 20 0 0 1 199 128" fill="none" stroke="#FC1303" strokeWidth="1.6" />
          <Star cx={162} cy={106} r={4} />
          <Star cx={171} cy={102} r={4} />
          <Star cx={180} cy={101} r={4} />
          <Star cx={189} cy={102} r={4} />
          <Star cx={198} cy={106} r={4} />
        </g>

        {/* blue KTK wordmark */}
        <text x="180" y="208" textAnchor="middle" fontFamily="Archivo, system-ui, sans-serif" fontWeight="800" fontSize="58" letterSpacing="2" fill="#3B41ED">KTK</text>
        {/* red rule */}
        <rect x="108" y="224" width="144" height="5" rx="2.5" fill="#FC1303" />
        {/* Net : 25 KG */}
        <text x="180" y="262" textAnchor="middle" fontFamily="Archivo, system-ui, sans-serif" fontWeight="600" fontSize="18" fill="#1A1714">Net : 25 KG</text>
        {/* company line */}
        <text x="180" y="324" textAnchor="middle" fontFamily="Archivo, system-ui, sans-serif" fontWeight="600" fontSize="11" fill="#3B41ED">Kaung Thu Kha Trading Co.,Ltd</text>
      </g>
    </svg>
  );
}
