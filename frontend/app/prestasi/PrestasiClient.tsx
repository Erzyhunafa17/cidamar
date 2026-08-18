'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Trophy, LayoutGrid, List, Award, MapPin, ChevronRight } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { KATEGORI_PRESTASI, TINGKAT_PRESTASI } from '@/lib/utils/constants';

interface PrestasiClientProps {
  initialData: any[];
}

export default function PrestasiClient({ initialData }: PrestasiClientProps) {
  const [data, setData] = useState(initialData);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('semua');
  const [tingkat, setTingkat] = useState('semua');

  // Simple client-side filtering (karena data tidak terlalu besar, filter di client cukup cepat)
  // Jika data besar, bisa panggil API ulang setiap filter berubah
  const filteredData = data.filter((item) => {
    const matchSearch = item.nama_prestasi.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === 'semua' || item.kategori === kategori;
    const matchTingkat = tingkat === 'semua' || item.tingkat === tingkat;
    return matchSearch && matchKategori && matchTingkat;
  });

  return (
    <div className="bg-cream-bg min-h-screen pt-28 pb-20">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-4">
            <Trophy className="w-4 h-4 mr-1.5" />
            Daftar Penghargaan
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-primary mb-6">
            Prestasi Kampung Cidamar
          </h1>
          <p className="text-lg text-brown-medium">
            Jejak langkah keberhasilan dan prestasi yang telah diukir oleh warga 
            Cidamar dari waktu ke waktu.
          </p>
        </div>

        {/* Toolbar: Filter & View Toggle */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 justify-between items-center z-20 relative">
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari prestasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-secondary/20 focus:border-green-secondary text-sm"
              />
            </div>

            {/* Filter Kategori */}
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-secondary/20 focus:border-green-secondary text-sm min-w-[140px]"
            >
              <option value="semua">Semua Kategori</option>
              {KATEGORI_PRESTASI.map((k) => (
                <option key={k.value} value={k.value}>{k.label}</option>
              ))}
            </select>

            {/* Filter Tingkat */}
            <select
              value={tingkat}
              onChange={(e) => setTingkat(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-secondary/20 focus:border-green-secondary text-sm min-w-[140px]"
            >
              <option value="semua">Semua Tingkat</option>
              {TINGKAT_PRESTASI.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200 self-end md:self-auto">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'timeline' 
                  ? 'bg-white shadow-sm text-green-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-green-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {filteredData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Trophy className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400">Prestasi tidak ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba ubah kata kunci atau filter pencarian Anda.</p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden flex-shrink-0">
                  {item.foto_url ? (
                    <Image
                      src={item.foto_url}
                      alt={item.nama_prestasi}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50">
                      <Trophy className="w-16 h-16 text-amber-200" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant={item.tingkat === 'nasional' ? 'gold' : item.tingkat === 'provinsi' ? 'silver' : 'bronze'} size="sm" className="shadow-lg">
                      <MapPin className="w-3 h-3 mr-1" />
                      Tingkat {item.tingkat.replace('_', '/').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 font-medium">
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md">
                      <Award className="w-4 h-4" />
                      Tahun {item.tahun}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-primary transition-colors">
                    {item.nama_prestasi}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-6 flex-1">
                    {item.deskripsi}
                  </p>
                  <Link href={`/prestasi/${item.slug}`} className="w-full">
                    <Button variant="outline" className="w-full">Detail Prestasi</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Timeline View */
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {filteredData.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={item.id} className={`relative flex flex-col md:flex-row items-center justify-between group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-amber-accent border-4 border-white shadow-md -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300"></div>
                    
                    {/* Empty space for alternative side */}
                    <div className="hidden md:block w-5/12"></div>
                    
                    {/* Content Card */}
                    <div className="w-full md:w-5/12 pl-12 md:pl-0">
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative">
                        {/* Connecting line on desktop */}
                        <div className={`hidden md:block absolute top-1/2 w-8 h-0.5 bg-green-200 -translate-y-1/2 ${isEven ? '-left-8' : '-right-8'}`}></div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl font-black text-green-primary opacity-20 absolute top-4 right-6">
                            {item.tahun}
                          </span>
                          <Badge variant={item.tingkat === 'nasional' ? 'gold' : item.tingkat === 'provinsi' ? 'silver' : 'bronze'} size="sm">
                            Tingkat {item.tingkat.replace('_', '/').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-primary transition-colors pr-12">
                          {item.nama_prestasi}
                        </h3>
                        
                        {item.foto_url && (
                          <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                            <Image src={item.foto_url} alt={item.nama_prestasi} fill className="object-cover" />
                          </div>
                        )}
                        
                        <p className="text-gray-600 line-clamp-2 mb-4 text-sm">
                          {item.deskripsi}
                        </p>
                        
                        <Link href={`/prestasi/${item.slug}`} className="inline-flex items-center text-green-primary font-semibold text-sm hover:text-green-700">
                          Baca selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
