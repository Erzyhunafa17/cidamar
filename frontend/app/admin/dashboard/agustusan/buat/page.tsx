'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Plus, Trash2, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import { API_BASE_URL } from '@/lib/utils/constants';
import { fetchWithAuth } from '@/lib/api/auth';

export default function BuatAgustusanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nama_grup: '',
    jenis_penampilan: '',
    urutan_tampil: '1',
    waktu_tampil: '',
    tahun_acara: new Date().getFullYear().toString(),
  });

  const [anggota, setAnggota] = useState<string[]>(['']);

  const handleAddAnggota = () => {
    setAnggota([...anggota, '']);
  };

  const handleRemoveAnggota = (index: number) => {
    if (anggota.length === 1) return;
    const newAnggota = [...anggota];
    newAnggota.splice(index, 1);
    setAnggota(newAnggota);
  };

  const handleAnggotaChange = (index: number, value: string) => {
    const newAnggota = [...anggota];
    newAnggota[index] = value;
    setAnggota(newAnggota);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Bersihkan array anggota dari nilai yang kosong
      const validAnggota = anggota.filter(a => a.trim() !== '');

      const payload = {
        ...formData,
        urutan_tampil: parseInt(formData.urutan_tampil, 10),
        tahun_acara: parseInt(formData.tahun_acara, 10),
        anggota: validAnggota,
      };

      const res = await fetchWithAuth(`${API_BASE_URL}/api/admin/agustusan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        alert('Jadwal berhasil ditambahkan!');
        router.push('/admin/dashboard/agustusan');
      } else {
        alert('Gagal: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/agustusan">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Penampil Agustusan</h1>
          <p className="text-sm text-gray-500 mt-1">Daftarkan grup atau peserta baru untuk jadwal panggung.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">
            Informasi Dasar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Grup / Peserta <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={255}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                placeholder="Contoh: Tari Jaipong RT 02"
                value={formData.nama_grup}
                onChange={(e) => setFormData({...formData, nama_grup: e.target.value})}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Penampilan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={255}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                placeholder="Contoh: Tarian Tradisional / Drama Musikal"
                value={formData.jenis_penampilan}
                onChange={(e) => setFormData({...formData, jenis_penampilan: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Urut Tampil <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                value={formData.urutan_tampil}
                onChange={(e) => setFormData({...formData, urutan_tampil: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Perkiraan Waktu Tampil
              </label>
              <input
                type="time"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                value={formData.waktu_tampil}
                onChange={(e) => setFormData({...formData, waktu_tampil: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Boleh dikosongkan jika menyesuaikan kondisi di lapangan.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              Daftar Anggota Grup
            </h2>
            <button 
              type="button" 
              onClick={handleAddAnggota}
              className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Tambah Anggota
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Masukkan nama-nama orang yang tergabung dalam grup ini. Kosongkan *input* jika penampil individu.
          </p>

          <div className="space-y-3">
            {anggota.map((nama, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-500 shrink-0">
                  {index + 1}
                </div>
                <input
                  type="text"
                  placeholder="Nama anggota (opsional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500 transition-all text-sm"
                  value={nama}
                  onChange={(e) => handleAnggotaChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnggota(index)}
                  disabled={anggota.length === 1 && nama === ''}
                  className={`p-2 rounded-lg transition-colors shrink-0 ${
                    anggota.length === 1 && nama === '' 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={loading} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 shadow-md">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? 'Menyimpan...' : 'Simpan ke Jadwal'}
          </Button>
        </div>

      </form>
    </div>
  );
}
