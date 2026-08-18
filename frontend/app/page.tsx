import type { Metadata } from 'next';
import HeroSection      from '@/components/sections/HeroSection';
import StatistikSection from '@/components/sections/StatistikSection';
import SekilasSection   from '@/components/sections/SekilasSection';
import PrestasiSection  from '@/components/sections/PrestasiSection';
import BeritaSection    from '@/components/sections/BeritaSection';
import AgustusanSection from '@/components/sections/AgustusanSection';
import GaleriSection    from '@/components/sections/GaleriSection';
import KontakSection    from '@/components/sections/KontakSection';

export const metadata: Metadata = {
  title: 'Kampung Cidamar — Asri, Berprestasi, Bersatu',
  description:
    'Website resmi Kampung Cidamar. Temukan berita terkini, jadwal kegiatan, prestasi kampung, direktori UMKM, dan informasi warga.',
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatistikSection />
      <SekilasSection />
      <PrestasiSection />
      <BeritaSection />
      <AgustusanSection />
      <GaleriSection />
      <KontakSection />
    </>
  );
}
