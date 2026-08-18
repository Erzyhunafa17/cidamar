'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, PlayCircle, CheckCircle2, Clock, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { API_BASE_URL, STATUS_PENAMPILAN } from '@/lib/utils/constants';
import { fetchWithAuth } from '@/lib/api/auth';

export default function AdminAgustusanPage() {
  const [jadwal, setJadwal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJadwal = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(`${API_BASE_URL}/api/agustusan`);
      const data = await res.json();
      if (data.success) {
        setJadwal(data.data);
      }
    } catch (error) {
      console.error('Gagal fetch jadwal', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus jadwal ini?')) return;
    
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/agustusan/${id}`, {
        method: 'DELETE',
        headers: {}
      });
      if (res.ok) {
        fetchJadwal();
      } else {
        alert('Gagal menghapus jadwal');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan');
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      // Jika statusnya sedang_tampil, pastikan yang lain diubah menjadi selesai atau menunggu
      // Dalam implementasi ini kita update satu per satu secara independen
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/agustusan/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        fetchJadwal();
      } else {
        const errorData = await res.json();
        alert('Gagal update status: ' + errorData.message);
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleReorder = async (id: string, newUrutanStr: string, oldUrutan: number) => {
    const newUrutan = parseInt(newUrutanStr, 10);
    if (isNaN(newUrutan) || newUrutan === oldUrutan || newUrutan < 1) return;
    
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/agustusan/${id}/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urutan_tampil: newUrutan })
      });
      if (res.ok) {
        fetchJadwal();
      } else {
        const errorData = await res.json();
        alert('Gagal mengatur ulang urutan: ' + (errorData.message || ''));
        fetchJadwal(); // kembalikan ke urutan awal
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan');
    }
  };

  const handleClearSelesai = async () => {
    if (!confirm('Yakin ingin menghapus semua grup yang berstatus Selesai?')) return;
    
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/agustusan/clear-selesai`, {
        method: 'DELETE',
        headers: {}
      });
      if (res.ok) {
        fetchJadwal();
      } else {
        alert('Gagal membersihkan riwayat');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan');
    }
  };

  const antrean = jadwal.filter(j => j.status !== 'selesai');
  const riwayatSelesai = jadwal.filter(j => j.status === 'selesai');

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Acara Agustusan</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola jadwal penampilan dan live status panggung.</p>
        </div>
        <Link href="/admin/dashboard/agustusan/buat">
          <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4" />
            Tambah Peserta
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            Antrean & Sedang Tampil
          </h2>
        </div>
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari grup..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Link href="/agustusan" target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-500" />
                Lihat Live
              </Button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">No. Urut</th>
                <th className="px-6 py-4">Peserta & Penampilan</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4">Status & Aksi Cepat</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : antrean.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center flex flex-col items-center justify-center">
                    <Activity className="w-12 h-12 text-gray-200 mb-3" />
                    <span className="text-gray-500 block">Belum ada grup dalam antrean.</span>
                  </td>
                </tr>
              ) : (
                antrean.map((item) => (
                  <tr key={item.id} className={`hover:bg-gray-50/50 transition-colors ${item.status === 'sedang_tampil' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-4">
                      <input 
                        type="number"
                        min="1"
                        defaultValue={item.urutan_tampil}
                        onBlur={(e) => handleReorder(item.id, e.target.value, item.urutan_tampil)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          }
                        }}
                        className="w-16 h-10 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-center font-bold text-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                        title="Ubah nomor untuk memindahkan antrean"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{item.nama_grup}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.jenis_penampilan}</p>
                      {item.anggota_grup && item.anggota_grup.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {item.anggota_grup.length} anggota
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.waktu_tampil ? `${item.waktu_tampil.substring(0, 5)} WIB` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        {/* Status Label */}
                        <div className="flex items-center gap-1.5">
                          {item.status === 'menunggu' && <Badge variant="gray"><Clock className="w-3 h-3 mr-1" /> Menunggu</Badge>}
                          {item.status === 'sedang_tampil' && <Badge variant="red" className="animate-pulse"><PlayCircle className="w-3 h-3 mr-1" /> Sedang Tampil</Badge>}
                          {item.status === 'selesai' && <Badge variant="green"><CheckCircle2 className="w-3 h-3 mr-1" /> Selesai</Badge>}
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex gap-1 mt-1">
                          {item.status !== 'sedang_tampil' && (
                            <button 
                              onClick={() => updateStatus(item.id, 'sedang_tampil')}
                              className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors font-semibold"
                            >
                              ▶ Mulai
                            </button>
                          )}
                          {item.status === 'sedang_tampil' && (
                            <button 
                              onClick={() => updateStatus(item.id, 'selesai')}
                              className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors font-semibold"
                            >
                              ✔ Selesai
                            </button>
                          )}
                          {item.status === 'selesai' && (
                            <button 
                              onClick={() => updateStatus(item.id, 'menunggu')}
                              className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors font-semibold"
                            >
                              ⟲ Ulang
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/dashboard/agustusan/${item.id}`}>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Data">
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-green-50/50 border-b border-green-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Riwayat Sudah Tampil
          </h2>
          <Button onClick={handleClearSelesai} variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 py-1.5 px-3 h-auto text-xs">
            <Trash2 className="w-3.5 h-3.5" />
            Bersihkan Riwayat
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">No. Urut Awal</th>
                <th className="px-6 py-4">Peserta & Penampilan</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : riwayatSelesai.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                    Belum ada grup yang selesai tampil.
                  </td>
                </tr>
              ) : (
                riwayatSelesai.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-green-50 text-green-700 rounded-full flex items-center justify-center font-bold text-lg">
                        {item.urutan_tampil}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{item.nama_grup}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.jenis_penampilan}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.waktu_tampil ? `${item.waktu_tampil.substring(0, 5)} WIB` : '-'}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap flex justify-end gap-2">
                      <button 
                        onClick={() => updateStatus(item.id, 'menunggu')}
                        className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-200 transition-colors font-medium"
                      >
                        ⟲ Ulang
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" 
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
