'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils/constants';

const STATUS_MAP = {
  selesai:       { label: 'Selesai', color: 'text-charcoal/40' },
  sedang_tampil: { label: 'Live Now', color: 'text-red-alert font-semibold' },
  menunggu:      { label: 'Akan Datang', color: 'text-charcoal' },
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

  const displayJadwal = jadwal.filter((j: any) => j.status !== 'selesai').slice(0, 4);
  const sedangTampil = jadwal.find((j: any) => j.status === 'sedang_tampil');
  const adaJadwal = displayJadwal.length > 0;

  return (
    <section
      id="agustusan"
      className="py-24 md:py-32 bg-white text-charcoal rounded-[50px] mx-2 my-10 shadow-sm relative z-10"
      aria-label="Jadwal Penampilan Agustusan"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="block text-[18px] uppercase tracking-widest text-earth-accent font-semibold mb-6">
              Jadwal & Agenda
            </span>
            <h2 className="text-[53px] md:text-[81px] leading-[1.15] mb-8 font-medium tracking-tight">
              Perayaan<br />Agustusan
            </h2>
            <p className="text-charcoal/80 text-[20px] leading-relaxed font-normal mb-12 max-w-md">
              Momen di mana seluruh warga berkumpul, merayakan kemerdekaan dengan ragam lomba, kreasi seni, dan kebersamaan yang tulus.
            </p>
            
            <Link
              href="/agustusan"
              className="group inline-flex items-center gap-3 text-charcoal font-medium hover:text-earth-accent transition-colors text-[18px] w-fit border-b-2 border-charcoal/30 hover:border-earth-accent pb-1"
            >
              Lihat Agenda Lengkap
              <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="lg:col-span-7 xl:col-span-6 xl:col-start-7">
            {sedangTampil && (
              <div className="mb-12 border-l-[3px] border-red-alert pl-6 py-2">
                <span className="text-red-alert uppercase tracking-widest text-xs font-semibold mb-2 block animate-pulse">
                  Live Now
                </span>
                <h3 className="text-2xl font-heading font-medium mb-1">{sedangTampil.nama_grup}</h3>
                <p className="text-cream/60 font-light text-sm">
                  {sedangTampil.jenis_penampilan} — {sedangTampil.waktu_tampil?.substring(0,5)}
                </p>
              </div>
            )}

            <div className="flex flex-col border-t border-charcoal/10">
              {loading ? (
                <div className="py-8 text-charcoal/50 text-[18px] italic">Memuat agenda...</div>
              ) : !adaJadwal ? (
                <div className="py-8 text-charcoal/50 text-[18px] italic">Agenda telah selesai sepenuhnya.</div>
              ) : (
                displayJadwal.map((item: any) => {
                  const status = STATUS_MAP[item.status as keyof typeof STATUS_MAP] || STATUS_MAP.menunggu;
                  return (
                    <div key={item.id} className="grid grid-cols-12 gap-4 py-8 border-b border-charcoal/10 items-center hover:bg-cream-alt transition-colors -mx-4 px-4 rounded-[20px]">
                      <div className="col-span-3 sm:col-span-2">
                        <span className="text-[20px] font-medium text-charcoal/90">
                          {item.waktu_tampil?.substring(0,5) || '--:--'}
                        </span>
                      </div>
                      <div className="col-span-9 sm:col-span-7">
                        <h4 className="text-[24px] font-medium text-charcoal mb-1">{item.nama_grup}</h4>
                        <p className="text-[18px] text-charcoal/70">{item.jenis_penampilan}</p>
                      </div>
                      <div className="col-span-12 sm:col-span-3 sm:text-right mt-2 sm:mt-0">
                        <span className={`text-[15px] uppercase tracking-widest ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
