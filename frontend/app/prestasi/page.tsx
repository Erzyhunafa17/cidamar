import { Metadata } from 'next';
import PrestasiClient from './PrestasiClient';
import { fetchPrestasiList } from '@/lib/api/prestasi';

export const metadata: Metadata = {
  title: 'Prestasi Kampung Cidamar',
  description: 'Daftar pencapaian dan prestasi yang diraih oleh Kampung Cidamar dan warganya dari waktu ke waktu.',
};

// Revalidate halaman setiap 1 jam sesuai konstanta
export const revalidate = 3600;

export default async function PrestasiPage() {
  // Ambil maksimal 100 prestasi terbaru untuk di-pass ke client agar bisa di-filter instant
  const { data } = await fetchPrestasiList({ limit: 100 }).catch(() => ({ data: [] }));

  return <PrestasiClient initialData={data} />;
}
