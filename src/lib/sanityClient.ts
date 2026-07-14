import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

/**
 * Sanity client — read-only, CDN-enabled.
 * Uses VITE_-prefixed env vars (public, safe for browser).
 * The write token (SANITY_API_TOKEN) is NOT included here.
 */
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2026-02-14',
  useCdn: true, // fast edge-cached reads
});

/* ------------------------------------------------------------------ */
/*  Image URL Builder                                                  */
/* ------------------------------------------------------------------ */

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build an optimised image URL from a Sanity image reference.
 *
 * @example
 * const url = urlFor(doc.mainImage).width(800).url();
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}
