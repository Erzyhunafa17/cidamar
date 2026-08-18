'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Flag, CalendarDays } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { API_BASE_URL } from '@/lib/utils/constants';

const STATUS_CONFIG = {
  selesai:       { label: 'Selesai',       variant: 'green' as const, icon: '✅' },
  sedang_tampil: { label: 'Sedang Tampil', variant: 'red'   as const, icon: '🎤' },
  menunggu:      { label: 'Menunggu',      variant: 'gray'  as const, icon: '⏳' },
};

export default function AgustusanSection() {
  const [jadwal, setJadwal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/agustusan`, {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const json = await res.json();
        setJadwal(json.data || []);
      } catch (error) {
        console.error('Error fetching agustusan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJadwal();
  }, []);

  // Hanya tampilkan yang menunggu atau sedang tampil (bukan selesai)
  const displayJadwal = jadwal
    .filter((j: any) => j.status !== 'selesai')
    .slice(0, 5);

  const sedangTampil = jadwal.find((j: any) => j.status === 'sedang_tampil');
  const adaJadwal = jadwal.filter((j: any) => j.status !== 'selesai').length > 0;

  return (
    <section
      id="agustusan"
      className="section-padding bg-gradient-to-br from-green-primary to-green-secondary"
      aria-label="Jadwal Agustusan"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-accent/20 border border-amber-accent/30 rounded-full px-4 py-2 text-amber-accent font-semibold text-sm mb-4">
            <Flag className="w-4 h-4" />
            HUT RI ke-81 — 17 Agustus 2026
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            🎊 Jadwal Penampilan Agustusan
          </h2>
          <p className="text-green-light max-w-xl mx-auto">
            Pantau jadwal dan status penampilan lomba secara langsung di sini.
          </p>
        </div>

        {/* Sedang tampil banner */}
        {sedangTampil && (
          <div className="animate-pulse-ring mb-6 bg-red-alert/90 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 text-white border-2 border-red-300">
            <span className="text-3xl">🎤</span>
            <div>
              <div className="font-heading font-bold text-lg">{sedangTampil.nama_grup}</div>
              <div className="text-red-100 text-sm">
                Sedang tampil — {sedangTampil.jenis_penampilan} · Pukul {sedangTampil.waktu_tampil?.substring(0,5) || '-'}
              </div>
            </div>
          </div>
        )}

        {/* Jadwal */}
        <div className="space-y-3 mb-8">
          {loading ? (
            <div className="text-center text-white bg-white/10 p-6 rounded-2xl">Memuat jadwal...</div>
          ) : !adaJadwal ? (
            <div className="text-center text-white bg-white/10 p-6 rounded-2xl">Semua grup sudah selesai tampil. 🎉</div>
          ) : (
            displayJadwal.map((item: any) => {
              const cfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.menunggu;
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    item.status === 'sedang_tampil'
                      ? 'bg-white/20 border-2 border-white/40 backdrop-blur-sm'
                      : 'bg-white/10 border border-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {item.urutan_tampil}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{item.nama_grup}</div>
                    <div className="text-green-light text-sm">{item.jenis_penampilan}</div>
                  </div>
                  <div className="flex items-center gap-1 text-green-light text-sm shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    {item.waktu_tampil?.substring(0,5) || '-'}
                  </div>
                  <Badge variant={cfg.variant} size="sm" className="shrink-0 hidden md:inline-flex">
                    {cfg.icon} {cfg.label}
                  </Badge>
                </div>
              );
            })
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/agustusan"
            className="inline-flex items-center gap-2 bg-white text-green-primary font-bold px-6 py-3 rounded-xl hover:bg-cream-bg transition-colors shadow-md"
          >
            <CalendarDays className="w-5 h-5" />
            Lihat Jadwal Lengkap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
