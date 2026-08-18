import { API_BASE_URL } from '../utils/constants';

interface FetchPrestasiOptions {
  page?: number;
  limit?: number;
  search?: string;
  kategori?: string;
  tingkat?: string;
  tahun?: number;
}

export async function fetchPrestasiList(options: FetchPrestasiOptions = {}) {
  const params = new URLSearchParams();
  if (options.page) params.append('page', options.page.toString());
  if (options.limit) params.append('limit', options.limit.toString());
  if (options.search) params.append('q', options.search);
  if (options.kategori && options.kategori !== 'semua') params.append('kategori', options.kategori);
  if (options.tingkat && options.tingkat !== 'semua') params.append('tingkat', options.tingkat);
  if (options.tahun) params.append('tahun', options.tahun.toString());

  const res = await fetch(`${API_BASE_URL}/api/prestasi?${params.toString()}`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  
  if (!res.ok) {
    throw new Error('Gagal memuat daftar prestasi');
  }

  return res.json();
}

export async function fetchPrestasiBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/prestasi/${slug}`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error('Gagal memuat detail prestasi');
  }

  return res.json();
}
