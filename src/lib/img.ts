// Image helpers. Assets keep their original Webflow file names under
// /assets/, with the same responsive variants (-p-500, -p-800 …) so the
// browser picks the same file the original does at each width.

export const asset = (name: string) => `/assets/${name}`;

/** `srcset` for a Webflow image: its -p-<w> variants plus the original. */
export function srcset(base: string, variants: number[], fullWidth: number, ext = 'png') {
  return [
    ...variants.map((v) => `${asset(`${base}-p-${v}.${ext}`)} ${v}w`),
    `${asset(`${base}.${ext}`)} ${fullWidth}w`,
  ].join(', ');
}

/** { img, srcset } for spreading into a component that takes those props. */
export function img(base: string, variants: number[], fullWidth: number, ext = 'png') {
  return { img: asset(`${base}.${ext}`), srcset: srcset(base, variants, fullWidth, ext) };
}
