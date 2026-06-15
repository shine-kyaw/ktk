import Image from "next/image";

/**
 * Large product image area with a graceful no-photo placeholder that matches
 * the light textures. When `image` is set (via CMS), swaps to a real next/image.
 */
export function ProductMedia({ image, alt }: { image: string | null; alt: string }) {
  if (image) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-iron">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }
  return (
    <div className="weave blueprint relative flex aspect-[4/3] flex-col items-center justify-center bg-coal">
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-seam" fill="none" aria-hidden="true">
        <rect x="14" y="10" width="36" height="44" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M22 10v6h20v-6" stroke="currentColor" strokeWidth="2" />
        <path d="M22 30h20M22 38h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="mono mt-5 text-[0.6rem] uppercase tracking-[0.2em] text-ash">
        Product photography coming via CMS
      </span>
    </div>
  );
}
