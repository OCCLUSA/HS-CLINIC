import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '@/lib/sanityClient';

/* ================================================================
   useSanityQuery — generic GROQ query hook
   ================================================================ */

interface SanityQueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const queryCache = new Map<string, Promise<unknown>>();

function fetchCachedQuery<T>(
  query: string,
  params: Record<string, unknown>,
  paramsKey: string
): Promise<T> {
  const cacheKey = `${query}\u0000${paramsKey}`;
  const cached = queryCache.get(cacheKey);
  if (cached) return cached as Promise<T>;

  const request = sanityClient.fetch<T>(query, params).catch((cause: unknown) => {
    if (queryCache.get(cacheKey) === request) queryCache.delete(cacheKey);
    const error = cause instanceof Error ? cause : new Error(String(cause));
    console.error('[Sanity] Query failed:', error.message);
    throw error;
  });
  queryCache.set(cacheKey, request);
  return request;
}

export function clearSanityQueryCache() {
  queryCache.clear();
}

/**
 * Fetch data from Sanity using a GROQ query.
 *
 * @example
 * const { data, loading } = useSanityQuery<SanityService[]>(
 *   `*[_type == "service"] | order(order asc)`
 * );
 */
export function useSanityQuery<T = unknown>(
  query: string,
  params?: Record<string, unknown>
): SanityQueryState<T> {
  const [state, setState] = useState<SanityQueryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // Stringify params for stable dependency
  const paramsKey = params ? JSON.stringify(params) : '';

  useEffect(() => {
    let cancelled = false;

    const parsedParams = paramsKey ? JSON.parse(paramsKey) : {};

    fetchCachedQuery<T>(query, parsedParams, paramsKey)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [query, paramsKey]);

  return state;
}

/* ================================================================
   useSanityImage — image URL helper hook
   ================================================================ */

/**
 * Convert a Sanity image reference to an optimised URL string.
 *
 * @param source  Sanity image reference object
 * @param width   Optional width constraint
 * @returns       URL string or empty string if source is falsy
 *
 * @example
 * const url = useSanityImage(hero.backgroundImage, 1200);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSanityImage(source: any, width?: number): string {
  if (!source) return '';

  let img = urlFor(source).auto('format');
  if (width) img = img.width(width);
  return img.url();
}
