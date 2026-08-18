import Link from 'next/link';
import { ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero Kampung Cidamar"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-primary via-green-secondary to-green-light" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-amber-accent/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative container-custom text-center text-white pt-20">
        {/* Location tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-8 animate-fade-in-up">
          <MapPin className="w-4 h-4 text-amber-accent" />
          <span>Jawa Barat, Indonesia</span>
        </div>

        {/* Heading */}
        <h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          Selamat Datang di{' '}
          <span className="text-amber-accent relative">
            Kampung Cidamar
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="6"
              viewBox="0 0 300 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="#E9961A" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Kampung yang asri, berprestasi, dan terus berkembang bersama. Temukan berita terkini, jadwal kegiatan, dan potensi warga Cidamar di sini.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <Link href="/agustusan">
            <Button size="lg" variant="secondary" className="min-w-[180px] bg-red-500 hover:bg-red-600 border-none">
              Live Agustusan
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
          <Link href="/berita">
            <Button size="lg" variant="primary" className="min-w-[180px]">
              Baca Berita
            </Button>
          </Link>
          <Link href="/prestasi">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[180px] border-white text-white hover:bg-white/10 hover:text-white"
            >
              Lihat Prestasi
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <a href="#statistik" className="text-white/60 hover:text-white transition-colors">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
