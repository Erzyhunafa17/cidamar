import { Metadata } from 'next';
import AgustusanClient from './AgustusanClient';
import { fetchAgustusanList } from '@/lib/api/agustusan';

export const metadata: Metadata = {
  title: 'Live Jadwal Agustusan | Kampung Cidamar',
  description: 'Pantau jadwal dan urutan panggung pentas seni perayaan kemerdekaan Kampung Cidamar secara langsung.',
};

// Disable cache untuk halaman ini agar setiap request awal mendapat data terbaru,
// sisanya di-handle polling oleh client.
export const dynamic = 'force-dynamic';

export default async function AgustusanPage() {
  const { data } = await fetchAgustusanList().catch(() => ({ data: [] }));

  return <AgustusanClient initialData={data} />;
}
