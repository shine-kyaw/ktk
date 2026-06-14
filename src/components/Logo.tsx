/**
 * KTK emblem — a subtle, simplified recreation of the company mark:
 * red top/bottom caps, a navy band of five stars, a clean ring. Kept
 * understated (small, flat) so it reads as a quiet brand cue, not the
 * loud full-color logo from the old site. Swap for the official asset by
 * dropping it in /public and replacing this with an <Image>.
 */
const RED = "#E8463A";
const NAVY = "#0A2540";

export function Logo({ className = "" }: { className?: string }) {
  // Subtle sunburst ticks in the red caps
  const ticks = [22, 34, 46, 58, 70, 82];
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Kaung Thu Kha emblem">
      <defs>
        <clipPath id="ktkClip">
          <circle cx="50" cy="50" r="47" />
        </clipPath>
      </defs>
      <g clipPath="url(#ktkClip)">
        <rect x="0" y="0" width="100" height="39" fill={RED} />
        <rect x="0" y="61" width="100" height="39" fill={RED} />
        <rect x="0" y="39" width="100" height="22" fill={NAVY} />
        {/* faint radiating ticks, top + bottom caps */}
        <g stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2">
          {ticks.map((x) => (
            <line key={`t${x}`} x1={x} y1="6" x2={x} y2="17" />
          ))}
          {ticks.map((x) => (
            <line key={`b${x}`} x1={x} y1="83" x2={x} y2="94" />
          ))}
        </g>
        {/* thin separators */}
        <rect x="0" y="37.5" width="100" height="2" fill="#EFF2F7" />
        <rect x="0" y="60.5" width="100" height="2" fill="#EFF2F7" />
        {/* five stars */}
        <text
          x="50"
          y="54.5"
          textAnchor="middle"
          fontSize="11"
          letterSpacing="0.5"
          fill="#FFFFFF"
        >
          ★★★★★
        </text>
      </g>
      <circle cx="50" cy="50" r="47" fill="none" stroke="#EFF2F7" strokeOpacity="0.9" strokeWidth="3" />
    </svg>
  );
}
