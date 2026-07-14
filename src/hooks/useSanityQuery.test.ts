import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { clearSanityQueryCache, useSanityQuery } from '@/hooks/useSanity';

// Mock the sanity client module
vi.mock('@/lib/sanityClient', () => ({
  sanityClient: {
    fetch: vi.fn(),
  },
  urlFor: vi.fn(() => ({
    auto: () => ({
      width: () => ({ url: () => 'https://cdn.sanity.io/mock.webp' }),
      url: () => 'https://cdn.sanity.io/mock.webp',
    }),
  })),
}));

// Import the mocked module to control it
import { sanityClient } from '@/lib/sanityClient';

const mockFetch = sanityClient.fetch as ReturnType<typeof vi.fn>;

describe('useSanityQuery', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    clearSanityQueryCache();
  });

  it('starts in loading state', () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useSanityQuery('*[_type == "service"]'));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns data on successful fetch', async () => {
    const mockData = [{ _id: '1', title: 'Implants' }];
    mockFetch.mockResolvedValue(mockData);

    const { result } = renderHook(() => useSanityQuery('*[_type == "service"]'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useSanityQuery('*[_type == "service"]'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network error');
  });

  it('passes params to sanityClient.fetch', async () => {
    mockFetch.mockResolvedValue([]);

    renderHook(() => useSanityQuery('*[_type == $type]', { type: 'hero' }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('*[_type == $type]', { type: 'hero' });
    });
  });

  it('shares one request when the same approved content is used in several page areas', async () => {
    mockFetch.mockResolvedValue([{ clinicName: 'HS Clinic' }]);

    const first = renderHook(() => useSanityQuery('*[_type == "siteSettings"]'));
    const second = renderHook(() => useSanityQuery('*[_type == "siteSettings"]'));

    await waitFor(() => {
      expect(first.result.current.loading).toBe(false);
      expect(second.result.current.loading).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
