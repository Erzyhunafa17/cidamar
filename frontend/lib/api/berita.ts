import { API_BASE_URL, REVALIDATE } from '../utils/constants';
import { PaginatedResponse, ApiResponse, Berita } from '@/types';

export const fetchBeritaList = async (
  page: number = 1,
  limit: number = 10,
  kategori?: string,
  search?: string
): Promise<PaginatedResponse<Berita>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (kategori) params.append('kategori', kategori);
  if (search) params.append('q', search);

  const res = await fetch(`${API_BASE_URL}/api/berita?${params.toString()}`, {
    next: { revalidate: REVALIDATE.BERITA }, // ISR
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil daftar berita');
  }

  return res.json();
};

export const fetchBeritaBySlug = async (slug: string): Promise<ApiResponse<Berita>> => {
  const res = await fetch(`${API_BASE_URL}/api/berita/${slug}`, {
    next: { revalidate: REVALIDATE.BERITA }, // ISR
  });

  if (!res.ok) {
    if (res.status === 404) return { success: false, data: null as any };
    throw new Error('Gagal mengambil detail berita');
  }

  return res.json();
};
