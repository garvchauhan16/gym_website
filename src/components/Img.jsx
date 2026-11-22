import { imageVariants } from '../config/images.generated.js';

/** "/images/hero.jpg" → "/images/opt/hero-1280.avif 1280w, …" (or null if not optimised). */
export function avifSrcSet(src) {
  const widths = imageVariants[src];
  if (!widths?.length) return null;
  const base = src.replace(/^\/images\//, '').replace(/\.[^.]+$/, '');
  return widths.map((w) => `/images/opt/${base}-${w}.avif ${w}w`).join(', ');
}

/**
 * Responsive image. Serves AVIF at the right width when variants exist (see
 * scripts/optimize-images.sh), falling back to the original JPEG. Any image not
 * in the manifest renders as a plain <img>, so new photos never break.
 *
 * `sizes` describes the rendered width so the browser picks the smallest file:
 *   full-bleed → "100vw" · half column → "(min-width: 1024px) 50vw, 100vw"
 *
 * <picture> uses `display: contents`, so classes on the <img> behave exactly as
 * they would without the wrapper (absolute fills, object-cover, etc.).
 */
export default function Img({ src, alt, sizes = '100vw', loading = 'lazy', className = '', ...rest }) {
  const srcSet = avifSrcSet(src);
  const img = <img src={src} alt={alt} loading={loading} decoding="async" className={className} {...rest} />;
  if (!srcSet) return img;
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet} sizes={sizes} />
      {img}
    </picture>
  );
}
