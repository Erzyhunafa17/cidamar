import { API_BASE_URL } from '../utils/constants';

interface FetchAgustusanOptions {
  tahun?: number;
}

export async function fetchAgustusanList(options: FetchAgustusanOptions = {}) {
  const params = new URLSearchParams();
  if (options.tahun) params.append('tahun', options.tahun.toString());

  // Untuk live monitoring (klien-side polling),
  // Next.js fetch tidak akan me-revalidate pada client-side dengan cache='no-store' secara default jika di server component,
  // Tapi karena kita akan fetch ini di Client Component dengan setInterval,
  // browser fetch API standar akan mem-bypass next.js cache jika kita atur cache: 'no-store'
  const res = await fetch(`${API_BASE_URL}/api/agustusan?${params.toString()}`, {
    cache: 'no-store', // Selalu fetch data terbaru dari backend
  });
  
  if (!res.ok) {
    throw new Error('Gagal memuat jadwal agustusan');
  }

  return res.json();
}
