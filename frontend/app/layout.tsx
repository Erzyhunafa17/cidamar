import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Kampung Cidamar — Asri, Berprestasi, Bersatu',
    template: '%s | Kampung Cidamar',
  },
  description:
    'Website resmi Kampung Cidamar. Temukan berita terkini, jadwal kegiatan, prestasi kampung, direktori UMKM, dan informasi warga Cidamar.',
  keywords: ['Kampung Cidamar', 'berita kampung', 'prestasi kampung', 'UMKM lokal', 'agustusan'],
  openGraph: {
    type:        'website',
    locale:      'id_ID',
    siteName:    'Website Kampung Cidamar',
    title:       'Kampung Cidamar — Asri, Berprestasi, Bersatu',
    description: 'Website resmi Kampung Cidamar — informasi, berita, prestasi, dan kegiatan warga.',
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-cream-bg text-brown-dark">
        {/* Skip navigation untuk aksesibilitas */}
        <a href="#main-content" className="skip-nav">
          Langsung ke konten utama
        </a>

        <Navbar />

        <main id="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
