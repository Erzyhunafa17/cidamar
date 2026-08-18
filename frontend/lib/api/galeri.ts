import { API_BASE_URL } from '../utils/constants';

export async function fetchGaleri() {
  const res = await fetch(`${API_BASE_URL}/api/galeri`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal memuat galeri');
  return res.json();
}

export async function fetchArsip() {
  const res = await fetch(`${API_BASE_URL}/api/arsip`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal memuat arsip');
  return res.json();
}

export async function fetchPengaturan() {
  const res = await fetch(`${API_BASE_URL}/api/pengaturan`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal memuat pengaturan');
  return res.json();
}
