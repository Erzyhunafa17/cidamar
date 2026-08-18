'use client';

import { useState, useEffect } from 'react';
import { fetchAgustusanList } from '@/lib/api/agustusan';
import { Clock, CheckCircle2, PlayCircle, Users, Activity } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { STATUS_PENAMPILAN } from '@/lib/utils/constants';

interface AgustusanClientProps {
  initialData: any[];
}

export default function AgustusanClient({ initialData }: AgustusanClientProps) {
  const [data, setData] = useState<any[]>(initialData);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(true); // Toggle real-time
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLive) {
      interval = setInterval(async () => {
        try {
          const result = await fetchAgustusanList();
          if (result.success) {
            setData(result.data);
            setLastUpdated(new Date());
          }
        } catch (error) {
          console.error("Gagal melakukan polling data:", error);
        }
      }, 10000); // 10 detik polling
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  // Kelompokkan data berdasarkan status untuk mempermudah render
  const sedangTampil = data.filter(item => item.status === 'sedang_tampil');
  const menunggu = data.filter(item => item.status === 'menunggu');
  const selesai = data.filter(item => item.status === 'selesai');

  return (
    <div className="bg-cream-bg min-h-screen pt-28 pb-20 font-sans">
      <div className="container-custom max-w-5xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="green" className="mb-4">
            <Activity className="w-4 h-4 mr-1.5" />
            Live Monitoring
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-primary mb-4">
            Jadwal Penampilan Agustusan
          </h1>
          <p className="text-lg text-brown-medium mb-6">
            Pantau urutan tampil panggung pentas seni secara langsung.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <span className="relative flex h-3 w-3">
                {isLive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-red-500' : 'bg-gray-400'}`}></span>
              </span>
              <span className={isLive ? 'text-red-600' : 'text-gray-500'}>
                {isLive ? 'Live Update Aktif' : 'Live Update Nonaktif'}
              </span>
            </div>
            
            <button 
              onClick={() => setIsLive(!isLive)}
              className="text-gray-500 hover:text-green-primary underline decoration-dotted underline-offset-4"
            >
              {isLive ? 'Matikan' : 'Aktifkan'}
            </button>
          </div>
          
          <div className="text-xs text-gray-400 mt-2">
            Terakhir diperbarui: {mounted ? lastUpdated.toLocaleTimeString() : '...'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Sedang Tampil */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Sedang Tampil */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-red-500" />
                Sedang Tampil di Panggung
              </h2>
              
              {sedangTampil.length > 0 ? (
                <div className="space-y-4">
                  {sedangTampil.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl border-2 border-red-100 shadow-xl p-6 md:p-8 relative overflow-hidden animate-pulse-ring">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0"></div>
                      
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-lg text-sm">
                              Urutan #{item.urutan_tampil}
                            </span>
                            {item.waktu_tampil && (
                              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {item.waktu_tampil.substring(0, 5)} WIB
                              </span>
                            )}
                          </div>
                          <h3 className="text-3xl font-black text-gray-900 mb-2">
                            {item.nama_grup}
                          </h3>
                          <p className="text-lg text-gray-600 font-medium">
                            {item.jenis_penampilan}
                          </p>
                        </div>
                        
                        {item.anggota_grup && item.anggota_grup.length > 0 && (
                          <div className="bg-gray-50 p-4 rounded-2xl md:min-w-[200px]">
                            <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-green-primary" />
                              Anggota ({item.anggota_grup.length})
                            </h4>
                            <ul className="text-sm text-gray-600 max-h-24 overflow-y-auto space-y-1 pr-2">
                              {item.anggota_grup.map((a: any) => (
                                <li key={a.id}>• {a.nama}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <PlayCircle className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Panggung Sedang Kosong</h3>
                  <p className="text-gray-500 text-sm">Belum ada grup yang tampil saat ini.</p>
                </div>
              )}
            </section>

            {/* Menunggu */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-amber-500" />
                Daftar Tunggu Selanjutnya
              </h2>
              
              {menunggu.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menunggu.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-amber-200 transition-colors relative overflow-hidden">
                      
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-gray-100 text-gray-700 font-bold px-2 py-1 rounded-md text-xs">
                          #{item.urutan_tampil}
                        </span>
                        {item.waktu_tampil && (
                          <span className="text-xs text-gray-500 font-medium">
                            {item.waktu_tampil.substring(0, 5)}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={item.nama_grup}>
                        {item.nama_grup}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {item.jenis_penampilan}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                  <p className="text-gray-500 text-sm">Tidak ada grup dalam antrean tunggu.</p>
                </div>
              )}
            </section>
          </div>

          {/* Kolom Kanan: Selesai */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              Sudah Tampil
            </h2>
            
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 overflow-hidden">
              {selesai.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {selesai.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors opacity-70 hover:opacity-100">
                      <div className="w-8 h-8 shrink-0 bg-green-50 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {item.urutan_tampil}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{item.nama_grup}</h4>
                        <p className="text-xs text-gray-500">{item.jenis_penampilan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-400 text-sm italic">Belum ada grup yang selesai.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
