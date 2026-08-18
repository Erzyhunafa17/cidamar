'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { API_BASE_URL } from '@/lib/utils/constants';
import { fetchWithAuth } from '@/lib/api/auth';

export default function AdminPrestasiPage() {
  const [prestasi, setPrestasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrestasi = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(`${API_BASE_URL}/api/prestasi?limit=50`);
      const data = await res.json();
      if (data.success) {
        setPrestasi(data.data);
      }
    } catch (error) {
      console.error('Gagal fetch prestasi', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestasi();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data prestasi ini?')) return;
    
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/prestasi/${id}`, {
        method: 'DELETE',
        headers: {}
      });
      if (res.ok) {
        fetchPrestasi();
      } else {
        alert('Gagal menghapus prestasi');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Prestasi</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data penghargaan dan pencapaian kampung.</p>
        </div>
        <Link href="/admin/dashboard/prestasi/buat">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Prestasi
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari prestasi..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-secondary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Nama Prestasi</th>
                <th className="px-6 py-4">Tingkat</th>
                <th className="px-6 py-4">Tahun</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : prestasi.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center flex flex-col items-center justify-center">
                    <Trophy className="w-12 h-12 text-gray-200 mb-3" />
                    <span className="text-gray-500 block">Belum ada data prestasi.</span>
                  </td>
                </tr>
              ) : (
                prestasi.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 line-clamp-1">{item.nama_prestasi}</p>
                      <p className="text-xs text-gray-400 capitalize">{item.kategori.replace('_', ' ')}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={item.tingkat === 'nasional' ? 'gold' : item.tingkat === 'provinsi' ? 'silver' : 'bronze'} size="sm" className="capitalize">
                        {item.tingkat.replace('_', '/')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                      {item.tahun}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/dashboard/prestasi/${item.id}`}>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
